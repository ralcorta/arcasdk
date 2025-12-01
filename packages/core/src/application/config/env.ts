import { config } from "dotenv";

export class Environment {
  public readonly nodeEnv: string;

  constructor() {
    config();
    this.nodeEnv = (process.env.NODE_ENV || "local") as string;
  }
}

const Env = new Environment();

export default Env;
