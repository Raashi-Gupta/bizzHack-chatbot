import { Component } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule,UploadComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  currentMessage: string = '';

  private responses = [
    {
      triggers: ['hi', 'hello', 'hey', 'heya', 'yo', 'hiya'],
      answer: 'Hey there! How can I assist you today?'
    },
    {
      triggers: ['good morning', 'morning'],
      answer: 'Good morning! Hope you have a great day ahead!'
    },
    {
      triggers: ['good afternoon', 'afternoon'],
      answer: 'Good afternoon! How can I help you today?'
    },
    {
      triggers: ['good evening', 'evening'],
      answer: 'Good evening! Need any help?'
    },
    {
      triggers: ['how are you', 'how are you doing', 'how do you do'],
      answer: 'I’m functioning at full capacity! Thanks for asking.'
    },
    {
      triggers: ['what is your name', 'who are you'],
      answer: 'I’m your assistant chatbot built into this Angular app!'
    },
    {
      triggers: ['help', 'support', 'assist me'],
      answer: 'Of course! I can help with app features or answer basic questions.'
    },
    {
      triggers: ['thank you', 'thanks', 'thx', 'ty'],
      answer: 'You’re very welcome! 😊'
    },
    {
      triggers: ['bye', 'goodbye', 'see you', 'later'],
      answer: 'Take care! I’ll be here if you need more help.'
    },
    {
      triggers: ['*'],
      answer: 'Hmm, I’m not sure how to respond to that. Can you try asking another way?'
    }
  ];

  sendMessage() {
    const message = this.currentMessage.trim();
    if (message) {
      this.messages.push({ text: message, sender: 'user' });
      this.currentMessage = '';
      setTimeout(() => this.replyToMessage(message), 500); // bot replies after 0.5 sec
    }
  }

  replyToMessage(msg: string) {
    const lower = msg.toLowerCase();
    let reply = "I'm not sure how to answer that yet.";

    if (lower.includes("saint-gobain") || lower.includes("saint gobain")) {
      if (lower.includes("what") || lower.includes("do")) {
        reply = "Saint-Gobain designs, manufactures, and distributes materials and solutions for the construction, mobility, and industrial markets.";
      } else if (lower.includes("where")) {
        reply = "Saint-Gobain is headquartered in Courbevoie, France, and operates in over 75 countries.";
      } else if (lower.includes("about")) {
        reply = "Saint-Gobain is a global leader in sustainable building materials, focused on innovation, energy efficiency, and environmental protection.";
      }
      this.messages.push({ text: reply, sender: 'bot' });
    }
    else {
      const fallback = this.responses.find(r => r.triggers.includes(lower));
      reply = fallback ? fallback.answer : "I'm not sure how to respond to that.";
      this.messages.push({ text: reply, sender: 'bot' });
    }
  }
}