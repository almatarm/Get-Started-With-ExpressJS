import "dotenv/config";

class AuthConfig {
  static jwtAccessKey: string        = process.env.JWT_ACCESS_KEY;
  static jwtAccessExpiresIn: string  = process.env.JWT_ACCESS_EXPIRES_IN;
  static jwtRefreshKey: string       = process.env.JWT_REFRESH_KEY;
  static jwtRefreshExpiresIn: string = process.env.JWT_REFRESH_EXPIRES_IN;
  static cookiesSignKey: string      = process.env.COOKIES_SIGN_KEY;
  static saltRounds = 10;
}

export default AuthConfig;