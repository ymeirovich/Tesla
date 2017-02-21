export interface IEtlProcesses {
    Ctx: string;
    Module: string;
    Env: string;
    Stage: string;
    Start: Date;
    Tarich_Sachar: Date;
    Last_Update: Date;
    Reruns: number;
    Previous_Rerun_Cause: string;
}

export interface IEtlProps {
    Stage: string;
    Rerun_Description: string;
    Message: string;
}
export interface IServerStats {
    name: string;
    data: string[];
}
export interface IServerLoad {
    Stats: IServerStats[];
    TimeSeries: any[];
    ServerId: string;
    ServerErrorMessage: string;
    IsServerAlive: boolean;
}


