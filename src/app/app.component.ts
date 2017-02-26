import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
//import { MockBackendService } from './shared/mock-backend.service';
import { Observable } from 'rxjs/Observable';
import { EtlDataService } from './shared/etl-data.service';
import { IEtlProcesses } from './shared/data.interface';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import {ChatService, Message} from './shared/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'Server Load - ';
  private serverId: string ;
  private gridData: any[];
  private series: any[];
  private categories: string[];
  private editDataItem: IEtlProcesses;
  private isNew: boolean;

  constructor(
    //private mockBackendService: MockBackendService,
    private etlDataService: EtlDataService,
  ) {
    this.serverId = '';
    //this.mockBackendService.start(); 
    this.etlDataService.getEtlProcesses().subscribe((res) => {
      this.gridData = res;
    });
    this.etlDataService.getServerLoad().subscribe((res) => {
      this.series = res.Stats;
      this.categories = res.TimeSeries;
      this.serverId = res.ServerId;
    });
  }

  public editHandler({dataItem}) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(processData: IEtlProcesses) {
    this.etlDataService.save(processData, this.isNew);

    this.editDataItem = undefined;
  }

}

