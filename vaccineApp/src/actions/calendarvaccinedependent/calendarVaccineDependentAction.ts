import moment from "moment";
import vaccinesApi from "../../config/api/vaccinesApi";
import { Dosi } from "../../domain/entities/apply-vaccine-interface";
import { User } from "../../domain/entities/user";
import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { CalendarVaccineByDependentResponse, CalendarVaccineDependent } from "../../infrastructure/interfaces/calendar-vaccinebydependents";
import { DependentBDResponse } from "../../infrastructure/interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";
import { applyVaccinneAction } from "../apply-vaccine/applyVaccineAction";
import { getDependentByIdAction, getDependentByPageAction } from "../dependents/get-dependents-by-pageAction.ts";

const returnMapper = ( data: DependentBDResponse ): DependentResponse => {
  return  DependentMapper.dependentBDToEntity(data);
}

export const getCalendarVaccineByDependentAction = async (dependentId: string): Promise<CalendarVaccineByDependentResponse[]> => {
  try {

    //RTomammos todos los familiaares
    const dependent = await getDependentByIdAction(dependentId);
    let nameLastnameDependent = dependent.name + ' ' +dependent.lastname;
    const noRepiteByVaccIdDependentId: Map<string, boolean> = new Map();

    let results: CalendarVaccineByDependentResponse[] = [];

      console.log(dependent._id.$oid);
      let calendars: CalendarVaccineDependent[] = [];
        const { data } = await vaccinesApi.get<VaccineDependentPage>(`/vaccine/vaccdependent/${dependent._id.$oid}`);
        const { vaccines } = data;
        for (const vac of vaccines) {
          if (!noRepiteByVaccIdDependentId.has(`${vac._id.$oid}-${dependent._id.$oid}`)) {
              noRepiteByVaccIdDependentId.set(`${vac._id.$oid}-${dependent._id.$oid}`, true);
              const today = new Date();
              today.setDate(today.getDate());
              const day = today.getDate();
              const month = today.getMonth() + 1;
              const year = today.getFullYear();
              const formattedDate = today.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              const { dosis_ids } = vac;
              let deCuantasDosis = 0;
              let dosisApplied = 0;
              console.log('----------------pasando------------------');
              let labels : string[] = [];
              if (dosis_ids && dosis_ids.length > 0){
                 console.log('----------------Existe?------------------');
                 console.log({dosis: dosis_ids})
                 console.log('--------------cool--------------------');
                // let dosisDependents: Dosi[] = dosis ?? [];
                 deCuantasDosis = dosis_ids.length;
                 dosisApplied = dosis_ids.filter((d) => d.isApplied).length;
                     dosis_ids.forEach(( d )=>{
                         let nextDate = new Date(moment(dependent.birth).add(d.expires_in_days, 'day').format('YYYY-MM-DD'))
                         let titleDosisDetalle = d.name + d.age_frequency? ' | ' + d.age_frequency : '';
                         labels.push( titleDosisDetalle + '\n' + nextDate);
                     });

                     let calendarVaccineDependent: CalendarVaccineDependent ={
                      datevaccine:formattedDate,
                      nameLastnameDependent,
                      dosisMissingandAplied:` ${vac.name} ${dosisApplied}/${deCuantasDosis}`,
          
                      titleVaccine : vac.name,
                      dosisApplied : dosisApplied,
                      ofCountDosis : deCuantasDosis,
                      titleDosis: labels
                    }
                    calendars.push(calendarVaccineDependent);
                    let calendarVaccineByDependentResponse: CalendarVaccineByDependentResponse = {
                      title: nameLastnameDependent,
                      data: calendars
                    }
                    results = [...results, calendarVaccineByDependentResponse];
              }
          
                  
   
              }
              console.log('----------------fin------------------');

    

          
    
    }

    // console.log('-----------------1-----------')
    // console.log(results)
    // console.log('-----------------14----------')
    return results;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.log(error);

    return [];
  }
};


// export const getCalendarVaccineByDependentAction = async (limite: number = 1000, page: number, term: string = "''", user: User): Promise<CalendarVaccineByDependentResponse[]> => {
//   try {
//     const dependents = await getDependentByPageAction(10000, page, term, user!);
//     const savedIds: Map<string, boolean> = new Map();

//     for (let i = 0; i < dependents.length; i++) {
//       const dependent = dependents[i];

