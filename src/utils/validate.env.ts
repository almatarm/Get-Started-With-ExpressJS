import { cleanEnv, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    PORT: port({ default: 7000 })
  });
}

export default validateEnv;
