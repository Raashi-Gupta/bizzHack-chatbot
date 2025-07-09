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
  messages: { id: number,text: string, sender: 'user' | 'bot' }[] = [];
  currentMessage: string = '';
  startedChat = false;
  openDropdownMsgId: number | null = null; // Use message ID, not index
  selectedLanguages: { [msgId: number]: string } = {};

  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private route:ActivatedRoute){}

  ngOnInit() {
    this.route.queryParams.subscribe(params  => {
      const question = params['question'];
      this.currentMessage = question;
      this.sendMessage();
    });
  }

  private nextId = 1;

  sendMessage() {
    const message = this.currentMessage.trim();
    if (message) {
      if (!this.startedChat) this.startedChat = true;
      this.messages.push({ text: message, sender: 'user', id: this.nextId++ });
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
    this.messages.push({ text: reply, sender: 'bot', id: this.nextId++ });
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

  onLanguageChange(event: Event, msg: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.translateMessage(msg, selectedLang);
  }

  toggleDropdown(msgId: number) {
    if (this.openDropdownMsgId === msgId) {
      this.openDropdownMsgId = null;
    } else {
      this.openDropdownMsgId = msgId;
    }
  }

  selectLanguage(msgId: number, language: string) {
    this.selectedLanguages[msgId] = language;
    this.openDropdownMsgId = null;

    const message = this.messages.find(m => m.id === msgId && m.sender === 'bot');
    if (message) {
      this.translateMessage(message, language);
    }
  }

  translateMessage(msg: any, lang: string): void {
    if (lang === 'French') {
      msg.text = 'Bonjour!';       
    } else if (lang === 'Hindi') {
      msg.text = 'नमस्ते!';      
    } else {
      msg.text = 'Hello!';        
    }
  }

}