/* eslint-disable @typescript-eslint/no-explicit-any */
export interface counterType{
    count?: number |null |any,
    doubleCount?: number |null |any,
}
export interface langListType {
    id?: string | any,
    name?: string | any,
}
export interface dataListType{
    code?: string |null |any,
    symbol?: string |null |any,
    rate?: string | null | any,
    rate_float?: number |null |any,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface counterType{
    count?: number |null |any,
    doubleCount?: number |null |any,
}

export interface dataListType{
    code?: string |null |any,
    symbol?: string |null |any,
    rate?: string | null | any,
    rate_float?: number |null |any,
}
export interface homeMenuType{
    name?: string |null |any,
    id?: string |null |any,
   link: string | null | any,
}
export interface langListType{
    id?: string |null |any,
    name?: string |null |any,
    href?: string | null | any,
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface ruleFormType {
    username?: string,
    email: string,
    password: string,
    checkPass?: string,
}


export interface ruleValidatorType{
    email: ({
        required: boolean;
        message?: string |any ;
        trigger: string;
        type?: undefined;
    } | {
        type: string;
        message: string;
        trigger: string[];
        required?: undefined;
    })[],
    password: ({
        required: boolean;
        message: string |any ;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[],
    checkPass?: {
        validator: (_rule: any, value: any, callback: any) => void;
        trigger: string;
    }[]
}
