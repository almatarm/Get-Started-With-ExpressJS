import { IsEmail, IsString, IsUrl } from 'class-validator';

class UserDTO {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsUrl()
  public photo: string;

}

export default UserDTO;
