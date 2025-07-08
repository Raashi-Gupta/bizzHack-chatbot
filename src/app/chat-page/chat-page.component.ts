import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements AfterViewChecked, OnInit {
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  currentMessage: string = '?';
  startedChat = false;

  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private route:ActivatedRoute, private http: HttpClient){}

  ngOnInit() {
    this.route.queryParams.subscribe(params  => {
      const question = params['question'];
      if(question)
      {this.currentMessage = question;
      this.sendMessage();}
    });
  }

  sendMessage() {
    this.http.post( `http://127.0.0.1:5000/query`,{query: this.currentMessage}).subscribe({
      next: (response:any) => {
        console.log(response)
        var ans = this.extractAfterThink(response.answer)
        this.messages.push({ text: response.query, sender: 'user' });
        this.replyToMessage(ans);
      }
    });
    // const message = this.currentMessage.trim();
    // if (message) {
    //   if (!this.startedChat) this.startedChat = true;
    //   this.messages.push({ text: message, sender: 'user' });
    //   this.currentMessage = '';
    //   setTimeout(() => this.replyToMessage(message), 500);
    // }
  }

  replyToMessage(msg: string) {
    // const lower = msg.toLowerCase();
    let reply = msg;
    // if (lower.includes("hello") || lower.includes("hi")) {
    //   reply = "Hey there! How can I assist you today?";
    // }
    this.messages.push({ text: reply, sender: 'bot' });
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