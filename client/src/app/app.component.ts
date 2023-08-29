import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newMessage: any = '';
  messageList: any[] = [];
  myId: any = '';
  chatId: any = '';
  name: any = '';
  firstId: any = '';
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: any) => {
      if (message != '') {
        let msg = message.message;
        if (this.messageList.length == 0) {
          this.firstId = message.id;
          this.chatId = '1';
          this.name = 'User 1';
        }

        if (this.firstId === message.id) {
          let content = {
            id: message.id,
            name: 'User 1',
            url: './assets/Profile-1.jpg',
            message: msg.message,
          };
          this.messageList.push(content);
        } else {
          let content = {
            id: message.id,
            name: 'User 2',
            url: './assets/Profile-2.jpg',
            message: msg.message,
          };
          this.messageList.push(content);
        }
      }
    });

    setTimeout(() => {
      this.chatService.getId().subscribe((data: any) => {
        this.myId = data;
      });
    }, 500);
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
