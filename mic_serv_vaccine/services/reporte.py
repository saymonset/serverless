from openpyxl import load_workbook
import tempfile
from flask import Flask, send_file
import os
 

def get_reporte_test_service():
    # Modifica el archivo de Excel y obtiene su ruta temporal
    ruta_archivo_modificado = modificar_archivo_excel()
    # Devuelve el archivo modificado para su descarga
    return send_file(ruta_archivo_modificado, as_attachment=True)

def modificar_archivo_excel():
      # Nombre del archivo
    nombre_archivo = "scheme//children.xlsx"
    # Obtener el path absoluto del archivo
    path_absoluto = os.path.abspath(nombre_archivo)

    # Ruta del archivo original en el paquete de implementación
    ruta_archivo_original = path_absoluto

    # Crea un archivo temporal para trabajar con él
    archivo_temporal = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')

    # Copia el contenido del archivo original al archivo temporal
    with open(ruta_archivo_original, 'rb') as archivo_origen:
        archivo_temporal.write(archivo_origen.read())

    # Cierra el archivo temporal
    archivo_temporal.close()

    # Carga el archivo temporal con openpyxl
    workbook = load_workbook(archivo_temporal.name)
    sheet = workbook['Hoja1']
    datos = ['11-03-2023', '11-03-2023', '11-05-2023']
    fila = 3
    for dato in datos:
        celda = sheet.cell(row=fila, column=5)
        celda.value = dato
        print(f'celda.value = {celda.value}')
        fila += 1
    # Guarda los cambios en el archivo temporal
    workbook.save(archivo_temporal.name)

    # Cierra el archivo de trabajo
    workbook.close()
  
    print(f'Saliendo el path = {archivo_temporal.name}')
    # Devuelve la ruta del archivo temporal modificado
    return archivo_temporal.name

     
 