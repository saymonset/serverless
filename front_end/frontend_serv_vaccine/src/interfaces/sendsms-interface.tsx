
export interface SendSmsRequest {
    phone:      string;
}

export interface SendSmsPayload {
    phone:      string;
    password?: string;
    isLoading?: boolean  | null;
    token?: string | null;
    message?:    string;
    response?: Object;
    isSendCode?: boolean  | null;
    resp?:boolean;
    ci?: string;

    
}

export interface SendSmsResponse {
    statusCode?: number;
    resp?:      boolean;
    error?:     string;
    message?:    string;
}

export interface CheckcCodeRequest {
    phone?:      string | null | undefined;
    code?:      string | null | undefined;
}

export interface CheckcCodeResponse {
    statusCode?: number;
    resp?:       boolean;
    message?:    string;
    token?:      string;
}
 
