import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent {
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

    this.http.get<any[]>(`http://localhost:3000/managers?email=${email}&password=${password}`)
      .subscribe(managers => {
        if (managers.length > 0) {
          localStorage.setItem('loggedInManager', JSON.stringify(managers[0]));
          alert('✅ Manager login successful!');
          this.router.navigate(['/manager-dashboard']);  // Go to manager dashboard
        } else {
          alert('❌ Invalid manager credentials!');
        }
      }, error => {
        alert('❌ Login failed. Please try again later.');
        console.error('Manager login error:', error);
      });
  }
}
