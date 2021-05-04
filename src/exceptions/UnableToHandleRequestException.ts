import HttpException from "./HttpException";

class UnableToHandleRequestExeception extends HttpException {
  constructor(message: string) {
    super(
      503,
      `The server is currently unable to handle the request: ${message}`
    );
  }
}

export default UnableToHandleRequestExeception;
