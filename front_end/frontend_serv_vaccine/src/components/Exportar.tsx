import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { useLogin } from '../hooks/useLogin';

interface Props {
        title?: string;
}

export const Exportar = ({ title = 'Exportar' }:Props) => {
    let { exportVaccineAppliedByDependent } = useApplyVaccines();
    const { token } = useLogin();
    const onExportar = async () => {
        await exportVaccineAppliedByDependent(token);
     }
  return (
    <TouchableOpacity onPress={() => onExportar()} style={{ marginTop: 0 }}>
        <Text style={{marginTop:10}}> { title  }</Text>
    </TouchableOpacity>
  )
}
