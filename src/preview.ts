export interface PreviewerDefinition {
    typeIds: string[];
    packageId: string;
}

export interface PreviewerProps {
    data: any;
    width?: number;
    height?: number;
    globalDomain?: { x: number[]; y: number[] };
    globalAspectRatio?: number;
    hideAxes?: boolean;
}