//       for (let j = 0; j < 2; j++) {
//         const { data } = await vaccinesApi.get<VaccineDependentPage>(`/vaccine/vaccdependent/${dependent._id.$oid}/${j}`);
//         const { vaccines } = data;

//         for (const vac of vaccines) {
//           if (vac.isAlertApply && !savedIds.has(`${vac._id.$oid}-${dependent._id.$oid}`)) {
//             savedIds.set(`${vac._id.$oid}-${dependent._id.$oid}`, true);

//             const today = new Date();
//             today.setDate(today.getDate() + j);
//             const day = today.getDate();
//             const month = today.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que se suma 1
//             const year = today.getFullYear();
//             const formattedDate = today.toLocaleDateString('es-ES', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric'
//             });

//             let dosisApplied: number = 0;
//             let deCuantasDosis: number = 0;
//             const data = await applyVaccinneAction(vac._id.$oid, dependent._id.$oid);
//             const { vacc_apply_vaccines } = data;

//             if (vacc_apply_vaccines && vacc_apply_vaccines.length > 0) {
//               const { dependent } = vacc_apply_vaccines[0];
//               const { vaccine } = vacc_apply_vaccines[1];
//               const { dosis } = vacc_apply_vaccines[2];
//               let dosisDependents: Dosi[] = dosis ?? [];
//               deCuantasDosis = dosisDependents.length;
//               dosisApplied = dosisDependents.filter((dosis) => dosis.isApplied).length;
//             }

//             console.log(formattedDate);
//             console.log(` ${dependent.name} ${dependent.lastname}`);
//             console.log(` ${vac.name} ${dosisApplied}/${deCuantasDosis}`);
//           }
//         }
//       }
//     }

//     return [];
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'An unknown error occurred';
//     console.log(error);

//     return [];
//   }
// };



  // export const getCalendarVaccineByDependentAction = async (limite:number =1000, page:number, term:string = "''", user:User):Promise<CalendarVaccineByDependentResponse[]> => {
  //   try {
  //     const dependents = await getDependentByPageAction(10000, page, term, user!);
  //     const promises: Promise<DependentBDResponse>[] = [];
  //     const savedIds: Map<string, boolean> = new Map();
  //     for (let i = 0; i < dependents.length; i++) {
  //       const dependent = dependents[i];
  
  //       for (let j = 0; j < 2; j++) {
  //         const { data } =await vaccinesApi.get<VaccineDependentPage>(`/vaccine/vaccdependent/${dependent._id.$oid}/${j}`);   
  //         const { vaccines } = data;
  //         vaccines.forEach(async( vac )=>{
  //           if (vac.isAlertApply && !savedIds.has(`${vac._id.$oid}-${dependent._id.$oid}`)) {
              
  //             savedIds.set(`${vac._id.$oid}-${dependent._id.$oid}`, true);

  //             const today = new Date();
  //             today.setDate(today.getDate() + j);
  //             const day = today.getDate();
  //             const month = today.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que se suma 1
  //             const year = today.getFullYear();
  //             const formattedDate = today.toLocaleDateString('es-ES', {
  //               day: 'numeric',
  //               month: 'long',
  //               year: 'numeric'
  //             });
    
  //             let dosisApplied: number = 0;
  //             let deCuantasDosis: number = 0;
  //             const data = await applyVaccinneAction(vac._id.$oid, dependent._id.$oid);
  //             const { vacc_apply_vaccines } = data;
  //             if (vacc_apply_vaccines && vacc_apply_vaccines.length > 0) {
  //               const { dependent } = vacc_apply_vaccines[0];
  //               const { vaccine } = vacc_apply_vaccines[1];
  //               const { dosis   }= vacc_apply_vaccines[2];
  //               let dosisDependents : Dosi[] = dosis ?? [];
  //               deCuantasDosis = dosisDependents.length;
  //               dosisApplied = dosisDependents.filter( (dosis) =>  dosis.isApplied).length;
  //             }
  //             console.log(formattedDate);
  //             console.log(` ${dependent.name} ${ dependent.lastname }`);
  //             console.log(` ${vac.name} ${ dosisApplied }/${ deCuantasDosis }`);
  //           }
            
  //         });
  //        // console.log(data)   
  //       }
  //     }
     
  //     return [];
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : 'An unknown error occurred';
  //     console.log(error);
     
  //     return [];
  //   }
  // };
 