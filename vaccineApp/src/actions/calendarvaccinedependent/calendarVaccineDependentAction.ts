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
import { getDependentByPageAction } from "../dependents/get-dependents-by-pageAction.ts";

const returnMapper = ( data: DependentBDResponse ): DependentResponse => {
  return  DependentMapper.dependentBDToEntity(data);
}

export const getCalendarVaccineByDependentAction = async (limite: number = 1000, page: number, term: string = "''", user: User): Promise<CalendarVaccineByDependentResponse[]> => {
  try {

    //RTomammos todos los familiaares
    const dependents = await getDependentByPageAction(10000, page, term, user!);
    const noRepiteByVaccIdDependentId: Map<string, boolean> = new Map();

    let results: CalendarVaccineByDependentResponse[] = [];

    for (let i = 0; i < dependents.length; i++) {
      const dependent = dependents[i];
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

            const { vacc_apply_vaccines } = await applyVaccinneAction(vac._id.$oid, dependent._id.$oid);

            let dosisApplied: number = 0;
            let deCuantasDosis: number = 0;

            if (vacc_apply_vaccines && vacc_apply_vaccines.length > 0) {
              const { dosis } = vacc_apply_vaccines[2];
              let dosisDependents: Dosi[] = dosis ?? [];
              deCuantasDosis = dosisDependents.length;
              dosisApplied = dosisDependents.filter((dosis) => dosis.isApplied).length;

                  //  const labels = ["Primaria | Al nacer\n20/12/2024", "Primaria | Al nacer\n20/12/2024", "Primaria | Al nacer\n20/12/2024"];

              let labels : string[] = [];
              dosisDependents.forEach(( dosis )=>{
                    //d
                //    date={moment(values.birth ?? new Date()).add(0, 'day').toDate()}

                console.log('Expira en dias = '+dosis.expires_in_days);
                console.log('dosis.vaccination_date = '+dosis.vaccination_date);
                console.log('dependent.birth = '+dependent.birth);

                let nextDate = new Date(moment(dependent.birth).add(dosis.expires_in_days, 'day').format('YYYY-MM-DD'))
                let titleDosisDetalle = dosis.name + dosis.age_frequency? ' | ' + dosis.age_frequency : '';
                labels.push( titleDosisDetalle + '\n' + nextDate);
            });

              let calendarVaccineDependent: CalendarVaccineDependent ={

                datevaccine:formattedDate,
                nameLastnameDependent: ` ${dependent.name} ${dependent.lastname}`,
                dosisMissingandAplied:` ${vac.name} ${dosisApplied}/${deCuantasDosis}`,

                titleVaccine : vac.name,
                dosisApplied : dosisApplied,
                ofCountDosis : deCuantasDosis,
                titleDosis: labels

              }
              calendars.push(calendarVaccineDependent);

             
            }

           
          }
        }

      let calendarVaccineByDependentResponse: CalendarVaccineByDependentResponse = {
        title: 'Primeros 30 dias',
        data: calendars
      }

      results = [...results, calendarVaccineByDependentResponse];
    }

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
 