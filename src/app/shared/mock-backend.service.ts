import { Injectable } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IEtlProcesses, IEtlProps, IServerLoad } from './data.interface';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';

export interface IServerStats {
    PercentCpuUsage: number;
    PercentRamUsage: number;
    CommitDateTime: Date;
}
export interface IServerLoad {
    Stats: IServerStats[];
    ServerId: number;
    ServerErrorMessage: string;
    IsServerAlive: boolean;
}

@Injectable()
export class MockBackendService {
    private mockServerStats: Array<IServerStats>;
    private mockServerLoad: IServerLoad;
    private mockEtlProcesses: Array<IEtlProcesses> = [{
        Ctx: 'Ctx-test1',
        Module: 'Module-test1',
        Env: 'Env-test1',
        Stage: 'Stage-test1',
        Start: new Date('03 / 03 / 2017'),
        Tarich_Sachar: new Date('01 / 01 / 2017'),
        Last_Update: new Date('02 / 02 / 2017'),
        Reruns: 123,
        Previous_Rerun_Cause: 'rerun cause test 1',
    }, {
        Ctx: 'Ctx-test2',
        Module: 'Module-test2',
        Env: 'Env-test2',
        Stage: 'Stage-test2',
        Start: new Date('04 / 04 / 2017'),
        Tarich_Sachar: new Date('05 / 05 / 2017'),
        Last_Update: new Date('06 / 06 / 2017'),
        Reruns: 123,
        Previous_Rerun_Cause: 'rerun cause test 2',
    }];
    private series: any[] = [{
        name: '% CPU Usage',
        data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
    }, {
        name: '% RAM Usage',
        data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
    }];
    private timeseries: string[] = ['0000', '0001', '0003'];

    constructor(
        private backend: MockBackend
    ) {
        this.mockServerLoad = {
            'Stats': this.series,
            'TimeSeries': this.timeseries,
            'ServerId': '456',
            'ServerErrorMessage': 'abcdef',
            'IsServerAlive': true,
        };
    }
    
    start(): void {
        console.log('starting mockbackend');
        this.backend.connections.subscribe((c: MockConnection) => {
            const getEtlProcessesURL = 'localhost:4200/getEtlProcesses';
            const getServerLoadURL = 'localhost:4200/getServerLoad';
            const postEtlProcessUrl = '/api/postProcess';

            if (c.request.url === getEtlProcessesURL && c.request.method === 0) {
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(this.mockEtlProcesses)
                })));
            }
            if (c.request.url === getServerLoadURL && c.request.method === 0) {
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(this.mockServerLoad)
                })));
            }
            if (c.request.url === postEtlProcessUrl && c.request.method === 1) {
                c.mockRespond(new Response(new ResponseOptions({ status: 200 })));
            }
        });
    };
}
