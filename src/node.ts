import type { InputDefinition, OutputDefinition, PropertyDefinition, DynamicInputDefinition, DynamicOutputDefinition } from './property';

export type NodeAccentColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';
export type NodeAccentWeight = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
export type NodeAccent = `${NodeAccentColor}-${NodeAccentWeight}`;

export interface NodeCategory {
    name: string;
    accent: NodeAccent;
    packageId?: string;
}
export interface NodeDefinition {
    typeId: string;
    displayName: string;
    category: NodeCategory;
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
    abstract readonly category: NodeCategory;
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
    readonly category: NodeCategory = { name: 'Render', accent: 'purple-400' };
    readonly visible: boolean = false;
}

export abstract class ExecuteNode extends BaseNode {
    readonly category: NodeCategory = { name: 'Execute', accent: 'red-500' };
    
    getInputs(data?: Record<string, unknown>, connections?: any[]): InputDefinition[] {
        const baseInputs = super.getInputs(data, connections);
        return [...baseInputs, { name: 'Event', acceptsType: 'core:event' }];
    }
}

export abstract class EventNode extends BaseNode {
    readonly category: NodeCategory = { name: 'Event', accent: 'teal-400' };
    
    getOutputs(data?: Record<string, unknown>, connections?: any[]): OutputDefinition[] {
        const baseOutputs = super.getOutputs(data, connections);
        return [...baseOutputs, { name: 'Event', outputType: 'core:event' }];
    }
    
    abstract register(nodeId: string, emit: (nodeId: string) => void): void;
    abstract unregister(nodeId: string): void;
}
