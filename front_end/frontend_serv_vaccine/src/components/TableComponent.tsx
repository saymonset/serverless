import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TableComponent = ({ tableData = [] }) => {
  return (
     
    {  tableData.map((rowData, index) => (
        <Row
          key={index}
          data={[
            rowData.name ,
            rowData.lastname,
            rowData.email,
            rowData.phone,
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => console.log('update')} style={{ marginRight: 10 }}>
                <Ionicons name="pencil" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>console.log('delete')}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>,
          ]}
          style={[{ backgroundColor: rowData.isUser ? 'gray' : 'white'}]}
          textStyle={{ margin: 6 ,  color: '#000000' }}
        />
      ))}
  )
}



