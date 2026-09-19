import type { InputDefinition, OutputDefinition, PropertyDefinition } from './property';

export interface NodeDefinition {
    typeId: string;
    displayName: string;
    category: string;
    visible: boolean;
    packageId: string;
    inputs: InputDefinition[];
    outputs: OutputDefinition[];
    properties: PropertyDefinition[];

    getInputs?(data?: Record<string, unknown>, connections?: any[]): InputDefinition[];
    getOutputs?(data?: Record<string, unknown>, connections?: any[]): OutputDefinition[];
    evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>>;
}
