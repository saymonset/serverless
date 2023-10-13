export interface Login {
    ci: string;
    password: string;
}

export interface User {
    name: string;
    lastname: string;
    password: string;
    ci: string;
    email: string;
    state: string;
    city: string;
    birth: string;
    gender: string
}

export interface Dependent {
    name: string;
    lastname: string;
    birth: string;
    gender: string;
    relationship_id: string;
}

export interface SMS {
    phone: string;
}

export interface Code {
    phone: string;
    code: string;
}