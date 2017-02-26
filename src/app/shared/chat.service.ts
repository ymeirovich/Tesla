import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketService } from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const CHAT_URL = 'ws://localhost:3005';
const DATA_URL = 'ws://localhost:3006';

export interface Message {
	author: string,
	message: string,
	newDate?: string
}

@Injectable()
export class ChatService {
	public messages: Subject<Message> = new Subject<Message>();
	public serverData: Subject<number> = new Subject<number>();

	constructor(private wsService: WebSocketService) {

		// 1. subscribe to chatbox
		// tslint:disable-next-line:indent
		this.messages = <Subject<Message>>this.wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					message: data.message,
					newDate: data.newDate
				}
			});
//  var series = [{
//             name: '% CPU Usage',
//             data: []
//         }, {
//             name: '% RAM Usage',
//             data: []
//         }];
//         var date = new Date();
//         var timeseries = [];
//  if (series[0].data.length <= 20) {
//             series[0].data.push(randomNumber());
//             series[1].data.push(randomNumber() / 2);
//             timeseries.push(date.getHours() + ":" + date.getMinutes());
//         } else {
//             series[0].data.slice(series[0].data.length - 1);
//             series[1].data.slice(series[0].data.length - 1);
//             timeseries.slice(timeseries.length - 1);
//         }
		// 2. subscribe to random data
		this.serverData = <Subject<number>>this.wsService
			.connectData(DATA_URL)
			.map((response: any): number => {

				return JSON.parse(response.data);
			})
	}
} // end class ChatService