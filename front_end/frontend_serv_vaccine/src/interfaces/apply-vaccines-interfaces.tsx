// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ApplyVaccineResponse {
    apply_vaccines: ApplyVaccine[];
    desde:          number;
    limite:         number;
    total:          number;
}

export interface ApplyVaccine {
    _id:              ID;
    dependent_id:     string;
    dosis_id:         string;
    image:            string;
    lote:             string;
    status:           boolean;
    vaccination_date: string;
}

export interface ID {
    $oid: string;
}
 
 