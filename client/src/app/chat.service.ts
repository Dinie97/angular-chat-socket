import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public id$: BehaviorSubject<string> = new BehaviorSubject('');

  socket = io('http://localhost:3000');

  public myId: any;
  constructor() {}

  ngOnInit() {}

  public sendMessage(message: any) {
    var content = {
      id: this.socket.id,
      message: message,
    };
    this.socket.emit('message', content);
  }

  public getNewMessage = () => {
    console.log(this.socket);
    this.socket.on('message', (message: any) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  public getId = () => {
    this.id$.next(this.socket.id);
    return this.id$.asObservable();
  };
}
