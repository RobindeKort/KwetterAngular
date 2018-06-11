import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Kweet} from '../_domain/kweet';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TimelineService {
  private wsUrl = 'ws://localhost:8080/Kwetter/kweetEndpoint/';
  public messages: Subject<Kweet>;

  constructor(private websocketService: WebsocketService) {
  }

  subscribe(username: String) {
    this.messages = <Subject<Kweet>>this.websocketService
      .connect(this.wsUrl + username)
      .map((response: MessageEvent): Kweet => {
        console.log(response);
        const data = JSON.parse(response.data);
        return data as Kweet;
      });
  }
}
