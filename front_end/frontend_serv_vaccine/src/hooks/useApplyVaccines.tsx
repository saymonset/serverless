import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from './useForm';

import { ApplyVaccine, DesdeLimite, LIMITE_PAGE, NextPrevioPage } from '../interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { useDependent } from './useDependent';
import {
  startLoadingApplyVaccine, stopLoadingApplyVaccine, setDependentById, setDependent,
  addMessageApplyVaccine, removeMessageApplyVaccine, responseApplyVaccine, loadDataApplyVaccine,
  loadDosisFilterbyVaccineId, loadbyDosisOff, loadbyDosis
} from '../store/slices/applyvaccines';
import { useLogin } from './useLogin';
import vaccinesApi from '../api/vaccinesApi';
import { enviarMensajePorStatusCode } from '../utils/enviarMensajePorStatusCode';
import { Vaccine } from '../interfaces/apply-vaccines-interfaces';



export const useApplyVaccines = () => {

    
  const { resp, dependent_id, dependent, total, isLoading, message, tableData,vaccineuniqueFromTableData, dosisFilterbyVaccineIdFromTableData,
    limite, desde, currentPage, isConsultVaccine, isAddApplyVaccine, isConsultVaccineForDosis } = useSelector((state: store) => state.applyVaccineStore);

  {/** Estas variables vienen del store */ }
  let { _idStore, loteStore, imageStore, dosis_idStore, vaccination_dateStore,
    statusStore } = useDependent();
  const { token } = useLogin();



  {/** Estas variables son para inicializar el formulario */ }
  let inic = {
    _id: _idStore,
    lote: loteStore,
    image: imageStore,
    dosis_id: dosis_idStore,
    vaccination_date: vaccination_dateStore,
    status: statusStore,
  }
  const { _id, lote, image, dosis_id, vaccination_date, status, onChange } = useForm({ ...inic });


  const dispatch = useDispatch();
  const handlerRemoveMessageApplyVaccine = () => {
    const payload = {};
    dispatch(removeMessageApplyVaccine(payload))
  }
  const useApplyVaccineAddModify = async (applyVaccine: ApplyVaccine, token: string, total: number) => {

    try {

      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      dispatch(startLoadingApplyVaccine());
      let data0 = {} as any;
      let vaccination_dateStr = '';
      const { _id, vaccination_date, ...resto } = applyVaccine;
      if (vaccination_date instanceof Date) {
        vaccination_dateStr = vaccination_date.toISOString();
        // Resto del código...
      } else {
        // Manejar el caso en el que `birth` no sea de tipo `Date`
        vaccination_dateStr = vaccination_date;
      }

      let idFind = _id;
      let totalNew = total;

      if (_id) {
        let applyVaccine = Object.assign({}, resto, { vaccination_date: vaccination_dateStr });
        data0 = await vaccinesApi.put(`/applyVaccines/${_id}`, { ...applyVaccine });
      } else {
        let applyVaccine = Object.assign({}, resto, { vaccination_date: vaccination_dateStr });
        data0 = await vaccinesApi.post(`/applyVaccines/`, { ...applyVaccine });
      }
      let { data } = data0;

      let { resp, statusCode, message } = data;


      if (statusCode == 401 || !resp) {
        dispatch(addMessageApplyVaccine(enviarMensajePorStatusCode(statusCode)))
        return
      }
      let payload = {
        resp,
        message: enviarMensajePorStatusCode("201"),
        isLoading: false,
        tableData: [],
        total: 0
      }
      dispatch(responseApplyVaccine(payload));
      console.log(resp, statusCode, message)
      return
    } catch (error) {
      dispatch(addMessageApplyVaccine("Error: " + error))
    }
  }


  const handleByIdApplyVaccine = ( applyVaccine : ApplyVaccine) => {
    const   { dosis:{ vaccine} } = applyVaccine

    let payload = {
      dosisFilterbyVaccineIdFromTableData: dosisFilterByvaccineId( vaccine._id.$oid )
    }
    dispatch(loadDosisFilterbyVaccineId(payload))
  }

  const onLoadbyDosisOff = () =>{
    //Apagamos el sw de filtrar por el arreglo de dosis de cada vacuna, para que cargue el arreglo de vacunas del store apply_vaccines
    dispatch(loadbyDosisOff({}));
  }

  const onLoadbyDosis = () =>{
    //Apagamos el sw de filtrar por el arreglo de dosis de cada vacuna, para que cargue el arreglo de vacunas del store apply_vaccines
    dispatch(loadbyDosis({}));
  }

  const handlePreviousPage = (total: number, currentPage: number) => {
    if (currentPage > 1) {
      return currentPage = currentPage - 1;
    }
    return currentPage;
  };


  const handleNextPage = (total: number, currentPage: number) => {

    if (currentPage < total) {
      return currentPage = currentPage + 1;
    }
    return currentPage;
  };
  const whereGo = (nextPrevioPage: NextPrevioPage, total: number, currentPage: number) => {
    const { nextPage } = nextPrevioPage;
    // console.log({nextPrevioPage, total, currentPage})
    switch (nextPage) {
      case 'next':
        // Lógica para ir a la siguiente página
        return handleNextPage(total, currentPage);
        break;
      case 'prev':
        // Lógica para ir a la página anterior
        return handlePreviousPage(total, currentPage);
        break;
      case 'none':
        // Lógica para no realizar ninguna acción
        return currentPage = 1;
        break;
      default:
        break;
    }

    return currentPage;
  }

  const dependentById = async (id: string) => {
      const payload = id;
      dispatch(setDependentById(payload));
      const { data: { result } } = await vaccinesApi.get(`/dependent/${payload}`);
      //LLenamos dependent toda su data en el store
      dispatch(setDependent(result))
  }



  // nextPrev es faBorderNone, prev o next, 
  const loadVaccineAppliedByDependent = async (desdeLimite: DesdeLimite, currentPage: number, nextPrev: NextPrevioPage, token: string, idDependent: string) => {
    try {

      if (token) {
        await AsyncStorage.setItem('token', token);
      }
      dispatch(startLoadingApplyVaccine());

      const { desde, limite } = desdeLimite;
      const { data } = await vaccinesApi.get(`/applyVaccines/${limite}/${desde}/${idDependent}`);
      const { apply_vaccines, total, error } = data;
      currentPage = whereGo(nextPrev, total, currentPage);

      let payload = {
        tableData: apply_vaccines,
        vaccineuniqueFromTableData: vaccineUnique(apply_vaccines),
        dosisFilterbyVaccineIdFromTableData: [],
        desde,
        limite,
        currentPage,
        total
      };
      dispatch(loadDataApplyVaccine(payload));
      dispatch(stopLoadingApplyVaccine());
      if (error) {
        throw error
        return
      }
    } catch (error) {
      dispatch(stopLoadingApplyVaccine());
      dispatch(addMessageApplyVaccine("Error: " + error))
    }
  }



  const vaccineUnique = (apply_vaccines:  any) =>{
    let apply_vaccinesAux = [];
      if (apply_vaccines){
            // Crear un mapa para almacenar las vacunas únicas
            const uniqueVaccinesMap = new Map();
            // Filtrar y almacenar las vacunas únicas en el mapa
            apply_vaccines.forEach(apply_vaccine => {
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
  const dosisFilterByvaccineId = ( vaccine_id:string) =>{
    
    const filteredVaccines = tableData?.filter(vaccine => {
      return vaccine.dosis.vaccine._id.$oid === vaccine_id;
    });

    return filteredVaccines;
  }





  return {
    //  onGeneroSelectTrigger,
    //  onUserSelectTrigger,
    //  onRelationShipSelectTrigger,
    //  onDependent,
    _id,
    lote,
    image,
    dosis_id,
    vaccination_date,
    onChange,
    dependentById,
    handleByIdApplyVaccine,
    useApplyVaccineAddModify,
    resp,
    dependent_id,
    dependent,
    total,
    limite, desde, currentPage,
    isLoading,
    message,
    handlerRemoveMessageApplyVaccine,
    loadVaccineAppliedByDependent,
    tableData,
    vaccineuniqueFromTableData,
    dosisFilterbyVaccineIdFromTableData,
    token,
    isConsultVaccine,
    isAddApplyVaccine,
    isConsultVaccineForDosis,
    onLoadbyDosisOff,
    onLoadbyDosis

    //  selectedGeneroId,
    //  selecteRelationShipId,
    //  selectedUserId,
    //  dependentById,
    //  dataFiltred, 
    //  setIsVisible,
    //  isVisible,

  }
}
