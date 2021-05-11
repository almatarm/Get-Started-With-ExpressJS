import HttpException from "./HttpException";

class UserAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(403, `User with username[${username}] already exists`);
  }
}

export default UserAlreadyExistsException;
