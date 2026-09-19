import type { InputDefinition, OutputDefinition, PropertyDefinition } from './property';

export interface NodeDefinition {
    typeId: string;
    displayName: string;
    category: string;
    visible: boolean;
    packageId?: string;
    inputs: InputDefinition[];
    outputs: OutputDefinition[];
    properties: PropertyDefinition[];

    getInputs?(data?: Record<string, unknown>, connections?: any[]): InputDefinition[];
    getOutputs?(data?: Record<string, unknown>, connections?: any[]): OutputDefinition[];
    evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>>;
}

export abstract class BaseNode implements NodeDefinition {
    abstract readonly typeId: string;
    abstract readonly displayName: string;
    abstract readonly category: string;
    abstract readonly visible: boolean;
    readonly packageId?: string;
    abstract readonly inputs: InputDefinition[];
    abstract readonly outputs: OutputDefinition[];
    abstract readonly properties: PropertyDefinition[];

    getInputs(data?: Record<string, unknown>, connections?: any[]): InputDefinition[] {
        return this.inputs;
    }

    getOutputs(data?: Record<string, unknown>, connections?: any[]): OutputDefinition[] {
        return this.outputs;
    }

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        return {};
    }
}

export abstract class RenderNode extends BaseNode {
    readonly category: string = 'Render';
    readonly visible: boolean = false;
}
