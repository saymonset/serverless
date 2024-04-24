import { SendSms } from "../../domain/entities/SendSms";
import { SendSMSResponse } from "../interfaces/sendSms.response";

export class SendSmsMapper {
    static sendSmsResponseToEntity( response: SendSMSResponse ):SendSms {
      return {
        resp:       response.resp ?? undefined,
        last_code:   response.last_code ?? undefined,
        statusCode:  response.statusCode ?? undefined,
        message:    response.message ?? undefined,
      }
    }
  }