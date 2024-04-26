export interface GenderResponse {
    desde:   number;
    genders: GenderElement[];
    limite:  number;
    total:   number;
}

export interface GenderElement {
    _id:    ID;
    name:   string;
    status: boolean;
}

export interface ID {
    $oid: string;
}
 