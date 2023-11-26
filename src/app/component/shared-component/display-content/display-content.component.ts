import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, filter, map, startWith } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})

export class DisplayContentComponent {
  isSideNavCollapsed = true;
  screenWidth !: number;
  loginUserName: string = '';
  searchTerm = new FormControl('');
  showModal: boolean = false;
  displayedColumns: string[] = ['avatar', 'registrationNo', 'name', 'action'];
  // students: Registration[] = [];
  isLoading: boolean = false;
  filteredStudents: Registration[] = [];
  //recentSearches: string[] = [];
  studentList: Observable<ResponseModel>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private registrationService: RegistrationService,
    private router: Router,
  ) {
    this.loginUserName = this.authService.getLoginUserName();
  }

  async ngOnInit() {
    this.loadStudentList();
  }

  loadStudentList() {
    this.studentList = this.registrationService.studentList(new Registration())
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  formgroup = new FormGroup({
    searchTerm: new FormControl()
  });

  createForm() {
    this.formgroup = this.formBuilder.group({
      searchTerm: ['', Validators.required],
    });
  }

  //get formcontroll
  get formControll() {
    return this.formgroup.controls;
  }

  // filterStudents() {
  //   this.isLoading = true;
  //   const term = this.formgroup.get('searchTerm')?.value.toLowerCase();
  //   this.loadStudentList();
  //   this.filteredStudents = this.students.filter(student => {
  //     return student.studentName.toLowerCase().includes(term) || student.registrationNo.includes(term);
  //   });
  //   this.isLoading = false;

  // }

  onFocusIn(): void {
    this.showModal = true;
  }

  onClose(): void {
    this.showModal = false;
  }

  @ViewChild('modalElement') modalElementRef: ElementRef;
  @ViewChild('searchBarElement') searchBarElementRef: ElementRef;

  @HostListener('document:click', ['$event'])
  onHide(event: Event): void {
    const clickedInsideModal = this.modalElementRef.nativeElement.contains(event.target);
    const clickedInsideSearchBar = this.searchBarElementRef.nativeElement.contains(event.target);

    if (!clickedInsideModal && !clickedInsideSearchBar) {
      this.showModal = false;
    }
  }


  viewStudentDetails(student: Registration){
       // this.router.navigateByUrl('/navmenu' + appurl.menuurl_student + appurl.student_details, { state: { studetails: student } });  
       const url = appurl.navmenu + appurl.menuurl_student + appurl.student_details;
       const encryptData = this.authService.getEncryptText(JSON.stringify(student));
       this.router.navigate([url], {
           queryParams: {
               data: JSON.stringify(encryptData)
           }
       });
       this.showModal = false;
  }

  //Action for Payin Details
  payFees(registration: Registration) {
    const url = appurl.navmenu + appurl.menuurl_fees + appurl.pay_fees;
    const encryptData = this.authService.getEncryptText(JSON.stringify(registration));
    this.router.navigate([url], {
        queryParams: {
            data: JSON.stringify(encryptData)
        }
    });
    this.showModal = false;
}

}
