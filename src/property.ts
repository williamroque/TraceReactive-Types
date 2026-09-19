export interface PropertyDefinition {
    name: string;
    label?: string;
    type: 'string' | 'number' | 'boolean' | 'text' | 'filepath' | 'expression' | 'select' | 'style';
    styleType?: 'color' | 'size' | 'font' | 'select';
    category?: 'general' | 'style';
    defaultValue: unknown;
    step?: number;
    min?: number;
    filters?: { name: string; extensions: string[] }[];
    options?: { label: string; value: string | number }[];
    getOptions?: (node: any, state: any, evaluator: any) => { label: string; value: string | number }[];
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
