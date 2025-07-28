import { Component, OnInit } from '@angular/core';
import { operationList } from '../shared/operationList';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-most-searched',
  imports: [CommonModule],
  templateUrl: './most-searched.component.html',
  styleUrl: './most-searched.component.scss'
})

export class MostSearchedComponent implements OnInit{
  operations = operationList;
  selectedBusiness : string = '';
  questionList: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    const sb = localStorage.getItem('selectedBusiness')
    if(sb) this.selectedBusiness = sb;
  }

  navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
  // selectTab(tab: string) {
  //   this.selectedTab = tab
  //   this.questionList = this.questionsMap[this.selectedTab] || [];
  // }

  //hardcodeQuestions
  questionsMap: Record<string, string[]> = {
    "EHS Safety Regulations": [
      'What to do incase of building fire?',
      'What to do if you inhale chemical',
      'What is Customer relationship management',
      'What are Data warehouse'],
      "Tata Motors": [
        'What is the Data integration and processing layers of TrendyThreads',
        'What are data sources of TrendyThreads',
        'What is the Data integration and processing layers of TrendyThreads',
        'What are BI Tools',
        'What is Evacuation Plan',
        'What are Emergency Numbers',
      ]
    };
  redirectToChat(question: string) {
    this.router.navigate(['/chat'], {
      queryParams: { question: question }
    });
  }
}
