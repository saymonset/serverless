import {
    PermissionsAndroid,
    Platform,
  } from 'react-native';
  // Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import { useLogin } from './useLogin';
import { API_URL } from '../../config/api/vaccinesApi';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { useState } from 'react';

export const useExportar = () => {

  const [dependentId, setDependentId] = useState('');

    

    // nextPrev es faBorderNone, prev o next, 
  const exportVaccineAppliedByDependent = async (dependent_id:string) => {
    try {

      console.log('excel file open simons, dependent_id = ' + dependent_id);
      setDependentId(dependent_id);
      getPermission();
    //  const { data } = await vaccinesApi.get(`/reporte`);
     // console.log(data);
   
       
    } catch (error) {
      console.log(error)
    }
  }

  const getPermission = async () => {
    if (Platform.OS === 'ios') {
              actualDownload();
    } else {
      try {
        const granted = await hasAndroidPermission();
       console.log({granted});
        if (granted) {
         await actualDownload_android();
        } else {
          console.log("please grant permission");
        }
      } catch (err) {
        console.log("display error",err)    }
    }
  };


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
   //  const response = await vaccinesApi.get<DependentIDResponseBD>(`/dependent/${id}`);
   
    RNFetchBlob.config(configOptions || {})
      .fetch('GET', `${API_URL}/reporte/${dependentId}`, {'Cache-Control': 'no-store' })
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
    console.log(`${API_URL}/reporte/${dependentId}`);
   console.log(`Reporte por idedependent= ${dependentId} `);
    const url = `${API_URL}/reporte/${dependentId}`; // Reemplaza con la URL del archivo Excel que deseas descargar
    console.log('bajando desde android----------:'+url);
    const { dirs } = RNFetchBlob.fs;
    const dirToSave = dirs.DownloadDir; // Directorio de descarga en Android
    const token = await StorageAdapter.getItem('token');
    console.log({token})
  
    const headers = {
      'Cache-Control': 'no-store',
      'Authorization': `Bearer ${token}`
    };
    console.log('-------2---');
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirToSave}/archivo_excel.xlsx`, // Ruta de destino del archivo Excel descargado
      }).fetch('GET', url, headers);
      console.log('-------3--');
  
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




  return {
    exportVaccineAppliedByDependent
  }
}
