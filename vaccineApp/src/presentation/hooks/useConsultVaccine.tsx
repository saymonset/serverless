import { useDispatch, useSelector } from "react-redux";
import { consultVaccineAction } from "../../actions/apply-vaccine/consultVaccineAction";
import { getVaccinesAction } from "../../actions/vaccines/createEditVaccinesAction";
import { ApplyVaccine, ConsultByIndependentEntity } from "../../domain/entities/ConsultByIndependentEntity";
import { Vaccine } from "../../domain/entities/VaccineEditCreateEntity";
import { RootState } from "../store";
import {  clearConsultVaccine, loadDataConsultVaccine, startConsultVaccines, stopConsultVaccines } from "../store/slices/consultvaccines";

 

 
 
export const useConsultVaccine = () => {
  
      const { byDependentApplyVaccines, isConsultVaccineForDosis, isLoading ,
        applyVaccinesUniqByIds, byDependentAppliedDosis} = useSelector((state: RootState) => state.consultVaccineStore);
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

        //Obtenemos solo las  dosis
        // Verificar si apply_vaccines no está vacío antes de mapear las dosis
       const byDependentAppliedDosis = apply_vaccines.length > 0 ? apply_vaccines.map((av) => av.dosis) : [];


        
          let payload = {
            tableData: apply_vaccines,
            //Todas las vacunas aplicadas y vienen repetidas por la dosis
            byDependentApplyVaccines: apply_vaccines,
            //Todas las vacunas aplicadas y siin repetirla
            applyVaccinesUniqByIds: vaccineUnique(apply_vaccines),
            //Todas las dosis aplicadas
            byDependentAppliedDosis,
            dosis: [],
            vaccine:{},
            desde,
            limite,
            currentPage:0,
            total
          };
          dispatch(loadDataConsultVaccine( payload ))
        
        dispatch(stopConsultVaccines());
            return {};
      }
     
      


      const getAllVaccines = async() =>{
        dispatch(startConsultVaccines());
        dispatch(clearConsultVaccine( ));
        let page=0;
        const vaccines: Vaccine[] = await getVaccinesAction(10000, page);
        
      }
   

  return  {
    loadVaccineAppliedByDependent,
    isLoading,
    byDependentApplyVaccines,
    applyVaccinesUniqByIds,
    isConsultVaccineForDosis,
    byDependentAppliedDosis
  }
}
