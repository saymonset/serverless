export interface VaccineEditCreateEntiy {
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
    isChildren:       boolean;
    name:             string;
    status:           boolean;
}

export interface ID {
    $oid: string;
}

export interface VaccinePostEntity {
    id:               string;
    name:             string;
    description:      string;
    disease_prevents: string;
    application_age:  string;
    isChildren:       boolean;
    status:           boolean;
}

export interface VaccinePutEntity {
    error:      boolean;
    resp:       boolean;
    TypeError:  string;
    statusCode: string;
    ValueError: string;
    message:    string;
}

export interface VaccinePutPostResponseEntity {
    _id:              ID;
    error:      boolean;
    resp:       boolean;
    TypeError:  string;
    statusCode: number;
    ValueError: string;
    message:    string;
}

export interface VaccineByIDEntity {
    _id:              ID;
    name:             string;
    description:      string;
    disease_prevents: string;
    application_age:  string;
    isChildren:       boolean;
    status:           boolean;
    dosis_ids:        any[];
}
 