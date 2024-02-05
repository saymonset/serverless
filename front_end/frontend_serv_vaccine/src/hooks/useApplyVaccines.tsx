import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from './useForm';

import { ApplyVaccine, DesdeLimite, LIMITE_PAGE, NextPrevioPage } from '../interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { useDependent } from './useDependent';
import {
  startLoadingApplyVaccine, stopLoadingApplyVaccine, setDependentById, setDependent,
  addMessageApplyVaccine, removeMessageApplyVaccine, responseApplyVaccine, loadDataApplyVaccine, byIdApplyVaccine
} from '../store/slices/applyvaccines';
import { useLogin } from './useLogin';
import vaccinesApi from '../api/vaccinesApi';
import { enviarMensajePorStatusCode } from '../utils/enviarMensajePorStatusCode';



export const useApplyVaccines = () => {

    
  const { resp, dependent_id, dependent, total, isLoading, message, tableData,
    limite, desde, currentPage, isConsultVaccine, isAddApplyVaccine } = useSelector((state: store) => state.applyVaccineStore);

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


  const handleByIdApplyVaccine = ({ _id, dependent_id, dosis_id, image, vaccination_date, lote }: ApplyVaccine) => {

    const payload = {
      _id,
      dependent_id,
      dosis_id,
      image,
      vaccination_date,
      lote
    }
    dispatch(byIdApplyVaccine(payload));
  }

  // byIdApplyVaccine: ( state, { payload } ) => {
  //   state._id = payload._id
  //   state.dependent_id = payload.dependent_id;
  //   state.dosis_id = payload.dosis_id;
  //   state.image = payload.image;
  //   state.lote = payload.lote;
  //   state.vaccination_date = payload.vaccination_date;
  // },


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
    try {
      dispatch(startLoadingApplyVaccine({}));
      if (token) {
        await AsyncStorage.setItem('token', token);
      }
      const payload = id;
      //Pmos la data
      let desde = 0;
      let limite = LIMITE_PAGE;

      loadData({
        limite,
        desde
      }, 1, {
        nextPage: 'none'
      }, token, id)

      dispatch(setDependentById(payload));
      dispatch(stopLoadingApplyVaccine());
    } catch (error) {
      dispatch(addMessageApplyVaccine("Error: " + error))
    }
  }



  // nextPrev es faBorderNone, prev o next, 
  const loadData = async (desdeLimite: DesdeLimite, currentPage: number, nextPrev: NextPrevioPage, token: string, idDependent: string) => {
    try {

      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      dispatch(startLoadingApplyVaccine());

      const { data: { result } } = await vaccinesApi.get(`/dependent/${idDependent}`);
      console.log('-----------1--------------');
      let dependent = result;
      //LLenamos dependent toda su data en el store
      dispatch(setDependent(dependent))
      dispatch(setDependentById(idDependent));


      const { desde, limite } = desdeLimite;

      const { data } = await vaccinesApi.get(`/applyVaccines/${limite}/${desde}/${idDependent}`);

      const { apply_vaccines, total, error } = data;

      currentPage = whereGo(nextPrev, total, currentPage);


      let payload = {
        tableData: apply_vaccines,
        desde,
        limite,
        currentPage,
        total
      };

      dispatch(loadDataApplyVaccine(payload));
      dispatch(stopLoadingApplyVaccine({}));
      if (error) {
        throw error
        return
      }
    } catch (error) {
      dispatch(stopLoadingApplyVaccine({}));
      dispatch(addMessageApplyVaccine("Error: " + error))
    }
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
    loadData,
    tableData,
    token,
    isConsultVaccine,
    isAddApplyVaccine

    //  selectedGeneroId,
    //  selecteRelationShipId,
    //  selectedUserId,
    //  dependentById,
    //  dataFiltred, 
    //  setIsVisible,
    //  isVisible,

  }
}
