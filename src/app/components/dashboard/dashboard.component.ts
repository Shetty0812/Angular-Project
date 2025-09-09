import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any = null;
  userLoans: any[] = [];
  loadingLoans = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      alert('❗ User not logged in.');
      this.router.navigate(['/login']);
      return;
    }

    this.loggedInUser = JSON.parse(user);
    this.fetchUserLoans();
  }

  fetchUserLoans() {
    this.loadingLoans = true;

    this.http.get<any[]>(`http://localhost:3000/loans?userId=${this.loggedInUser.id}`)
      .subscribe(
        loans => {
          this.userLoans = loans.filter(loan =>
            loan &&
            loan.applicantName &&
            loan.amount > 0 &&
            loan.loan_id
          );
          this.loadingLoans = false;
        },
        error => {
          console.error('❌ Error fetching loans:', error);
          this.loadingLoans = false;
        }
      );
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  navigateToApplyLoan() {
    this.router.navigate(['/apply-loan']);
  }

  cancelLoan(loan: any) {
    if (confirm('❗ Are you sure you want to cancel this loan application?')) {
      const status = (loan.status || '').toString().trim().toLowerCase();
      if (status !== 'pending') {
        alert('⚠️ Only pending loans can be cancelled.');
        return;
      }

      this.http.delete(`http://localhost:3000/loans/${loan.id}`).subscribe(
        () => {
          alert('✅ Loan application cancelled successfully!');
          this.userLoans = this.userLoans.filter(l => l.id !== loan.id);
        },
        error => {
          console.error('❌ Failed to cancel loan:', error);
          alert('Failed to cancel the loan. Please try again.');
        }
      );
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'black';
    }
  }
}
