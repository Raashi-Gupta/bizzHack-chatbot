import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { jsPDF } from 'jspdf';
import { Observable } from 'rxjs';
import translate from 'google-translate-api-browser';

 
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, PageHeaderComponent, ProgressSpinnerModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements AfterViewChecked, OnInit {
  messages: { 
  id: number,
  text: string,
  sender: 'user' | 'bot' | 'error', 
  isStreaming?: boolean, 
  suggestions?: string[],
  originalText?: string 
 }[] = [];
  currentMessage: string = '';
  startedChat = false;
  openDropdownMsgId: number | null = null;
  selectedLanguages: { [msgId: number]: string } = {};
  useStreaming = true; // Toggle between streaming and non-streaming
  languageMappings: any = {
  'English': 'en',
  'French': 'fr',
  'Hindi': 'hi'
};


  @ViewChild('chatBox') chatBox!: ElementRef;
  showLoader: boolean = false;
  loadingSteps: string[] = [
    'Step 1 of 5: Asking our AI',
    'Step 2 of 5: Analyzing your request',
    'Step 3 of 5: Gathering relevant data',
    'Step 4 of 5: Generating a response',
    'Step 5 of 5: Finalizing'
  ];
  currentLoadingStepIndex = 0;
  currentLoadingMessage = '';
  loadingInterval: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
 

  ngOnInit() {
   
 console.log('Protocol:', window.location.protocol);
  if (!window.location.protocol) {
    (window as any).location.protocol = 'https:';
  }
  
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
    if (!this.currentMessage.trim()) return;
    
    this.startedChat = true;
    this.startCustomLoading();
    
    const userMessageId = this.nextId++;
    this.messages.push({ 
      id: userMessageId, 
      text: this.currentMessage, 
      sender: 'user' 
    });

    const userMessage = this.currentMessage;
    this.currentMessage = '';

    this.sendStreamingMessage(userMessage);
    
  }

  private sendStreamingMessage(message: string) {
    const botMessageId = this.nextId++;
    
    this.messages.push({ 
      id: botMessageId, 
      text: '', 
      sender: 'bot',
      isStreaming: true
    });

    this.streamResponse(message, botMessageId);
  }

  private async streamResponse(message: string, botMessageId: number) {
    try {
      const response = await fetch('https://bizzhack-rag.onrender.com/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: message, 
          namespace: "yash" 
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          // Handle SSE format
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            
            if (data === '[DONE]') {
              this.finishStreaming(botMessageId);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.status === 'start') {
                // Starting to receive content
                
                continue;
              } else if (parsed.status === 'complete') {
                // Finished receiving content
                this.finishStreaming(botMessageId);
                return;
              } else if (parsed.token) {
                // Append token to the bot message
                this.stopCustomLoading();
                this.appendToMessage(botMessageId, parsed.token);
              } else if (parsed.error) {
                // Handle error
                this.handleStreamingError(botMessageId, parsed.error);
                return;
              }
            } catch (e) {
              // If not JSON, treat as plain text token
              if (data.trim()) {
                this.appendToMessage(botMessageId, data);
              }
            }
          } else if (line.trim()) {
            // Handle plain text streaming
            this.appendToMessage(botMessageId, line);
          }
        }
      }

      this.finishStreaming(botMessageId);

    } catch (error) {
      console.error('Streaming error:', error);
      this.handleStreamingError(botMessageId, 'Failed to get streaming response');
    }
  }

  private appendToMessage(messageId: number, token: string) {
    const messageIndex = this.messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      this.messages[messageIndex].text += token;
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  private finishStreaming(messageId: number) {
    const messageIndex = this.messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      this.messages[messageIndex].isStreaming = false;

      const fullHtml = this.extractAfterThink(this.messages[messageIndex].text);
      const suggestions = this.extractSuggestions(fullHtml);
      const mainAnswerHtml = this.stripSuggestionsFromHtml(fullHtml);

      this.messages[messageIndex].text = mainAnswerHtml;

      if (suggestions.length > 0) {
        this.messages.push({
          id: this.nextId++,
          text: '',
          sender: 'bot',
          isStreaming: false,
          suggestions
        });
      }
    }
  }


  private handleStreamingError(messageId: number, error: string) {
    const messageIndex = this.messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      this.messages[messageIndex].text = `Error: ${error}`;
      this.messages[messageIndex].sender = 'error';
      this.messages[messageIndex].isStreaming = false;
    }
    this.stopCustomLoading();
  }

  

  replyToMessage(msg: string) {
    this.messages.push({ 
      id: this.nextId++, 
      text: msg, 
      sender: 'bot' 
    });
    console.log(this.messages);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
    console.log(this.messages);
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

selectLanguage(msgId: number, languageLabel: string) {
  this.selectedLanguages[msgId] = languageLabel;
  this.openDropdownMsgId = null;

  const message = this.messages.find(m => m.id === msgId && m.sender === 'bot');
  if (message) {
    const targetCode = this.languageMappings[languageLabel];
    const original = message.originalText || message.text;
    if (!message.originalText) message.originalText = message.text;

    translate(original, { to: targetCode })
      .then((res) => {
        message.text = res.text;
      })
      .catch(() => {
        message.text = 'Translation failed';
      });
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

  extractAfterThink(answer: string): string {
    const closingTag = "</think>";
    const index = answer.indexOf(closingTag);
    if (index !== -1) {
      return answer.substring(index + closingTag.length).trim();
    } else {
      return answer || "No response received.";
    }
  }

  // Toggle between streaming and non-streaming modes
  

  // Method to clear chat history
  

  // TrackBy function for better performance with ngFor
  trackByMessageId(index: number, message: any): number {
    return message.id;
  }

  extractSuggestions(html: string): string[] {
  const container = document.createElement('div');
  container.innerHTML = html;
  const suggestionElements = container.querySelectorAll('.suggestions li');
  return Array.from(suggestionElements)
    .map(el => el.textContent?.trim() || '')
    .filter(Boolean);
}

stripSuggestionsFromHtml(html: string): string {
  const container = document.createElement('div');
  container.innerHTML = html;
  const suggestions = container.querySelector('.suggestions');
  if (suggestions) {
    suggestions.remove();
  }
  return container.innerHTML.trim();
}

handleSuggestionClick(suggestion: string) {
  this.currentMessage = suggestion;
  this.sendMessage();
}


  onSuggestionClick(suggestion: string) {
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  startCustomLoading() {
    this.showLoader = true;
    this.currentLoadingStepIndex = 0;
    this.currentLoadingMessage = this.loadingSteps[0];
    this.loadingInterval = setInterval(() => {
      this.currentLoadingStepIndex++;
      if (this.currentLoadingStepIndex < this.loadingSteps.length) {
        this.currentLoadingMessage = this.loadingSteps[this.currentLoadingStepIndex];
      } else {
        clearInterval(this.loadingInterval);
      }
    }, 1500);
  }

  stopCustomLoading() {
    this.showLoader = false;
    clearInterval(this.loadingInterval);
    this.currentLoadingMessage = '';
  }

  downloadMessageAsPDF(message: string, id: number) {
    const cleanText = this.stripHtmlTags(message); 
    const doc = new jsPDF();
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(cleanText, 180); 
    doc.text(lines, 10, 20);
    doc.save(`chatbot-response-${id}.pdf`);
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}