import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  allLoans: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllLoans();
  }

  fetchAllLoans() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:3000/loans').subscribe(
      loans => {
        this.allLoans = loans || [];
        this.loading = false;
      },
      error => {
        console.error('❌ Failed to fetch loans:', error);
        this.loading = false;
      }
    );
  }

  approveLoan(loan: any) {
    if (loan.status.toLowerCase() !== 'pending') {
      alert('⚠️ Only pending loans can be approved.');
      return;
    }

    if (confirm('✅ Are you sure you want to approve this loan?')) {
      const updatedLoan = { ...loan, status: 'approved' };

      this.http.put(`http://localhost:3000/loans/${loan.id}`, updatedLoan).subscribe(
        () => {
          alert('✅ Loan approved successfully!');
          this.fetchAllLoans();
        },
        error => {
          console.error('❌ Failed to approve loan:', error);
          alert('Failed to approve the loan. Please try again.');
        }
      );
    }
  }

  rejectLoan(loan: any) {
    if (loan.status.toLowerCase() !== 'pending') {
      alert('⚠️ Only pending loans can be rejected.');
      return;
    }

    if (confirm('❗ Are you sure you want to reject this loan?')) {
      const updatedLoan = { ...loan, status: 'rejected' };

      this.http.put(`http://localhost:3000/loans/${loan.id}`, updatedLoan).subscribe(
        () => {
          alert('🚫 Loan rejected successfully!');
          this.fetchAllLoans();
        },
        error => {
          console.error('❌ Failed to reject loan:', error);
          alert('Failed to reject the loan. Please try again.');
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('loggedInManager');
    window.location.href = '/manager-login';
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
