export interface Register {
    name?:      string;
    lastname?:  string;
    password?:  string;
    ci?:        string;
    email?:     string;
    state?:     string;
    city?:      string;
    birth?:     Date | null;
    gender_id?: string;
    status?:    string;
    token?:    string;
    resp?:     boolean;
}
