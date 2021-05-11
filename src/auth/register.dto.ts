import { IsString } from 'class-validator';

class LogInDTO {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  public email?: string;

  @IsString()
  public name: string;
}

export default LogInDTO;
