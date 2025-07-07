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
      'What is the current production output and efficiency?',
      'Are there any bottlenecks in the production process?',
      'How is the production schedule planned and monitored?',
      'What are the key performance indicators (KPIs) for production?',
      'How is inventory managed in relation to production needs?'
    ],
    "Maintenance": [
      'What is the current status of preventive maintenance schedules?',
      'How often are machines inspected and serviced?',
      'What are the common causes of equipment breakdown?',
      'How is downtime tracked and minimized?',
      'What tools or software are used for maintenance management?'
    ],
    "Safety": [
      'What are the key safety policies and procedures in place?',
      'How often are safety drills and training conducted?',
      'What are the most common workplace hazards in this facility?',
      'How do you ensure compliance with safety regulations?',
      'How is safety culture promoted among employees?',
      'Are there any recent safety audits or inspections results?'
    ],
    "Procurement": [
      'How is supplier performance evaluated?',
      'What criteria are used for selecting suppliers?',
      'How do you ensure the quality of procured materials?'
    ],
  };

  redirectToChat(question: string) {
    this.router.navigate(['/chat'], {
      queryParams: { question: question }
    });
  }
}
