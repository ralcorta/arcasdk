import { config } from "dotenv";

export class Environment {
  public readonly nodeEnv: string;

  constructor() {
    const nodeEnv = process.env.NODE_ENV || "local";
    config({
      path: `.env${nodeEnv ? `.${nodeEnv}` : ""}`,
    });
    this.nodeEnv = nodeEnv;
  }
}

const Env = new Environment();

export default Env;
