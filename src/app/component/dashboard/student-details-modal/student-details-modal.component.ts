import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-details-modal',
  templateUrl: './student-details-modal.component.html',
  styleUrls: ['./student-details-modal.component.css']
})
export class StudentDetailsModalComponent {
  @Input() selectedYear: string;
  studentDetails: any[] = [];
  showModal = false;

  openModal() {
    this.studentDetails = this.fetchStudentDetails(this.selectedYear);
    // Logic to open the modal
    const modal = document.getElementById('studentDetailsModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    // this.showModal = true;
  }

  closeModal() {
    // Logic to close the modal
    const modal = document.getElementById('studentDetailsModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    // this.showModal = false;
  }

  fetchStudentDetails(year: string): any[] {
    // Fetch student details for the selected year
    // For demo purposes, returning a static array
    return [
      { name: 'John', className: '10th', registrationNo: '123' },
      { name: 'Jane', className: '11th', registrationNo: '124' }
    ];
  }
}
