export interface PackageDependency {
    packageId: string;
    version: string;
}

export interface FigureFile {
    nodes: any[];
    edges: any[];
    themes: any[];
    cache?: Record<string, Record<string, any>>;
    dependencies?: PackageDependency[];
}

export interface DependencyValidationResult {
    valid: boolean;
    missing: PackageDependency[];
    incompatible: {
        dependency: PackageDependency;
        installedVersion: string;
    }[];
}
