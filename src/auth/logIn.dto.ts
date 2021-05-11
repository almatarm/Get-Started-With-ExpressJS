import { IsString } from 'class-validator';

class LogInDTO {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export default LogInDTO;
