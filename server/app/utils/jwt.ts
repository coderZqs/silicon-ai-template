import jsonwebtoken from "jsonwebtoken";
import config from "../config/config";

let jwtSecret = config.jwt.jwt_secret;

type TokenData = {
  time: number;
  timeout: number;
  username: string;
  id: number;
};
export default class JwtAuth {
  /**
   * @static
   * @param {TokenData}
   * @param {*} [options]
   * @return {*}  {string}
   * @memberof JwtAuth
   */
  public static signUserToken(tokenData: TokenData, options?: any): string {
    return jsonwebtoken.sign(tokenData, jwtSecret, options);
  }

  /**
   * 验证用户token值
   * @static
   * @param {string} token
   * @return {*}  {Object}
   * @memberof JwtAuth
   */
  public static verifyUserToken(token: string): any {
    try {
      const authorization = token && token.split(" ")[1];
      return jsonwebtoken.verify(authorization, jwtSecret);
    } catch (error) {
      console.log(error);
      throw { code: 401, message: "no authorization" };
    }
  }
}
