import { useDispatch, useSelector } from "react-redux";
import { applyVaccinneAction } from "../../actions/apply-vaccine/applyVaccineAction";
import { deleteVaccinneAction, vaccinneAction } from "../../actions/apply-vaccine/vaccinneAction";
import { deleteDosisAction, getDosisByIdAction, getDosisByVaccineByIdAction, getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccineEntity, Vaccine } from "../../domain/entities/apply-vaccine-interface";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { DosisEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { RootState } from "../store";
import { loadDosisFilterbyVaccineId, startApplyVaccines, stopApplyVaccines } from "../store/slices/applyvaccines";
import { initDosis,loadDosis,stopDosis,startDosis, loadDosiDetalle } from "../store/slices/dosis";

 
 
 
export const useDosis = () => {
  
      const {  dosis, isLoading , dosiDetalle} = useSelector((state: RootState) => state.dosisStore);
      const dispatch = useDispatch();



    

      const getDosisByVaccine = async(vaccineId:string, term:string = "''"):Promise<DosisEntity[]>=>{
        dispatch(startDosis());
         
        const dosis: DosisEntity[] = await getDosisByVaccineByIdAction(vaccineId);
        const payload = {
          dosis
        };
        dispatch(loadDosis({payload}))
        dispatch(stopDosis());       
       
        return dosis ?? [];
      }
      const getDosisById = async(dosisId:string):Promise<DosisEntity>=>{
        dispatch(startDosis());
         
        const dosiDetalle: DosisEntity = await getDosisByIdAction(dosisId);
        const payload = {
          dosiDetalle
        };
        dispatch(loadDosiDetalle({payload}))
        dispatch(stopDosis());       
       
        return dosiDetalle ?? {};
      }

      const dosisDelete = async ( dosisIdDeleted:String)=> {
        try {
              dispatch( startDosis());
              const data = await deleteDosisAction(dosisIdDeleted);
              dispatch( stopDosis());
        } catch (error) {
             console.log('Eliminando');
             console.log({error});
        }
      } 

       

 

     
   

  return  {
     getDosisByVaccine,
     dosisDelete,
     getDosisById,
    dosis,
    isLoading,
    dosiDetalle
  }
}
