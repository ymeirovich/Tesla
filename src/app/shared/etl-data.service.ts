import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEtlProcesses, IServerLoad } from './data.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChatService, Message } from './chat.service';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';

@Injectable()
export class EtlDataService extends BehaviorSubject<any> {
  messages: Message[] = [];
  private message: any;
  constructor(private http: Http,
    private chatService: ChatService) {
    super([]);
  }
  sendMsg() {
    // console.log('new message from client: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '';
  }
  getEtlProcesses(): Observable<any> {
    return this.chatService.messages;
    // return this.http.get('localhost:4200/getEtlProcesses')
    //   .map((res) => {
    //     return res.json();
    //   });
    // let obs = new Observable();
    //  this.chatService.messages.subscribe(msg => {
    //   // this.messages.push(msg);
    //   return obs.map(() => msg);
    // });
  }

  getServerLoad(): Observable<any> {
    return this.chatService.serverData;
    // return this.http.get('localhost:4200/getServerLoad')
    //   .map((res) => {
    //     return res.json();
    //   });
  }

  public save(data: any, isNew?: boolean) {
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    this.fetch(action, data)
      .subscribe(data => {
        this.getEtlProcesses();
        this.getServerLoad();
      }, err => {
        console.log(err);
      }, () => console.log('sent new process request'));
  }

  private fetch(action: string = "", data?: any): Observable<void> {

    let params = new URLSearchParams();
    params.append('data', data);

    return this.http
      .post('/api/postProcess', params)
      .map(res => {
        console.log(res.status);
      }, error => {
        console.log(error.status);
      });
  }

}
