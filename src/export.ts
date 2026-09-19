export interface ExportOptions {
    format: string;
    dpi: number;
    backgroundColor: string;
    width?: number;
    height?: number;
    themeVariables?: Record<string, string>;
}

export interface ExporterDefinition {
    supportedFormats: string[];
    export(data: any, options: ExportOptions): Promise<string>;
    packageId?: string;
}
