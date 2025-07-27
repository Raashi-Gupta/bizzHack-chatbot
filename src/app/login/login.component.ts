import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  business: string[];
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private usersUrl = 'assets/data/user.json';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.get<User[]>(this.usersUrl).pipe(
        map(users => users.find(user => user.email === email))
      ).subscribe(user => {
        if (user) {
          // You can store any part of the user object, or all of it
          localStorage.setItem('user', JSON.stringify(user));

          // Optional: store just username separately
          localStorage.setItem('userName', user.email);

          this.router.navigate(['/home']);
        } else {
          console.error("Invalid credentials.");
        }
      }, error => {
        console.error("HTTP error:", error);
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}