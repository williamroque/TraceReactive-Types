import type { ThemeVariableDefinition } from './theme';
import type { IOTypeDefinition } from './io';

export interface PackageManifest {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    main: string;
    permissions: PackagePermission[];
    ioTypes?: IOTypeRegistration[];
    themeVariables?: ThemeVariableDefinition[];
    ui?: string;
}

export type PackagePermission =
    | 'fs:read'
    | 'fs:write'
    | 'fs:manage'
    | 'fs:delete'
    | 'net:fetch'
    | 'clipboard:read'
    | 'clipboard:write';

export interface IOTypeRegistration {
    id: string;
    label: string;
    color?: string;
    compatibleWith?: string[];
}

export interface InstalledPackageInfo {
    manifest: PackageManifest;
    path: string;
    loaded: boolean;
    nodes?: any[];
    previewers?: any[];
    interactiveFrontends?: any[];
    exporters?: any[];
    themeSections?: any[];
}
