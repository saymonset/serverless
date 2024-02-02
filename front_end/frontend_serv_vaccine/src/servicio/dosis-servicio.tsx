import vaccinesApi from "../api/vaccinesApi";
import { DosisResponse, Dosiss } from "../interfaces";
import { Vaccine } from "../interfaces/vaccine-interfaces";

export const getDosisById = async(dosis_id:string, token: string) => {
        let  dosis1=  vaccinesApi.get<Dosiss>(`/dosis/${dosis_id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        const [ dosisJson ] = await Promise.all([ dosis1]); 
        const { data }: { data: Dosiss } = dosisJson; // Especifica el tipo de dato para la propiedad datatipo de dato para la propiedad data
        return data;
   }

   export const geVaccinesById = async(vaccine_id:string, token: string) => {
        let  vaccines1=  vaccinesApi.get<Vaccine>(`/vaccine/${vaccine_id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        const [ vaccineJson ] = await Promise.all([ vaccines1]); 

        
        const { data }: { data: Vaccine } = vaccineJson; // Especifica el tipo de dato para la propiedad data
        //console.log({data});
     return data;
}