import type { InputDefinition, OutputDefinition, PropertyDefinition, DynamicInputDefinition, DynamicOutputDefinition } from './property';

export interface NodeDefinition {
    typeId: string;
    displayName: string;
    category: string;
    visible: boolean;
    packageId?: string;
    inputs: InputDefinition[];
    outputs: OutputDefinition[];
    properties: PropertyDefinition[];
    dynamicInputs?: DynamicInputDefinition;
    dynamicOutputs?: DynamicOutputDefinition;

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
    readonly dynamicInputs?: DynamicInputDefinition;
    readonly dynamicOutputs?: DynamicOutputDefinition;

    getInputs(data?: Record<string, unknown>, connections?: any[]): InputDefinition[] {
        if (this.dynamicInputs && this.dynamicInputs.baseName) {
            const inbound = (connections || []).filter((c: any) => c.targetHandle && c.targetHandle.startsWith(this.dynamicInputs!.baseName + ' '));
            let maxIndex = 0;
            inbound.forEach((c: any) => {
                const match = c.targetHandle.match(new RegExp(this.dynamicInputs!.baseName.trim() + ' (\\d+)'));
                if (match) {
                    const idx = parseInt(match[1], 10);
                    if (idx > maxIndex) maxIndex = idx;
                }
            });
            const res: InputDefinition[] = [];
            for (let i = 1; i <= maxIndex + 1; i++) {
                res.push({ name: `${this.dynamicInputs.baseName} ${i}`, acceptsType: this.dynamicInputs.acceptsType || 'any' });
            }
            return res;
        }
        return this.inputs;
    }

    getOutputs(data?: Record<string, unknown>, connections?: any[]): OutputDefinition[] {
        if (this.dynamicOutputs && this.dynamicOutputs.baseName) {
            const outbound = (connections || []).filter((c: any) => c.sourceHandle && c.sourceHandle.startsWith(this.dynamicOutputs!.baseName + ' '));
            let maxIndex = 0;
            outbound.forEach((c: any) => {
                const match = c.sourceHandle.match(new RegExp(this.dynamicOutputs!.baseName.trim() + ' (\\d+)'));
                if (match) {
                    const idx = parseInt(match[1], 10);
                    if (idx > maxIndex) maxIndex = idx;
                }
            });
            const res: OutputDefinition[] = [];
            for (let i = 1; i <= maxIndex + 1; i++) {
                res.push({ name: `${this.dynamicOutputs.baseName} ${i}`, outputType: this.dynamicOutputs.outputType || 'any' });
            }
            return res;
        }
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
