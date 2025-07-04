import { Component } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
    messages: { text: string, sender: 'user' | 'bot' }[] = [];
  currentMessage: string = '';

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
      if (lower.includes("what") && lower.includes("do")) {
        reply = "Saint-Gobain designs, manufactures, and distributes materials and solutions for the construction, mobility, and industrial markets.";
      } else if (lower.includes("where")) {
        reply = "Saint-Gobain is headquartered in Courbevoie, France, and operates in over 75 countries.";
      } else if (lower.includes("about")) {
        reply = "Saint-Gobain is a global leader in sustainable building materials, focused on innovation, energy efficiency, and environmental protection.";
      }
    }

    this.messages.push({ text: reply, sender: 'bot' });
  }
}