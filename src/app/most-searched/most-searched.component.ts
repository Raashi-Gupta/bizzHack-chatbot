import { Component } from '@angular/core';
import { operationList } from '../shared/operationList';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-most-searched',
  imports: [CommonModule],
  templateUrl: './most-searched.component.html',
  styleUrl: './most-searched.component.scss'
})

export class MostSearchedComponent {
  operations = operationList;
  selectedTab = '';
  questionList: any;
  constructor(private router: Router) { }

  navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
  selectTab(tab: string) {
    this.selectedTab = tab
    this.questionList = this.questionsMap[this.selectedTab] || [];
  }

  //hardcodeQuestions
  questionsMap: Record<string, string[]> = {
    "Production": [
      'What is the Data integration and processing layers of TrendyThreads',
      'What are data sources of TrendyThreads'
      
    ],
    "Maintenance": [
      'What is the Data integration and processing layers of TrendyThreads',
      'What are BI Tools'
  
    ],
    "Safety": [
        'What is Evacuation Plan',
        'What are Emergency Numbers',
        'What to do incase of building fire?',
        'What to do if you inhale chemical'
  
    ],
    "Procurement": [
       'What is Customer relationship management',
       'What are Data warehouse'
    ],
  };

  redirectToChat(question: string) {
    this.router.navigate(['/chat'], {
      queryParams: { question: question }
    });
  }
}
