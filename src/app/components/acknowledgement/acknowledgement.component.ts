import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent implements OnInit {
  loanData: any;
  submitting: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('loanData');
    if (data) {
      this.loanData = JSON.parse(data);
    }
  }

  submitLoan() {
    if (!this.loanData) {
      alert('No loan data available to submit.');
      return;
    }

    this.submitting = true;

    // Add applicantName from logged-in user info (assumes you have user in localStorage)
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.loanData.applicantName = user.name;  // Add applicant name to loan data
    } else {
      alert('User not logged in.');
      this.submitting = false;
      return;
    }

    this.http.post('http://localhost:3000/loans', this.loanData)
      .subscribe(
        () => {
          alert('✅ Loan application submitted successfully!');
          localStorage.removeItem('loanData');  // Clear temporary loan data
          this.loanData = null;
          this.submitting = false;

          // Navigate to dashboard after successful submission
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Submission error:', error);
          alert('❌ Failed to submit application. Please try again.');
          this.submitting = false;
        }
      );
  }
}
