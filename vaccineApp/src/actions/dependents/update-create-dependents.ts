import { AxiosResponse, isAxiosError } from "axios";
import vaccinesApi from "../../config/api/vaccinesApi";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { DependentById, DependentCreateResponse, DependentUpdateCreateResponse } from "../../infrastructure/interfaces/dependentById-interface";
import { UpdateCreateDependent } from "../../infrastructure/mappers/dependent/updateDependent-mapper";
import { vaccinneAction } from "../apply-vaccine/vaccinneAction";
import { updatePlanVaccineByDependentIdAction } from "../plan-vaccines/planVaccinesAction";
import { getDependentByIdAction } from "./get-dependent-by-id";

export const updateCreateDependentAction = ( dependent: Partial<DependentById> )=> {
 
    if ( dependent._id && dependent._id.$oid !== 'new') {
      return updateDependent(dependent);
    }
    return createDependent( dependent );
  }


  const returnMapper = ( data: DependentUpdateCreateResponse ): DependentUpdateCreateResponse => {
    return  UpdateCreateDependent.dependentToEntity(data);
  }

  const returnCreaterMapper = ( data: DependentCreateResponse ): DependentUpdateCreateResponse => {
    return  UpdateCreateDependent.dependentCreateToEntity(data);
  }

  //TODO: revisar si viene el usuario
const updateDependent = async (dependent: Partial<DependentById>):Promise<DependentUpdateCreateResponse>  => {
    try {
       // let data0;
        let birthStr = '' ;
        // Algunos de estos campos no van ( token, phone)  y otros los tratamos ( birth)
        let { _id, birth, token, phone, user_id,   ...resto } = dependent;
        if (!birth){
          birthStr =  new Date().toISOString();
        }
        const { $oid } = _id ?? { $oid : ''};
        if (birth instanceof Date) {
            birthStr = birth.toISOString();
            // Resto del código...
        } else{
          birthStr = new Date(birth!).toISOString() || new Date().toISOString();  // Modify this line
        }
        let dep = Object.assign({}, resto, { birth: birthStr });
       
        const { data }= await vaccinesApi.put(`/dependent/${$oid}`, {...dep});
      return returnMapper({_id, ...data});
      
    } catch (error) {
      if ( isAxiosError(error) ) {
        console.log(error.response?.data);
      }
      throw new Error('Error al actualizar el producto');
    }
  }

  const createDependent = async(dependent: Partial<DependentById>):Promise<DependentUpdateCreateResponse> => {
    try {
        let data0 =  {};
        let birthStr = '' ;
        let { _id, birth, status,  ...resto } = dependent;
        if (birth instanceof Date) {
            birthStr = birth.toISOString();
        } 
        status = 'True'
        let dep = Object.assign({}, resto, { birth: birthStr});
       
        const { data }: AxiosResponse<DependentCreateResponse> = await vaccinesApi.post<DependentCreateResponse>(`/dependent/p`, {...dep, status});

        const { dependentNew } = data;

        //Scamos el id generado
        const { $oid:idDependent } = dependentNew;
        let vaccinesData:VaccineDependentPage = await vaccinneAction(idDependent);
        let { vaccines } = vaccinesData;
        //sacamos las vacunas que esten en alerta segun su edad y tomamos solo las vacunas que esten con alerta aaplicar
        let vaccs = vaccines.filter(( vac )=> vac.isAlertApply).map(( vac )=> vac._id.$oid);
        //Actualizamos su plan de vacunacion 
        await updatePlanVaccineByDependentIdAction  (idDependent,  vaccs ?? []) ; 
        

      return returnCreaterMapper(data);
    } catch (error) {
      if ( isAxiosError(error) ) {
        console.log(error.response?.data);
      }
      throw new Error('Error al actualizar el producto');
    }
  }

  export const deleteDependentAction =  async (id:String) => {
    const { data }  = await vaccinesApi.delete(`/dependent/${ id }`);
    return data;
  }