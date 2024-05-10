import { useDispatch, useSelector } from "react-redux";
import { consultVaccineAction } from "../../actions/vaccine/consultVaccineAction";
import { ApplyVaccine, ConsultByIndependentEntity } from "../../domain/entities/ConsultByIndependentEntity";
import { RootState } from "../store";
import { clearConsultVaccine, loadDataConsultVaccine, startConsultVaccines, stopConsultVaccines } from "../store/slices/consultvaccines";

 

 
 
export const useConsultVaccine = () => {
  
      const { vaccineuniqueFromTableData, isConsultVaccineForDosis, isLoading } = useSelector((state: RootState) => state.consultVaccineStore);
      const dispatch = useDispatch();


 
      const vaccineUnique = (apply_vaccines:  ApplyVaccine[] ) =>{
        let apply_vaccinesAux = [];
          if (apply_vaccines){
                // Crear un mapa para almacenar las vacunas únicas
                const uniqueVaccinesMap = new Map();
                // Filtrar y almacenar las vacunas únicas en el mapa
                apply_vaccines.forEach( (apply_vaccine:ApplyVaccine )=> {
                  const vaccineId = apply_vaccine.dosis.vaccine._id.$oid;
                  if (!uniqueVaccinesMap.has(vaccineId)) {
                    uniqueVaccinesMap.set(vaccineId, apply_vaccine);
                  }
                });
                 // Obtener las vacunas únicas del mapa
                 apply_vaccinesAux = Array.from(uniqueVaccinesMap.values());
          }
          return apply_vaccinesAux;
      }


      const loadVaccineAppliedByDependent = async( dependentId:string) =>{
        dispatch(startConsultVaccines());
        dispatch(clearConsultVaccine( ));
       //const { data } = await vaccinesApi.get(`/applyVaccines/${limite}/${desde}/${idDependent}`);
       let limite = 1000;
       let desde = 0;
        const   data:ConsultByIndependentEntity   = await consultVaccineAction( limite, desde, dependentId );
        const { apply_vaccines, total } = data;
        if (true){
           
   
          let payload = {
            tableData: apply_vaccines,
            vaccineuniqueFromTableData: vaccineUnique(apply_vaccines),
            dosis: [],
            vaccine:{},
            desde,
            limite,
            currentPage:0,
            total
          };
          dispatch(loadDataConsultVaccine( payload ))
        } 
        
        dispatch(stopConsultVaccines());
            return {};
      }
   

  return  {
    
    loadVaccineAppliedByDependent,
    isLoading,
    isConsultVaccineForDosis,
    vaccineuniqueFromTableData
  }
}
