import { useSelector } from "react-redux";
import vaccinesApi from "../../config/api/vaccinesApi";
import { DependentBD, DependentBDResponse } from "../../infrastructure/interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { DependentById, DependentIDResponse, DependentIDResponseBD } from "../../infrastructure/interfaces/dependentById-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentIdMapper } from "../../infrastructure/mappers/dependent/dependent-Id-mapper";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";
import { RootState } from "../../presentation/store";

const returnMapper = ( data: DependentIDResponseBD ): DependentById => {
  return  DependentIdMapper.dependentToEntity(data);
}


  const emptyDependent: DependentById = {
    _id:        {$oid: ''},
    name:       '',
    lastname:   '',
    email:      '',
    birth:      new Date(),
    gender_id:  '',
    relationship_id: '',
    status:     true,
    phone:      '',
    isUser:     false,
    user_id:     '',
    isChildren: false,
    age:        0,
    days_birth: 0,
    state:'',
    city:''
 
  }


  export const getDependentByIdAction = async (id:string):Promise<DependentById> => {
    try {
      if ( id === 'new' ) {
          return emptyDependent;
      }
      const response = await vaccinesApi.get<DependentIDResponseBD>(`/dependent/${id}`);
      const { data } = response;
        return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };
