import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Class } from 'src/app/model/master/class.model';
import { map } from 'rxjs/operators';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Registration } from 'src/app/model/student/registration.model';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { msgTypes } from 'src/app/constants/common/msgType';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { appurl } from 'src/app/constants/common/appurl';
import { PermissionService } from 'src/app/service/common/permission.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  title = 'angular-material-file-upload-app';
  standard: Class[] = [];
  confirmDetails: boolean = false;
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  registrationNumber: string = "";
  reg: Registration = new Registration();
  updateFlag: boolean = false;
  editable: boolean;
  // myFiles:string [] = [];

  //Upload Student Photo
  selectedPhoto: File | null = null;
  selectedStudentPhoto: string | ArrayBuffer | null = ''; // For previewing the student photo
  selectedStudentPhotoName = 'Choose Photo';

  //Upload Documents
  selectedFile: File | null = null;
  selectedFileName = 'Choose file';
  documents: File[] = [];

  studentgroup = new FormGroup({
    id: new FormControl(),
    rollNumber: new FormControl(),
    studentName: new FormControl(),
    gender: new FormControl(),
    // parentContactNumber : new FormControl(),
    dateOfBirth: new FormControl(),
    standard: new FormControl(),
    section: new FormControl(),
    academicYearCode: new FormControl(),
    aadhaarNumber: new FormControl(),
    religion: new FormControl(),
    category: new FormControl(),
    registrationNo: new FormControl(),
  });

  parentgroup = new FormGroup({
    fatherName: new FormControl(),
    fatherAadharNo: new FormControl(),
    fatherContactNo: new FormControl(),
    fatherQualification: new FormControl(),
    fatherProfession: new FormControl(),
    fatherEmailId: new FormControl(),
    motherName: new FormControl(),
    motherAadharNumber: new FormControl(),
    motherContactNumber: new FormControl(),
    motherProfession: new FormControl(),
    guardianName: new FormControl(),

  });

  addressgroup = new FormGroup({
    country: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    pincode: new FormControl(),
    area: new FormControl(),
  });

  emergencyContactFormGroup = new FormGroup({
    emergencyContactPerson: new FormControl(),
    emergencyNumber: new FormControl(),
  });

  lastSchoolFormGroup = new FormGroup({
    schoolName: new FormControl(),
    tcNumber: new FormControl(),
    passedClass: new FormControl(),
    passedClassMarks: new FormControl(),
    schoolAddress: new FormControl(),
  });

  uploadDocumentForm = new FormGroup({
    file: new FormControl(),
    studentPhoto: new FormControl()
  });

  finalSubmission = new FormGroup({});
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['',],
  });

  constructor(public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    private registrationService: RegistrationService,
    private router: Router,
    private permissionService: PermissionService,
  ) {

    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateEditableValue();
      }
    });
  }

  //load ngOnInit
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.studetails.registrationNo.length > 0) {
        this.reg = res.studetails;
        this.updateFlag = true;
      }
    })

    this.createStudentForm(this.reg);
    this.createParentForm(this.reg);
    this.createAddressForm(this.reg);
    this.createEmergencyContactForm(this.reg);
    this.createLastSchoolForm(this.reg);
    this.createUploadDocumentForm();
    this.updateEditableValue();
    this.loadDropdowns();
    this.customInit();
  }

  customInit() {
    this.loadClass();
    this.loadAcademicyear();
  }

  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  loadClass() {
    this.allClassList = this.classService.getAllClass().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  createStudentForm(stuInfo: Registration) {
    this.studentgroup = this.formBuilder.group({
      id: [stuInfo.id],
      rollNumber: [stuInfo.rollNumber],
      studentName: [stuInfo.studentName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      gender: [stuInfo.gender, [Validators.required]],
      dateOfBirth: [stuInfo.dateOfBirth, [Validators.required]],
      standard: [stuInfo.standard, [Validators.required]],
      section: [stuInfo.section, [Validators.required]],
      academicYearCode: [stuInfo.academicYearCode, [Validators.required]],
      aadhaarNumber: [stuInfo.aadhaarNumber, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      religion: [stuInfo.religion, [Validators.required]],
      category: [stuInfo.category, [Validators.required]],
      registrationNo: [stuInfo.registrationNo, []],
    });
  }

  createParentForm(parentInfo: Registration) {
    this.parentgroup = this.formBuilder.group({
      fatherName: [parentInfo.fatherName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      fatherAadharNo: [parentInfo.fatherAadharNo, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      fatherContactNo: [parentInfo.fatherContactNo, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      fatherQualification: [parentInfo.fatherQualification, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      fatherProfession: [parentInfo.fatherProfession, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      fatherEmailId: [parentInfo.fatherEmailId, [CustomValidation.emailId]],
      motherName: [parentInfo.motherName, [Validators.required, CustomValidation.alphabetsWithSpace, Validators.minLength(3), Validators.maxLength(50)]],
      motherAadharNumber: [parentInfo.motherAadharNumber, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      motherContactNumber: [parentInfo.motherContactNumber, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      motherProfession: [parentInfo.motherProfession, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      guardianName: [parentInfo.guardianName, [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],

    });
  }

  createAddressForm(addressInfo: Registration) {
    this.addressgroup = this.formBuilder.group({
      country: [addressInfo.country,],
      state: [addressInfo.state,],
      city: [addressInfo.city, [Validators.minLength(3), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
      pincode: [addressInfo.pincode, [Validators.minLength(6), Validators.maxLength(6), CustomValidation.numeric]],
      area: [addressInfo.area, [Validators.minLength(3), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
    });
  }

  createEmergencyContactForm(contactInfo: Registration) {
    this.emergencyContactFormGroup = this.formBuilder.group({
      emergencyContactPerson: [contactInfo.emergencyContactPerson, [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      emergencyNumber: [contactInfo.emergencyNumber, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
    });
  }

  createLastSchoolForm(lastSchoolInfo: Registration) {
    this.lastSchoolFormGroup = this.formBuilder.group({
      schoolName: [lastSchoolInfo.schoolName, [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      tcNumber: [lastSchoolInfo.tcNumber, [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphanumaric]],
      passedClass: [lastSchoolInfo.passedClass, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.numeric]],
      passedClassMarks: [lastSchoolInfo.passedClassMarks, [Validators.minLength(2), Validators.maxLength(3), CustomValidation.numeric]],
      schoolAddress: [lastSchoolInfo.schoolAddress, [Validators.minLength(2), Validators.maxLength(100), CustomValidation.alphabetsWithSpace]],
    })
  }

  createUploadDocumentForm() {
    this.uploadDocumentForm = this.formBuilder.group({
      studentPhoto: ['',],
      file: ['', [CustomValidation.fileTypeValidator]]
    });
  }

  //get student formcontroll
  get studentFormControll() {
    return this.studentgroup.controls;
  }

  //get parent formcontroll
  get parentFormControll() {
    return this.parentgroup.controls;
  }

  //get address formcontroll
  get addressFormControll() {
    return this.addressgroup.controls;
  }

  //get Emergency contact formcontroll
  get emergencyContactFormControll() {
    return this.emergencyContactFormGroup.controls;
  }

  //get last school formcontroll
  get lastSchoolFormControll() {
    return this.lastSchoolFormGroup.controls;
  }

  //get upload document formcontroll
  get uploadDocumentFormControll() {
    return this.uploadDocumentForm.controls;
  }

  loadDropdowns() {
    this.loadStandard();
  }

  loadStandard() {
    this.classService.getAllClass().subscribe(res => {
      this.standard = res.data
    })
  }

  // generate registration number
  async generateRegistrationNumber() {
  // Get the values from the form group
  const academicYear = this.studentFormControll.academicYearCode.value;
  const standard = this.studentFormControll.standard.value;
  // const uniqueIdentifier = (existingStudents + 1).toString().padStart(4, '0'); // Pad with zeros to ensure a fixed length
  let reg: Registration = new Registration();
  reg.academicYearCode = academicYear;
  reg.standard = standard;
  
  this.registrationService.getRollNumber(reg).subscribe(res=>{
    this.studentFormControll.rollNumber.setValue(res.data[0].rollNumber);
    this.registrationNumber = academicYear + standard + res.data[0].rollNumber;
    this.studentFormControll.registrationNo.setValue(this.registrationNumber);
  });
  
 

    this.registrationNumber = academicYear + standard;// + uniqueIdentifier;
    this.studentFormControll.registrationNo.setValue(this.registrationNumber);

  }

  //File Upload

  toggleConfirm(event: MatSlideToggleChange) {
    this.confirmDetails = event.checked;
  }

  onStudentPhotoFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPhoto = input.files[0];
      console.log(this.selectedPhoto);
      // this.selectedStudentPhoto = input.files[0];
      this.selectedStudentPhotoName = input.files[0].name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedStudentPhoto = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      this.selectedFileName = this.selectedFile.name;
    }
  }

  addDocument() {
    if (this.selectedFile) {
      this.documents.push(this.selectedFile);
      this.selectedFile = null;
      this.selectedFileName = 'Choose file';
    }
  }

  previewDocument(doc: File) {
    const fileURL = URL.createObjectURL(doc);
    window.open(fileURL, '_blank');
  }

  deleteDocument(index: number) {
    this.documents.splice(index, 1);
  }

  submit() {
    const formData = new FormData();
    for (var i = 0; i < this.documents.length; i++) {
      formData.append("file[]", this.documents[i]);
    }
  }

  prepareAcquirerForm() {
    this.reg = new Registration();
    this.reg = {...this.reg , ...this.studentgroup.value};
    this.reg = {...this.reg , ...this.parentgroup.value};
    this.reg = {...this.reg, ...this.addressgroup.value};
    this.reg = {...this.reg, ...this.emergencyContactFormGroup.value};
    this.reg = {...this.reg, ...this.lastSchoolFormGroup.value};

    const formData = new FormData();
    if (this.documents && this.documents.length > 0) {
        for (let i = 0; i <= this.documents.length - 1; i++) {
          formData.append("documentUpload[]", < File > this.documents[i]);
        }
    }

    // if(this.selectedPhoto && this.selectedPhoto.length>0){
    //   formData.append("profileImage", < File > this.selectedPhoto);
    // }
    if (this.documents && this.documents.length > 0) {
      for (let i = 0; i <= 0; i++) {
        formData.append("profileImage", < File > this.documents[i]);
      }
  }

    formData.append("requestData", JSON.stringify(this.reg))
    return formData;

  }

  //  handle the final submission
  finalSubmit() {
      
          const regData = this.prepareAcquirerForm();

          // this.registrationService.studentRegistration(regData).subscribe(res=>{
          //   if(res.status === msgTypes.SUCCESS_MESSAGE){
          //       this.resetForm();
          //       this.router.navigateByUrl('/navmenu'+appurl.menuurl_student+appurl.student_list);
          //   }
          // });

           this.registrationService.studentRegistrationWithImage(regData).subscribe(res=>{
            if(res.status === msgTypes.SUCCESS_MESSAGE){
                this.resetForm();
                this.router.navigateByUrl('/navmenu'+appurl.menuurl_student+appurl.student_list);
            }
          });

    
      
}



resetForm(){
  this.studentgroup.reset();
  this.parentgroup.reset();
  this.emergencyContactFormGroup.reset();
  this.lastSchoolFormGroup.reset();
  this.uploadDocumentForm.reset();
  this.addressgroup.reset();
  this.selectedStudentPhoto = '';
  this.documents = [];
}

}
