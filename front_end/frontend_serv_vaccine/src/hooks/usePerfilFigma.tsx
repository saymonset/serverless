import React, { useState} from 'react'
import { useEffect } from 'react';
import perfiles, { PerfilFigma } from '../interfaces/perfil-figma-interfaces';


export const usePerfilFigma = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ lista, setLista] = useState< PerfilFigma[] >( perfiles )

    const loadInfo = async () => {
         setIsLoading(true);
         const data = perfiles;
         setLista(data);
         setIsLoading(false);
    }

    useEffect( () => {
        loadInfo();
    }, []);

  return  {
         lista,
         isLoading
  }
}
