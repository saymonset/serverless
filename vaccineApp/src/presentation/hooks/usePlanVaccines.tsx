import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/apply-vaccine/applyVaccineAction";
import { deleteVaccinneAction, vaccinneAction } from "../../actions/apply-vaccine/vaccinneAction";
import { getPlanVaccineByDependentIdAction, updatePlanVaccineByDependentIdAction } from "../../actions/plan-vaccines/planVaccinesAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccineEntity, Vaccine } from "../../domain/entities/apply-vaccine-interface";
import { PlanVaccineByDependentEntity } from "../../domain/entities/PlanVaccineByDependentEntity";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { DosisEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { RootState } from "../store";
import { loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";
import { initVaccinesResponse, loadVaccinesOnly, loadVaccinesResponse, offDosis, setNameVaccineSelect, setNameVaccineSelectClear, setVaccineId, showDosis, startVaccines, stopVaccines } from "../store/slices/vaccines";

 

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const usePlanVaccines = () => {
  
      const {  vaccines, isLoading, isShowDosis, dependentId, nameVaccine, vaccineId } = useSelector((state: RootState) => state.vaccineStore);
      const dispatch = useDispatch();



  

      const getPlanVaccinesAll = async(dependentId:string) =>{
      
        dispatch(startVaccines());
        dispatch(initVaccinesResponse({}));
     
        let page = 0;
        let term = '""';
        const vaccinesPromise  =  getVaccinesAction(10000,page, term);
       
        const planVaccinesPromise  =  getPlanVaccineByDependentIdAction(dependentId);
       
        let [ vaccines, planVaccines ] = await Promise.all([ vaccinesPromise, planVaccinesPromise]);
      

         vaccines = vaccines.map(( vaccine)=>{
                 if (planVaccines.includes(vaccine._id.$oid)){
                  return {...vaccine, isChecked:true}
                 }
                 return vaccine;
         });
        
        const payload = {
                          vaccines
                        };
        dispatch(loadVaccinesOnly(payload));
        dispatch(stopVaccines());     
        return payload;
      }

      
      const getPlanVaccinesByDependent = async(dependentId:string):Promise<Vaccine[]> =>{
        dispatch(startVaccines());
        dispatch(initVaccinesResponse({}));
        let page = 0;
        let term = '""';
       
        const vaccinesPromise  =  getVaccinesAction(10000,page, term);
        const planVaccinesPromise  =  getPlanVaccineByDependentIdAction(dependentId);
        let [ vaccines, planVaccines ] = await Promise.all([ vaccinesPromise, planVaccinesPromise]);

         vaccines = vaccines.map(( vaccine)=>{
                 if (planVaccines.includes(vaccine._id.$oid)){
                  return {...vaccine, isChecked:true}
                 }
                 return vaccine;
         }).filter( vac => vac.isChecked)

       
        const payload = {
                          vaccines
                        };
        dispatch(loadVaccinesOnly(payload));
        dispatch(stopVaccines());     
        return vaccines;
      }

      const updatePlanVaccinesByDependent = async(dependentId:string, vacc:string[]) =>{
        dispatch(startVaccines());
    
         const planVaccines  = await updatePlanVaccineByDependentIdAction(dependentId,  vacc);
    
        const payload = {
                          vaccines
                        };
        // dispatch(loadVaccinesOnly(payload));
        dispatch(stopVaccines());     
        return payload;
      }

 
  
      
   

  return  {
 
    getPlanVaccinesAll,
    
    updatePlanVaccinesByDependent,
    getPlanVaccinesByDependent,
     
    nameVaccine,
    dependentId,
    vaccineId,
    vaccines,
    isLoading,
    isShowDosis,
  }
}
