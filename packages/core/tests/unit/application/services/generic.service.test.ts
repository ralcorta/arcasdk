import { GenericService } from "@arcasdk/core/src/application/services/generic.service";
import { IGenericRepositoryPort } from "@arcasdk/core/src/application/ports/generic/generic-repository.port";

describe("Generic Service", () => {
  let service: GenericService;
  let repositoryMock: jest.Mocked<IGenericRepositoryPort>;

  beforeEach(() => {
    repositoryMock = {
      call: jest.fn(),
    };
    service = new GenericService(repositoryMock);
  });

  it("should call repository with correct parameters", async () => {
    const serviceName = "ws_sr_padron_a4";
    const methodName = "dummy";
    const params = {};
    const expectedResult = { status: "OK" };

    repositoryMock.call.mockResolvedValue(expectedResult);

    const result = await service.call(serviceName, methodName, params);

    expect(repositoryMock.call).toHaveBeenCalledWith(
      serviceName,
      methodName,
      params,
      undefined
    );
    expect(result).toEqual(expectedResult);
  });

  it("should call repository with options when provided", async () => {
    const serviceName = "custom_service";
    const methodName = "customMethod";
    const params = { foo: "bar" };
    const options = { wsdlContent: "<xml>...</xml>" };
    const expectedResult = { result: "success" };

    repositoryMock.call.mockResolvedValue(expectedResult);

    const result = await service.call(serviceName, methodName, params, options);

    expect(repositoryMock.call).toHaveBeenCalledWith(
      serviceName,
      methodName,
      params,
      options
    );
    expect(result).toEqual(expectedResult);
  });

  it("should propagate errors from repository", async () => {
    const error = new Error("Repository error");
    repositoryMock.call.mockRejectedValue(error);

    await expect(service.call("service", "method", {})).rejects.toThrow(error);
  });
});
