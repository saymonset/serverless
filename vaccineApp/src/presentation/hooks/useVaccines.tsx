import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/vaccine/applyVaccineAction";
import { vaccinneAction } from "../../actions/vaccine/vaccinneAction";
import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { RootState } from "../store";
import { loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";
import { loadVaccinesResponse, offDosis, showDosis, startVaccines, stopVaccines } from "../store/slices/vaccines";

 

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const useVaccines = () => {
  
      const {  vaccines, isLoading, isShowDosis, dependentId } = useSelector((state: RootState) => state.vaccineStore);
      const dispatch = useDispatch();



      const getVaccines = async(dependentId: string) =>{
        const   data:VaccineDependentPage   = await vaccinneAction(dependentId);
        const {   desde,
                  limite,
                  total,
                  vaccines} = data;
        const payload = {
                          dependentId,
                          desde,
                          limite,
                          total,
                          vaccines
                        };
        dispatch(startVaccines());
        dispatch(loadVaccinesResponse(payload));
        dispatch(stopVaccines());       
        return payload;
      }


      const getDosis = async(vaccineId:string, dependentId:string) =>{
        dispatch(startApplyVaccines());
        const   data:ApplyVaccineEntity   = await applyVaccinneAction(vaccineId, dependentId );
        const { vacc_apply_vaccines } = data;
        if (vacc_apply_vaccines && vacc_apply_vaccines.length > 0){
          const { dependent } = vacc_apply_vaccines[0];
          const { vaccine } = vacc_apply_vaccines[1];
          const { dosis } = vacc_apply_vaccines[2];
   
          const payload = {
            dependent,
            vaccine,
            dosis
          }
          dispatch(loadDosisFilterbyVaccineId( payload ))
          dispatch(stopApplyVaccines());
        }
            return {};
      }
      const getShowDosis = () =>{
        let payload = {
          isShowDosis
        }
        dispatch(showDosis(payload));
      }

      const getOffDosis = () =>{
       
        dispatch(offDosis());
      }
   

  return  {
    getVaccines,
    getDosis,
    getShowDosis,
    getOffDosis,
    dependentId,
    vaccines,
    isLoading,
    isShowDosis,
  }
}
