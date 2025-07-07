import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements AfterViewChecked, OnInit {
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  currentMessage: string = '';
  startedChat = false;

  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private route:ActivatedRoute){}

  ngOnInit() {
    this.route.queryParams.subscribe(params  => {
      const question = params['question'];
      this.currentMessage = question;
      this.sendMessage();
    });
  }

  sendMessage() {
    const message = this.currentMessage.trim();
    if (message) {
      if (!this.startedChat) this.startedChat = true;
      this.messages.push({ text: message, sender: 'user' });
      this.currentMessage = '';
      setTimeout(() => this.replyToMessage(message), 500);
    }
  }

  replyToMessage(msg: string) {
    const lower = msg.toLowerCase();
    let reply = "I'm not sure how to answer that yet.";
    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hey there! How can I assist you today?";
    }
    this.messages.push({ text: reply, sender: 'bot' });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.chatBox && this.startedChat) {
      try {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      } catch (err) { }
    }
  }
}