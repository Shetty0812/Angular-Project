import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
 
  constructor(private http: HttpClient, private router: Router) {}
 
  registerUser() {
    // First check if user already exists
    this.http.get<any[]>(`http://localhost:3000/users?email=${this.user.email}`)
      .subscribe(users => {
        if (users.length > 0) {
          alert('User already exists! Please login.');
          this.router.navigate(['/login']);
        } else {
          // Add new user
          this.http.post('http://localhost:3000/users', this.user).subscribe(() => {
            alert('Register successful! Please login.');
            this.router.navigate(['/login']);
          });
        }
      });
  }
}