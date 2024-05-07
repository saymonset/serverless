import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/vaccine/applyVaccineAction";
import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import { RootState } from "../store";
import { clearApplyVaccine, loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";

 

 
 
export const useApplyVaccine = () => {
  
      const {  vaccine, dosis, isLoading } = useSelector((state: RootState) => state.applyVaccineStore);
      const dispatch = useDispatch();


 


      const getDosis = async(vaccineId:string, dependentId:string) =>{
        dispatch(startApplyVaccines());
        dispatch(clearApplyVaccine( ))
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
        } 
        
        dispatch(stopApplyVaccines());
            return {};
      }
   

  return  {
    getDosis,
    vaccine,
    dosis,
    isLoading
  }
}
