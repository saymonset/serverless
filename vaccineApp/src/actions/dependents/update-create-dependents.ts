import { AxiosResponse, isAxiosError } from "axios";
import vaccinesApi from "../../config/api/vaccinesApi";
import { DependentById, DependentCreateResponse, DependentUpdateCreateResponse } from "../../infrastructure/interfaces/dependentById-interface";
import { UpdateCreateDependent } from "../../infrastructure/mappers/dependent/updateDependent-mapper";

export const updateCreateDependentAction = ( dependent: Partial<DependentById> )=> {

    // product.stock = isNaN( Number(product.stock)) ? 0 : Number(product.stock);
    // product.price = isNaN( Number(product.price)) ? 0 : Number(product.price);
  
  
    if ( dependent._id && dependent._id.$oid !== 'new') {
      return updateDependent(dependent);
    }
  
  
    return createDependent( dependent );
  
  }


  const returnMapper = ( data: DependentUpdateCreateResponse ): DependentUpdateCreateResponse => {
    return  UpdateCreateDependent.dependentToEntity(data);
  }

  const returnCreaterMapper = ( data: DependentCreateResponse ): DependentUpdateCreateResponse => {
    return  UpdateCreateDependent.dependentCreateToEntity(data);
  }

  //TODO: revisar si viene el usuario
const updateDependent = async (dependent: Partial<DependentById>):Promise<DependentUpdateCreateResponse>  => {
    try {
    
      
       // let data0;
        let birthStr = '' ;
        const { _id, birth,  ...resto } = dependent;
        const { $oid } = _id ?? { $oid : ''};
        if (birth instanceof Date) {
            birthStr = birth.toISOString();
            // Resto del código...
        } 
        //const { $oid:id} = _id;
      // console.log( $oid);
        let dep = Object.assign({}, resto, { birth: birthStr });
       
        const { data }= await vaccinesApi.put(`/dependent/${$oid}`, {...dep});
  
     //  return data0;
      return returnMapper({_id, ...data});
      
    } catch (error) {
      if ( isAxiosError(error) ) {
        console.log(error.response?.data);
      }
      throw new Error('Error al actualizar el producto');
    }
  }

  const createDependent = async(dependent: Partial<DependentById>):Promise<DependentUpdateCreateResponse> => {
    try {
        let data0 =  {};
        let birthStr = '' ;
        const { _id, birth,  ...resto } = dependent;
        if (birth instanceof Date) {
            birthStr = birth.toISOString();
        } 
        let dep = Object.assign({}, resto, { birth: birthStr });
        const { data }: AxiosResponse<DependentCreateResponse> = await vaccinesApi.post<DependentCreateResponse>(`/dependent/p`, {...dep});
      return returnCreaterMapper(data);
      
    } catch (error) {
  
      if ( isAxiosError(error) ) {
        console.log(error.response?.data);
      }
      
      throw new Error('Error al actualizar el producto');
  
    }
  }