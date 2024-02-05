// Generated by https://quicktype.io

export interface ApplyVaccineResponse {
    apply_vaccines: ApplyVaccine[];
    desde:          number;
    limite:         number;
    resp:           boolean;
    statusCode:     number;
    total:          number;
}

export interface ApplyVaccine {
    _id:              ID;
    dependent:        Dependent;
    dosis:            Dosis;
    image:            null;
    lote:             string;
    status:           boolean;
    vaccination_date: string;
}

export interface ID {
    $oid: string;
}

export interface Dependent {
    _id:       ID;
    birth:     string;
    email:     string;
    gender_id: string;
    isUser:    boolean;
    lastname:  string;
    name:      string;
    phone:     string;
    status:    boolean;
    token:     string;
    user_id:   ID;
}

export interface Dosis {
    _id:           ID;
    age_frequency: string;
    name:          string;
    status:        boolean;
    vaccine:       Vaccine;
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