import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loan-application';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  isManagerLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInManager');
  }

  logout(): void {
    if (this.isLoggedIn()) {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['/login']);
    } else if (this.isManagerLoggedIn()) {
      localStorage.removeItem('loggedInManager');
      this.router.navigate(['/manager-login']);
    }
  }
}
