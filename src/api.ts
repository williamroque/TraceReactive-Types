export interface GravityDockAPI {
    registerNodes: (nodes: any[]) => void;
    registerPreviewers: (previewers: any[]) => void;
    registerExporters: (exporters: any[]) => void;
    registerThemeSections: (sections: any[]) => void;
    emitEvent: (nodeId: string) => void;
    
    onEvaluateNode: (callback: (args: { typeId: string, inputs: Record<string, any>, properties: Record<string, any> }) => Promise<any>) => void;

    fs: {
        readFile: (path: string, encoding?: string | null) => Promise<any>;
        writeFile: (path: string, data: any) => Promise<void>;
        listDir: (path: string) => Promise<any[]>;
        stat: (path: string) => Promise<any>;
        copy: (src: string, dest: string) => Promise<void>;
        move: (src: string, dest: string) => Promise<void>;
        trash: (path: string) => Promise<void>;
        mkdir: (path: string, options?: any) => Promise<void>;
        zip: (sourcePaths: string | string[], destPath: string, overwrite: boolean) => Promise<void>;
        unzip: (zipPath: string, destPath: string, overwrite: boolean) => Promise<void>;
        watch: (path: string, options?: any) => Promise<string>;
        unwatch: (watchId: string) => Promise<void>;
        onWatchEvent: (callback: (watchId: string, eventName: string, path: string) => void) => () => void;
    };

    net: {
        fetch: (url: string, options?: any) => Promise<any>;
    };

    query: {
        getTemplates: () => Promise<Array<{ id: string; name: string; alias?: string; schema_json: string }>>;
        getTemplate: (idOrAlias: string) => Promise<{ id: string; name: string; alias?: string; schema_json: string } | null>;
        getRecords: (templateIdOrAlias: string, projectId?: string | null) => Promise<any[]>;
        watchTemplate: (templateIdOrAlias: string, callback: (event: { action: 'created' | 'updated' | 'deleted' | 'changed'; templateId: string; templateAlias?: string; recordId?: string }) => void) => () => void;
    };
}
