// Generated by https://quicktype.io

export interface LoginResponse {
    statusCode: number;
    token:      string;
    usuario:    Usuario;
    more:       More;
}

export interface More {
    _id:       ID;
    name:      string;
    lastname:  string;
    email:     string;
    birth:     string;
    gender_id: string;
    status:    string;
    isUser:    boolean;
    user_id:   ID;
}

export interface ID {
    $oid: string;
}

export interface Usuario {
    _id:       ID;
    phone:     string;
    last_code: number;
    status:    string;
    token:     string;
    ci:        string;
    city:      string;
    password:  string;
    state:     string;
}
