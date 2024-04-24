import { User } from "../../domain/entities/user";
import { LoginResponse } from "../interfaces/login.responses";

 




export class LoginMapper {
  static loginResponseToEntity( loginResponse: LoginResponse ):User {
    return {
      statusCode: loginResponse.statusCode ?? undefined,
      token:      loginResponse.token ?? undefined,
      usuario:    loginResponse.usuario ?? undefined,
      more:       loginResponse.more ?? undefined,
      resp:       loginResponse.resp ?? undefined,
      message:    loginResponse.message ?? undefined,
    }
  }
}