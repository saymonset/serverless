import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/apply-vaccine/applyVaccineAction";
import { vaccinneAction } from "../../actions/apply-vaccine/vaccinneAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccineEntity, Vaccine } from "../../domain/entities/apply-vaccine-interface";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { RootState } from "../store";
import { loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";
import { loadVaccinesOnly, loadVaccinesResponse, offDosis, setNameVaccineSelect, showDosis, startVaccines, stopVaccines } from "../store/slices/vaccines";

 

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const useVaccines = () => {
  
      const {  vaccines, isLoading, isShowDosis, dependentId, nameVaccine } = useSelector((state: RootState) => state.vaccineStore);
      const dispatch = useDispatch();



      const getVaccines = async(dependentId: string) =>{
        dispatch(startVaccines());
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
       
        dispatch(loadVaccinesResponse(payload));
        dispatch(stopVaccines());       
        return payload;
      }

      const getVaccinesAll = async(term:string) =>{
        dispatch(startVaccines());
        let page = 0;
        const vaccines:Vaccine[]  = await getVaccinesAction(10000,page, term);
        const payload = {
                          vaccines
                        };
        dispatch(loadVaccinesOnly(payload));
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

      const putNameVaccineSelect = (nameVaccine:string) =>{
      
        let payload = {
          nameVaccine
        }
        dispatch(setNameVaccineSelect(payload));
      }

 
   

  return  {
    getVaccines,
    getDosis,
    getShowDosis,
    getOffDosis,
    getVaccinesAll,
    putNameVaccineSelect,
    nameVaccine,
    dependentId,
    vaccines,
    isLoading,
    isShowDosis,
  }
}
