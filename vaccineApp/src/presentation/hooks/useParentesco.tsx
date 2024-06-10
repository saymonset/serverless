import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/apply-vaccine/applyVaccineAction";
import { deleteVaccinneAction, vaccinneAction } from "../../actions/apply-vaccine/vaccinneAction";
import { deleteParentescoAction, getParentescoAction } from "../../actions/parentescos/createEditParentescosAction";
import { getPlanVaccineByDependentIdAction, updatePlanVaccineByDependentIdAction } from "../../actions/plan-vaccines/planVaccinesAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import {  Relationship } from "../../domain/entities/ParentescoEntity";
import { PlanVaccineByDependentEntity } from "../../domain/entities/PlanVaccineByDependentEntity";
import { Vaccine, VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { DosisEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { RootState } from "../store";
import { loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";
import { initParentescosResponse, loadParentescosOnly, startParentescos, stopParentescos } from "../store/slices/parentescos";

 

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const useParentesco = () => {
  
      const { } = useSelector((state: RootState) => state.parentescoStore);
      const dispatch = useDispatch();


      // async (limite:number =1000, page:number, term:string = "''")
      const getParentescosAllBD = async(limite:number =1000, page:number, term:string = "''"):Promise<Relationship[]>=>{
        dispatch(startParentescos());
        dispatch(initParentescosResponse({}));
        page = 0;
        let offset = page * 10;
        let desde = offset;
        if (term.length==0){
            term = "''";
        }
        const parentescos:Relationship[]  = await getParentescoAction(limite,desde, term);
        const payload = {
          parentescos
        };
        dispatch(loadParentescosOnly(payload));
        dispatch(stopParentescos());     
       
        return parentescos;
      }



 
 
 
      const parentescoDelete = async ( parentescoIdDeleted:String)=> {
        try {
              dispatch( startParentescos());
              const data = await deleteParentescoAction(parentescoIdDeleted);
           
              dispatch( stopParentescos());
        } catch (error) {
             console.log('Eliminando');
             console.log({error});
        }
      } 

     
  
      
   

  return  {
    parentescoDelete,
    getParentescosAllBD,
  }
}
