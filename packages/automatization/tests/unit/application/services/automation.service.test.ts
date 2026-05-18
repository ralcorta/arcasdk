import { AutomationService } from "@application/services/automation.service";
import { IPortalAutomationPort } from "@application/ports/portal-automation.port";
import {
  DelegateWebServiceParams,
  AcceptWebServiceDelegationParams,
  AutomationResult,
} from "@application/types/automation.types";

describe("AutomationService", () => {
  let service: AutomationService;
  let portalMock: jest.Mocked<IPortalAutomationPort>;

  const delegateParams: DelegateWebServiceParams = {
    cuit: "20111111112",
    username: "20111111112",
    password: "test-password",
    service: "wsfe",
    delegateTo: "20222222223",
  };

  const acceptParams: AcceptWebServiceDelegationParams = {
    cuit: "20222222223",
    username: "20222222223",
    password: "test-password",
    service: "wsfe",
    delegatedCuit: "20111111112",
  };

  beforeEach(() => {
    portalMock = {
      delegateWebService: jest.fn(),
      acceptWebServiceDelegation: jest.fn(),
      close: jest.fn(),
    };
    service = new AutomationService(portalMock);
  });

  describe("delegateWebService", () => {
    it("should delegate to portal adapter and return result", async () => {
      const expectedResult: AutomationResult = {
        status: "complete",
        data: { status: "created" },
      };
      portalMock.delegateWebService.mockResolvedValue(expectedResult);

      const result = await service.delegateWebService(delegateParams);

      expect(portalMock.delegateWebService).toHaveBeenCalledWith(
        delegateParams,
      );
      expect(result).toEqual(expectedResult);
    });

    it("should propagate errors from the adapter", async () => {
      const expectedResult: AutomationResult = {
        status: "error",
        error: "Login failed",
      };
      portalMock.delegateWebService.mockResolvedValue(expectedResult);

      const result = await service.delegateWebService(delegateParams);

      expect(result.status).toBe("error");
      expect(result.error).toBe("Login failed");
    });

    it("should handle already_exists status", async () => {
      const expectedResult: AutomationResult = {
        status: "complete",
        data: { status: "already_exists" },
      };
      portalMock.delegateWebService.mockResolvedValue(expectedResult);

      const result = await service.delegateWebService(delegateParams);

      expect(result.status).toBe("complete");
      expect(result.data?.status).toBe("already_exists");
    });
  });

  describe("acceptWebServiceDelegation", () => {
    it("should delegate to portal adapter and return result", async () => {
      const expectedResult: AutomationResult = {
        status: "complete",
        data: { status: "accepted" },
      };
      portalMock.acceptWebServiceDelegation.mockResolvedValue(expectedResult);

      const result = await service.acceptWebServiceDelegation(acceptParams);

      expect(portalMock.acceptWebServiceDelegation).toHaveBeenCalledWith(
        acceptParams,
      );
      expect(result).toEqual(expectedResult);
    });

    it("should propagate errors from the adapter", async () => {
      const expectedResult: AutomationResult = {
        status: "error",
        error: "No pending delegation found",
      };
      portalMock.acceptWebServiceDelegation.mockResolvedValue(expectedResult);

      const result = await service.acceptWebServiceDelegation(acceptParams);

      expect(result.status).toBe("error");
      expect(result.error).toBe("No pending delegation found");
    });
  });

  describe("close", () => {
    it("should call close on the portal adapter", async () => {
      portalMock.close.mockResolvedValue();

      await service.close();

      expect(portalMock.close).toHaveBeenCalled();
    });
  });
});
