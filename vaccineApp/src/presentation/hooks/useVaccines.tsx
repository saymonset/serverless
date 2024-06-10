import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/apply-vaccine/applyVaccineAction";
import { deleteVaccinneAction, vaccinneAction } from "../../actions/apply-vaccine/vaccinneAction";
import { getPlanVaccineByDependentIdAction, updatePlanVaccineByDependentIdAction } from "../../actions/plan-vaccines/planVaccinesAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import { PlanVaccineByDependentEntity } from "../../domain/entities/PlanVaccineByDependentEntity";
import { Vaccine, VaccineDependentPage } from "../../domain/entities/VaccineDependent";
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

 
export const useVaccines = () => {
  
      const {  vaccines, isLoading, isShowDosis, dependentId, nameVaccine, vaccineId } = useSelector((state: RootState) => state.vaccineStore);
      const dispatch = useDispatch();



      const getVaccines = async(dependentId: string) =>{

        dispatch(startVaccines());
       
        const   data:VaccineDependentPage   = await vaccinneAction(dependentId);

          const vaccinesPromise  =  vaccinneAction(dependentId);
      const planVaccinesPromise  =  getPlanVaccineByDependentIdAction(dependentId);
      let [ vaccinesData, planVaccines ] = await Promise.all([ vaccinesPromise, planVaccinesPromise]);

        let {   desde,
                  limite,
                  total,
                  vaccines} = vaccinesData;

         let vaccinesFilter = vaccines.map(( vaccine)=>{
               if (planVaccines.includes(vaccine._id.$oid)){
                return {...vaccine, isChecked:true}
               }
               return vaccine;
       }).filter( vac => vac.isChecked);

       //Si las vacunas asignadas vienen en  cero, colocar todas las vacunas
       vaccines = vaccinesFilter.length>0 ? vaccinesFilter : vaccines;
       
       


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




 



      // async (limite:number =1000, page:number, term:string = "''")
      const getVaccinesAllBD = async(limite:number =1000, page:number, term:string = "''")=>{
        dispatch(startVaccines());
        dispatch(initVaccinesResponse({}));
         
      
        page = 0;
        let offset = page * 10;
        let desde = offset;
        if (term.length==0){
            term = "''";
        }
        const vaccines:Vaccine[]  = await getVaccinesAction(limite,desde, term);
        const payload = {
          vaccines
        };
        dispatch(loadVaccinesOnly(payload));
        dispatch(stopVaccines());     
       
        return vaccines;
      }

      const getVaccinesAll = async(term:string = "''"):Promise<Vaccine[]> =>{
        dispatch(startVaccines());
        dispatch(initVaccinesResponse({}));
        let page = 0;
        const vaccines:Vaccine[]  = await getVaccinesAction(10000,page, term);
        const payload = {
                          vaccines
                        };
                    
        dispatch(loadVaccinesOnly(payload));
        dispatch(stopVaccines());     
        return vaccines;
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
         
        }
        dispatch(stopApplyVaccines());
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

      const vaccineDelete = async ( vaccineIdDeleted:String)=> {
        try {
              dispatch( startVaccines());
              const data = await deleteVaccinneAction(vaccineIdDeleted);
           
              dispatch( stopVaccines());
        } catch (error) {
             console.log('Eliminando');
             console.log({error});
        }
      } 

      const putNameVaccineSelect = (dosis:DosisEntity) =>{
        let payload = {
          nameVaccine:dosis.vaccineName,
          vaccineId: dosis.vaccineID?.$oid,

        }
        dispatch(setNameVaccineSelect(payload));
      }
      const putVaccineID = (vaccineId:string) =>{
        let payload = {
          vaccineId 
        }
        dispatch(setVaccineId(payload));
      }

      const clearNameVaccineSelect = () =>{
        dispatch(setNameVaccineSelectClear());
      }

      const onVaccineCheckedChange = (checked:boolean, name:string, vaccs:[]): void => {
        vaccs.map((vac:Vaccine) =>{
          if (vac.name === name){
            console.log({name, checked})
            return {...vac, isChecked: !checked}
          }
          return {...vac};
        });

        const payload = {
          vaccines:vaccs
        };
       // console.log(JSON.stringfy(payload))
          dispatch(loadVaccinesOnly(payload));
      };
  
      
   

  return  {
    getVaccines,
    getDosis,
    getShowDosis,
    getOffDosis,
    getVaccinesAll,
 
    vaccineDelete,
    putNameVaccineSelect,
    clearNameVaccineSelect,
    putVaccineID,
    onVaccineCheckedChange,
   
    
    getVaccinesAllBD,
    nameVaccine,
    dependentId,
    vaccineId,
    vaccines,
    isLoading,
    isShowDosis,
  }
}
