import { useDispatch, useSelector } from "react-redux";
import { getPlanVaccineByDependentIdAction, updatePlanVaccineByDependentIdAction } from "../../actions/plan-vaccines/planVaccinesAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { Vaccine } from "../../domain/entities/VaccineDependent";
import { RootState } from "../store";
import { initVaccinesResponse, loadVaccinesOnly, startVaccines, stopVaccines } from "../store/slices/vaccines";

 

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const usePlanVaccines = () => {
  
      const {  vaccines, isLoading, isShowDosis, dependentId, nameVaccine, vaccineId } = useSelector((state: RootState) => state.vaccineStore);
      const dispatch = useDispatch();



  
      const vaccineFilter = async(term : string = '', vaccines: Vaccine[]): Promise<Vaccine[]> => {

       
        // Convertir el término de búsqueda a minúsculas para una comparación insensible a mayúsculas y minúsculas
        const searchTerm = term.toLowerCase();
        if (term == '' || term.length == 0){
          
           return [...vaccines];
        }
        // Filtrar las vacunas basadas en el término de búsqueda en el nombre o descripción
        const filteredVaccines = vaccines.filter(vaccine =>
          vaccine.name.toLowerCase().includes(searchTerm) || vaccine.description.toLowerCase().includes(searchTerm)
        );
        return [...filteredVaccines];
      }

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
    vaccineFilter,
    isLoading,
    isShowDosis,
  }
}
