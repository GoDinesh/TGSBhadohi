import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime, filter, map, startWith } from 'rxjs';
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
  students: Registration[] = [];
  isLoading: boolean = false;
  filteredStudents: Registration[] = [];
  recentSearches: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private registrationService: RegistrationService
  ) {
    this.loginUserName = this.authService.getLoginUserName();


  }

  async ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.createForm();
    this.formControll.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.filterStudents();
    });
    this.recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    //this.loadStudentList();
  }

  loadStudentList() {
    const studentInfo = this.formControll.searchTerm.value;

    this.registrationService.getStudentListByGlobalFilter(studentInfo).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.students = res.data;
      }
    })
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

  filterStudents() {
    this.isLoading = true;
    const term = this.formgroup.get('searchTerm')?.value.toLowerCase();
    this.loadStudentList();
    this.filteredStudents = this.students.filter(student => {
      return student.studentName.toLowerCase().includes(term) || student.registrationNo.includes(term);
    });
    // if (term) {
    //   this.recentSearches.unshift(term);
    //   this.recentSearches = this.recentSearches.slice(0, 5); // Keep only the last 5 searches
    //   localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    // }
    this.isLoading = false;

  }

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
}
