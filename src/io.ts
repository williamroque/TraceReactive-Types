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
    | 'core:array'
    | 'core:number-array'
    | 'core:shape-array'
    | 'core:string-array'
    | 'core:data-array'
    | 'core:event'
    | 'core:boolean';
