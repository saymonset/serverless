import { PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';

// Import Components
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from './useForm';

import { ApplyVaccine, DesdeLimite, LIMITE_PAGE, NextPrevioPage, VaccApplyVaccineResponse } from '../interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { useDependent } from './useDependent';
import {
  startLoadingApplyVaccine, stopLoadingApplyVaccine, setDependentById, setDependent,
  addMessageApplyVaccine, removeMessageApplyVaccine, responseApplyVaccine, loadDataApplyVaccine,
  loadDosisFilterbyVaccineId, loadbyDosisOff, loadbyDosis
} from '../store/slices/applyvaccines';
import { useLogin } from './useLogin';
import vaccinesApi, { baseURL } from '../api/vaccinesApi';
import { enviarMensajePorStatusCode } from '../utils/enviarMensajePorStatusCode';

// Import React Component
import React from 'react';



// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

export const useApplyVaccines = () => {

    
  const { resp, dependent_id, dependent, total, isLoading, message, tableData,vaccineuniqueFromTableData, dosis,
    limite, desde, currentPage, isConsultVaccine, isAddApplyVaccine, isConsultVaccineForDosis, vaccine } = useSelector((state: store) => state.applyVaccineStore);

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

  const findDosisByVaccineOfDependent = async(vaccineId:string, dependentId:string, token:string) => {
    console.log('------------1-------------');
    console.log({vaccineId});
        console.log({vaccineId, dependentId, token});
        console.log('------------2-------------');     
  }


  const handleByIdApplyVaccine = async(dosisId:string, dependentId:string, token:string) => {
    try {

      if (token) {
        await AsyncStorage.setItem('token', token);
      }
      dispatch(startLoadingApplyVaccine());
      console.log({dosisId, dependentId})
      const { data } = await vaccinesApi.get<VaccApplyVaccineResponse>(`/vaccine/vaccdosisdependet/${dosisId}/${dependentId}`);
      const { vacc_apply_vaccines} = data;
   
      const [user, vaccine, dosis] =  vacc_apply_vaccines;
      //Saco de 
     
   
      if (vacc_apply_vaccines){
      
        let payload = {
             dosis:dosis.dosis,
             vaccine:vaccine.vaccine
         }
    dispatch(loadDosisFilterbyVaccineId(payload))
      }
     
     
      dispatch(stopLoadingApplyVaccine());
      
    } catch (error) {
      dispatch(stopLoadingApplyVaccine());
      dispatch(addMessageApplyVaccine("Error: " + error))
      console.log('errror-------');
    }
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
        dosis: [],
        vaccine:{},
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

  const actualDownload = () => {
    const { dirs } = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Invoice.xlsx`,
        path: `${dirs.DownloadDir}/Invoice.xlsx`,
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Invoice.xlsx',
      path: `${dirToSave}/Invoice.xlsx`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });
   console.log('aqui vamos!!!---------');
    RNFetchBlob.config(configOptions || {})
      .fetch('GET', `${baseURL}/reporte`, {'Cache-Control': 'no-store' })
      .then(res => {
 
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log("file downloaded")      
 }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
            });
  };



  const actualDownload_android = async () => {
    const url = `${baseURL}/reporte`; // Reemplaza con la URL del archivo Excel que deseas descargar
  
    const { dirs } = RNFetchBlob.fs;
    const dirToSave = dirs.DownloadDir; // Directorio de descarga en Android
  
    const headers = {
      'Cache-Control': 'no-store',
      'Authorization': `Bearer ${token}`
    };
  
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirToSave}/archivo_excel.xlsx`, // Ruta de destino del archivo Excel descargado
      }).fetch('GET', url, headers);
  
      // Verificar si la descarga fue exitosa
      if (response.respInfo.status === 200) {
        console.log('Archivo Excel descargado exitosamente');
  
        console.log(response.path())
        // Abrir el archivo Excel utilizando react-native-file-viewer
        const filePath = response.path();
        await FileViewer.open(filePath, { showOpenWithDialog: true });
      } else {
        console.log('Error al descargar el archivo Excel');
      }
    } catch (error) {
      console.log('Error al descargar el archivo Excel:', error);
    }
  };
  

  

  const getPermission = async () => {
    if (Platform.OS === 'ios') {
      actualDownload();
    } else {
      try {
        const granted = await hasAndroidPermission();
       
        if (granted) {
         await actualDownload_android();
        } else {
          console.log("please grant permission");
        }
      } catch (err) {
        console.log("display error",err)    }
    }
  };

  const hasAndroidPermission = async () => {
    if (Number(Platform.Version) >= 33) {
      return true;
    }
  
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }


  // nextPrev es faBorderNone, prev o next, 
  const exportVaccineAppliedByDependent = async (token:string) => {
    try {

      getPermission();
    //  const { data } = await vaccinesApi.get(`/reporte`);
     // console.log(data);
   
       
    } catch (error) {
      console.log(error)
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
    findDosisByVaccineOfDependent,
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
    dosis,
    vaccine,
    token,
    isConsultVaccine,
    isAddApplyVaccine,
    isConsultVaccineForDosis,
    onLoadbyDosisOff,
    onLoadbyDosis,
    exportVaccineAppliedByDependent

    //  selectedGeneroId,
    //  selecteRelationShipId,
    //  selectedUserId,
    //  dependentById,
    //  dataFiltred, 
    //  setIsVisible,
    //  isVisible,

  }
}
