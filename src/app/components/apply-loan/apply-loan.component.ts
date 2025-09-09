import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent {
  loan = {
    applicantName: '',
    type: '',
    amount: 0,
    tenure: 0,
    description: '',
    document: '',
    status: 'pending',
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.loan.document = file.name;  // Only store filename
    }
  }

  submitLoan() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (!user?.id) {
      alert('⚠️ User not logged in.');
      return;
    }

    if (!this.selectedFile) {
      alert('⚠️ Please upload a document.');
      return;
    }

    const loanData = {
      id: Math.random().toString(36).substring(2, 6), // simple unique id
      ...this.loan,
      loan_id: 'LN' + Date.now(),
      userId: user.id,
      submissionDate: new Date().toISOString(),
      status: 'pending'  // ensure status is pending on submission
    };

    const confirmMsg = `
Please review your loan application:

👤 Name: ${loanData.applicantName}
🏠 Loan Type: ${loanData.type}
💰 Amount: ₹${loanData.amount}
📅 Tenure: ${loanData.tenure} months
📄 Document: ${loanData.document}

Do you want to submit this loan?
    `;

    if (!confirm(confirmMsg)) {
      return;
    }

    this.http.post('http://localhost:3000/loans', loanData).subscribe(
      () => {
        alert('✅ Loan application submitted successfully!');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('❌ Submission failed:', error);
        alert('Failed to submit the application. Please try again.');
      }
    );
  }
}
