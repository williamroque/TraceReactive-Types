export interface PropertyDefinition {
    name: string;
    label?: string;
    type: 'string' | 'number' | 'boolean' | 'text' | 'filepath' | 'expression' | 'select' | 'style' | 'button';
    styleType?: 'color' | 'size' | 'font' | 'select';
    category?: 'general' | 'style';
    defaultValue: unknown;
    step?: number;
    min?: number;
    filters?: { name: string; extensions: string[] }[];
    options?: { label: string; value: string | number }[];
    getOptions?: (node: any, state: any, evaluator: any) => { label: string; value: string | number }[];
    dialogProperties?: string[];
    hidden?: boolean;
    isPrimary?: boolean;
}

export interface InputDefinition {
    name: string;
    label?: string;
    acceptsType: string;
}

export interface OutputDefinition {
    name: string;
    label?: string;
    outputType: string;
}

export interface DynamicInputDefinition {
    baseName: string;
    acceptsType: string;
}

export interface DynamicOutputDefinition {
    baseName: string;
    outputType: string;
}
