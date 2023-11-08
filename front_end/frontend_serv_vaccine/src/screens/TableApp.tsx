import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';



function TableApp() {
  const [tableData, setTableData] = useState([
    ['ID', 'Nombre', 'Descripción'],
    ['1', 'Producto 1', 'Descripción del producto 1'],
    ['2', 'Producto 2', 'Descripción del producto 2'],
    ['3', 'Producto 3', 'Descripción del producto 3'],
  ]);

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableData[0]} style={styles.head} textStyle={styles.headText} />
        <Rows
          data={tableData.slice(1)}
          style={styles.row}
          textStyle={styles.rowText}
        />
      </Table>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    height: 40,
  },
  rowText: {
    margin: 6,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TableApp;
