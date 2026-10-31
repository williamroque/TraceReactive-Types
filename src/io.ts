export interface IOTypeDefinition {
    id: string;
    label: string;
    packageId: string;
    color?: string;
    compatibleWith?: string[];
    elementType?: string;
}

export type CoreIOType =
    | 'core:any'
    | 'core:data'
    | 'core:expression'
    | 'core:render'
    | 'core:shape'
    | 'core:controlflow'
    | 'core:number'
    | 'core:string'
    | 'core:path'
    | 'core:array'
    | 'core:number-array'
    | 'core:shape-array'
    | 'core:string-array'
    | 'core:data-array'
    | 'core:path-array'
    | 'core:event'
    | 'core:boolean'
    | 'core:dataframe'
    | 'core:dataframe-array'
    | 'core:quantity'
    | 'core:quantity-array'
    | 'core:currency'
    | 'core:currency-array'
    | 'core:location'
    | 'core:location-array'
    | 'core:typed-record'
    | 'core:typed-record-array'
    | 'core:query-render';
