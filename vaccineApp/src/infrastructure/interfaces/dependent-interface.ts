export interface DependentResponse {
    dependents: Dependent[];
    desde:      number;
    limite:     number;
    total:      number;
}

export interface Dependent {
    _id:        ID;
    age:        number;
    birth:      string;
    days_birth: number;
    email:      string;
    gender_id:  string;
    isChildren: boolean;
    isUser:     boolean;
    lastname:   string;
    name:       string;
    phone:      string;
    status:     boolean;
    token:      string;
    user_id:    string;
}

export interface ID {
    $oid: string;
}


