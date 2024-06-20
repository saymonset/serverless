import { Dosi } from "./apply-vaccine-interface";
 

export interface VaccineDependentPage {
    desde:    number;
    limite:   number;
    total:    number;
    vaccines: Vaccine[];
}

export interface Vaccine {
    _id:              ID;
    application_age:  string;
    description:      string;
    disease_prevents: string;
    isAlertApply?:     boolean;
    isChildren:       boolean;
    name:             string;
    isChecked?:          boolean;
    status:           boolean;
    dosis_ids? : Dosi[];
}



 

export interface ID {
    $oid: string;
}
