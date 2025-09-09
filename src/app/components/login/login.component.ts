import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const email = this.credentials.email.trim();
    const password = this.credentials.password.trim();

    if (!email || !password) {
      alert('❗ Please enter both email and password.');
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
      .subscribe(users => {
        if (users.length > 0) {
          localStorage.setItem('loggedInUser', JSON.stringify(users[0]));
          alert('✅ Login successful!');
          this.router.navigate(['/dashboard']);  // Navigate to dashboard after login
        } else {
          alert('❌ Invalid email or password!');
        }
      }, error => {
        alert('❌ Login failed. Please try again later.');
        console.error('Login error:', error);
      });
  }
}
