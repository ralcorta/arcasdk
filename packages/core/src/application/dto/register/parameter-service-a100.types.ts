/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IdummyInput {}

export interface IdummyOutput {
    return: ParameterServiceA100PortTypes.Ireturn;
}

export interface IgetParameterCollectionByNameInput {
    collectionName: string;
}

export interface IgetParameterCollectionByNameOutput {
    parameterCollectionReturn: ParameterServiceA100PortTypes.IparameterCollectionReturn;
}


export namespace ParameterServiceA100PortTypes {
    export interface Ireturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
    export interface Imetadata {
        fechaHora: string;
        servidor: string;
    }
    export interface IattributeList {
        name: string;
        value: string;
    }
    export interface IparameterList {
        attributeList: ParameterServiceA100PortTypes.IattributeList[];
        description: string;
        id: string;
    }
    export interface IparameterCollection {
        name: string;
        parameterList: ParameterServiceA100PortTypes.IparameterList[];
    }
    export interface IparameterCollectionReturn {
        metadata: ParameterServiceA100PortTypes.Imetadata;
        parameterCollection: ParameterServiceA100PortTypes.IparameterCollection;
    }
}
