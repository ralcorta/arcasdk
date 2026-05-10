/* tslint:disable:max-line-length no-empty-interface */
export interface IloginCmsInput {
    /** xsd:string(undefined) */
    in0: string;
}

export interface IloginCmsOutput {
    /** xsd:string(undefined) */
    loginCmsReturn: string;
}

export interface ILoginCmsSoap {
    loginCms: (input: IloginCmsInput, cb: (err: any | null, result: IloginCmsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}
