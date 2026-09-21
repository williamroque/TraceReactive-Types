export interface TraceReactiveAPI {
    registerNodes: (nodes: any[]) => void;
    registerPreviewers: (previewers: any[]) => void;
    registerExporters: (exporters: any[]) => void;
    registerThemeSections: (sections: any[]) => void;
    emitEvent: (nodeId: string) => void;
    
    onEvaluateNode: (callback: (args: { typeId: string, inputs: Record<string, any>, properties: Record<string, any> }) => Promise<any>) => void;

    fs: {
        readFile: (path: string, encoding?: string) => Promise<any>;
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
}
