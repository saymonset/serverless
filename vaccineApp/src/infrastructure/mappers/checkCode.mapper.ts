import { CheckCode } from "../../domain/entities/CheckCode";
import { CheckCodeResponse } from "../interfaces/checkCode.response";

export class CheckCodeMapper {
    static checkCodeResponseToEntity( response: CheckCodeResponse ):CheckCode {
      return {
        resp:       response.resp ?? undefined,
        statusCode: response.statusCode ?? undefined,
        message:    response.message ?? undefined,
        token:      response.token ?? undefined,
      }
    }
  }