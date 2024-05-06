import { DependentCreateResponse, DependentUpdateCreateResponse } from "../../interfaces/dependentById-interface";

export class UpdateCreateDependent {

    static dependentToEntity( objBD: DependentUpdateCreateResponse ):DependentUpdateCreateResponse {
      return {
        statusCode:objBD.statusCode,
        resp:       objBD.resp,
        message:    objBD.message,
        _id : objBD._id,
      }
    }
    static dependentCreateToEntity( objBD: DependentCreateResponse ):DependentUpdateCreateResponse {
      return {
        statusCode:objBD.statusCode,
        resp:       objBD.resp,
        message:    objBD.message,
        _id: {
              $oid:objBD.dependentNew.$oid
          }
      }
    }
  }