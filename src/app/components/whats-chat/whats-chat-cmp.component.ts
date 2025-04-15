import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  time: string;
  sender: string;
  isFile?: boolean;
  fileName?: string;
  hasThumb?: boolean;
  thumbUrl?: string;
}

interface ChatUser {
  id: number;
  name: string;
  status: string;
  lastSeen?: string;
  avatar?: string;
  initial?: string;
  isOnline?: boolean;
}

@Component({
  selector: 'app-whats-chat-cmp',
  templateUrl: './whats-chat-cmp.component.html',
  styleUrls: ['./whats-chat-cmp.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WhatsChatCmpComponent {
  selectedUser: ChatUser = {
    id: 3,
    name: 'Jason Binoffe',
    status: 'Online',
    isOnline: true,
    initial: 'J'
  };

  currentUser = {
    name: 'Jasper Melison',
    id: '45332'
  };

  messages: Message[] = [
    {
      id: 1,
      text: 'Hi Jasper. I will share the estimate today.',
      time: '2:34 PM',
      sender: 'jason'
    },
    {
      id: 2,
      text: 'We need to display this while unwrapping the box',
      time: '2:34 PM',
      sender: 'jason',
      hasThumb: true,
      thumbUrl: 'assets/images/couple-photo.jpg'
    },
    {
      id: 3,
      text: 'Hi, Liki. is there any update on the filing?\nI want to get this moving fast.',
      time: '6:33 pm',
      sender: 'user'
    },
    {
      id: 4,
      text: 'Sure. Sending you ASAP.',
      time: '3:43 pm',
      sender: 'jason'
    },
    {
      id: 5,
      isFile: true,
      fileName: 'statement2022.pdf',
      time: '3:43 pm',
      sender: 'jason',
      text: ''
    }
  ];

  users: ChatUser[] = [
    { id: 1, name: 'Messina Jason', status: '😄', lastSeen: '5 MINS AGO', initial: 'M' },
    { id: 2, name: 'Arun Venkatachalam', status: 'Any Updates?', lastSeen: '2:34 PM', initial: 'A' },
    { id: 3, name: 'Jason Binoffe', status: 'Online', lastSeen: '2:34 PM', initial: 'J', isOnline: true },
    { id: 4, name: 'Yello Community', status: 'Cool', lastSeen: '2:34 PM', initial: 'Y' },
    { id: 5, name: 'Music CGG', status: '💜', lastSeen: '2:34 PM', initial: 'M' },
    { id: 6, name: 'Likuan Henger', status: 'I didn\'t get it', lastSeen: '8:34 AM', initial: 'LH' }
  ];

  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: this.messages.length + 1,
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user'
      });
      this.newMessage = '';
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.messages.push({
        id: this.messages.length + 1,
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user',
        isFile: true,
        fileName: file.name
      });
    }
  }
}