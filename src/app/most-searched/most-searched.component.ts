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
      'What is LOTO?',
      "What is Information Tags?",
      'What is ESP?'
    ],
      "Tata Motors": [
       'What are Tata Nexon common error codes?',
       "What are Tata Motors Plants details?",
       "Who are key components vendors?"
      ]
    };
  redirectToChat(question: string) {
    this.router.navigate(['/chat'], {
      queryParams: { question: question }
    });
  }
}
