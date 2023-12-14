import venezuela from 'venezuela';



interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const PaisScreen = () => {


      const estadosOfVenezuela = () =>{
              const p = venezuela.pais;
              let estados = [];
              if (Array.isArray(p)) {
                      estados = p.map((pais : { capital: string, id_estado: number, municipios:[], estado: string })=>{
                              return {
                                'estado': pais.estado,
                                'capital':pais.capital,
                                'id_estado':pais.id_estado,
                                'municipios': pais.municipios
                              }
                    });

                    // Ordenar el arreglo 'estados' por el campo 'estado'
                    estados.sort((a, b) => a.capital.localeCompare(b.capital));
                    return estados;  
               }
      }


      const municipiosOfEstadosOfVenezuela = (id_estado: number) =>{
            const p = estadosOfVenezuela();
            const resultadoFiltrado = p.filter( (item: { capital: string, id_estado: number, municipios:[], estado: string }) => item.id_estado === id_estado);
           
            return resultadoFiltrado;
      }
   

  return  {
    estadosOfVenezuela,
    municipiosOfEstadosOfVenezuela
  }
}
