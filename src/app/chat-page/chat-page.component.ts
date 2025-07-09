import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, PageHeaderComponent, ProgressSpinnerModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements AfterViewChecked, OnInit {
  messages: { id: number, text: string, sender: 'user' | 'bot' | 'error' }[] = [];
  currentMessage: string = '';
  startedChat = false;
  openDropdownMsgId: number | null = null; // Use message ID, not index
  selectedLanguages: { [msgId: number]: string } = {};

  @ViewChild('chatBox') chatBox!: ElementRef;
  showLoader: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const question = params['question'];
      if (question) {
        this.currentMessage = question;
        this.sendMessage();
      }
    });
  }

  private nextId = 1;
  selectedOption = '';
  sendMessage() {
    this.startedChat = true;
    this.showLoader = true;
    this.messages.push({ id: this.nextId, text: this.currentMessage, sender: 'user' });
    this.currentMessage = '';
    this.http.post(`http://127.0.0.1:5000/query`, { query: this.currentMessage }).subscribe({
      next: (response: any) => {
        console.log(response)
        var ans = this.extractAfterThink(response.answer)
        this.replyToMessage(ans);
        this.showLoader = false;
      }, error: (error: any) => {
        console.log(error);
        this.messages.push({ id: this.nextId, text: 'An error occured. Please try again.', sender: 'error' });
        this.showLoader = false;
      }
    });
  }

  replyToMessage(msg: string) {
    let reply = msg;
    this.messages.push({ id: this.nextId, text: reply, sender: 'bot' });
    console.log(this.messages)
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
  extractAfterThink(answer: string) {
    const closingTag = "</think>";
    const index = answer.indexOf(closingTag);
    if (index !== -1) {
      return answer.substring(index + closingTag.length).trim();
    } else {
      return "No </think> tag found.";
    }
  }
}