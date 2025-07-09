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
  messages: { text: string, sender: 'user' | 'bot' | 'error' }[] = [];
  currentMessage: string = '';
  startedChat = false;

  @ViewChild('chatBox') chatBox!: ElementRef;
  showLoader: boolean = false;

  constructor(private route:ActivatedRoute, private http: HttpClient){}

  ngOnInit() {
    this.route.queryParams.subscribe(params  => {
      const question = params['question'];
      if(question)
      {this.currentMessage = question;
      this.sendMessage();}
    });
  }

  selectedOption = '';
  options = ['Support', 'Sales', 'Feedback', 'Technical', 'Billing'];

  sendMessage() {
    this.startedChat = true;
    this.showLoader = true;
    this.messages.push({ text: this.currentMessage, sender: 'user' });
    this.currentMessage = '';
    this.http.post( `http://127.0.0.1:5000/query`,{query: this.currentMessage}).subscribe({
      next: (response:any) => {
        console.log(response)
        var ans = this.extractAfterThink(response.answer)
        this.replyToMessage(ans);
        this.showLoader = false;
      }, error: (error: any) => {
        console.log(error);
        this.messages.push({ text: 'An error occured. Please try again.', sender :'error' });
        this.showLoader = false;
      }
    });
  }

  replyToMessage(msg: string) {
    let reply = msg;
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