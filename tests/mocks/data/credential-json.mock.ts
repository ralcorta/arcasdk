import moment from "moment";
import { ILoginCredentials } from "../../../src/types";

export const mockLoginCredentials: ILoginCredentials = {
  header: [
    {
      version: "1.0",
    },
    {
      source: "source",
      destination: "destination",
      uniqueid: "uniqueid",
      generationtime: moment().toISOString(),
      expirationtime: moment().add(1, "day").toISOString(),
    },
  ],
  credentials: { sign: "mock-signature", token: "mock-token" },
};
