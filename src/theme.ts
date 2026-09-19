export interface ThemeVariableDefinition {
    key: string;
    label: string;
    type: 'color' | 'number' | 'text' | 'select' | 'font';
    section: string;
    defaultValue: string;
    packageId: string;
    options?: { label: string; value: string }[];
}

export interface ThemeSection {
    name: string;
    packageId: string;
    variables: ThemeVariableDefinition[];
}
