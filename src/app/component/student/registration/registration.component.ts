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

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
title = 'angular-material-file-upload-app';
standard:Class[] = [];
confirmDetails: boolean = false;
allClassList: Observable<Class[]> = new Observable();
academicYearList: Observable<AcademicYear[]> = new Observable();
registrationNumber: string = "";
// myFiles:string [] = [];

//Upload Student Photo
// selectedStudentPhoto: File | null = null;
selectedStudentPhoto: string | ArrayBuffer | null = ''; // For previewing the student photo
selectedStudentPhotoName = 'Choose Photo';

//Upload Documents
selectedFile: File | null = null;
selectedFileName = 'Choose file';
documents: File[] = [];

studentgroup = new FormGroup({
    studentName         : new FormControl(),
    gender              : new FormControl(),
    // parentContactNumber : new FormControl(),
    dateOfBirth : new FormControl(),
    standard            : new FormControl(),
    section             : new FormControl(),
    academicYearCode        : new FormControl(),
    aadhaarNumber       : new FormControl(),
    religion            : new FormControl(),
    category            : new FormControl(),
    registrationNo      : new FormControl(),
 });

 parentgroup = new FormGroup({
    fatherName          : new FormControl(),
    fatherAadharNo      : new FormControl(),
    fatherContactNo     : new FormControl(),
    fatherQualification : new FormControl(),
    fatherProfession    : new FormControl(),
    fatherEmailId       : new FormControl(),
    motherName          : new FormControl(),
    motherAadharNumber  : new FormControl(),
    motherContactNumber : new FormControl(),
    motherProfession    : new FormControl(),
    guardianName        : new FormControl(),
    
 });

 addressgroup = new FormGroup({
  country          : new FormControl(),
  state      : new FormControl(),
  city     : new FormControl(),
  pincode : new FormControl(),
  area    : new FormControl(),
 });

 emergencyContactFormGroup = new FormGroup({
    emergencyContactPerson  : new FormControl(),
    emergencyNumber         : new FormControl(),
 });

 lastSchoolFormGroup= new FormGroup({
    schoolName  : new FormControl(),
    tcNumber         : new FormControl(),
    passedClass         : new FormControl(),
    passedClassMarks         : new FormControl(),
    schoolAddress         : new FormControl(),
});
 
uploadDocumentForm = new FormGroup({
  file: new FormControl(),
  studentPhoto: new FormControl()
});
 
finalSubmission = new FormGroup({});
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['',],
  });
  
  constructor(private formBuilder: FormBuilder,
              public validationMsg: ValidationErrorMessageService,
              private classService: ClassService,
              private academicYearService: AcademicYearService
  ) {
  }

  //load ngOnInit
  ngOnInit(){
    this.createStudentForm();
    this.createParentForm();
    this.createAddressForm();
    this.createEmergencyContactForm();
    this.createLastSchoolForm();
    this.createUploadDocumentForm();
    this.loadDropdowns();
    this.customInit();
  }

  customInit(){
    this.loadClass();
    this.loadAcademicyear();
  }

  loadClass(){
    this.allClassList = this.classService.getAllClass().pipe(
      map((res)=>{
          return res.data;
      })
  )};
  
  loadAcademicyear(){
    this.academicYearList = this.academicYearService.getAllAcademicYear().pipe(
      map((res)=>{
          return res.data;
      })
  )};

  createStudentForm(){
    this.studentgroup = this.formBuilder.group({
      studentName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      standard: ['', [Validators.required]],
      section:['', [Validators.required]],
      academicYearCode: ['', [Validators.required]],
      aadhaarNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation] ],
      religion: ['', [Validators.required]],
      category: ['', [Validators.required]],
      registrationNo: ['', []],
    });
  }

  createParentForm(){
    this.parentgroup = this.formBuilder.group({
      fatherName          : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      fatherAadharNo      : ['', [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      fatherContactNo     : ['', [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      fatherQualification : ['', [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      fatherProfession    : ['', [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      fatherEmailId       : ['', [CustomValidation.emailId]],
      motherName          : ['', [Validators.required, CustomValidation.alphabetsWithSpace, Validators.minLength(3), Validators.maxLength(50)]],
      motherAadharNumber  : ['', [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      motherContactNumber : ['', [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      motherProfession    : ['', [Validators.minLength(1), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      guardianName        : ['', [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      
    });
  }

  createAddressForm(){
    this.addressgroup = this.formBuilder.group({
      country             : ['', ],
      state               : ['', ],
      city                : ['', ],
      pincode             : ['', [Validators.minLength(6), Validators.maxLength(6), CustomValidation.numeric]],
      area                : ['', [Validators.minLength(3), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
   });
  }

  createEmergencyContactForm(){
    this.emergencyContactFormGroup = this.formBuilder.group({
      emergencyContactPerson  : ['', [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      emergencyNumber         : ['', [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
   });
  }

  createLastSchoolForm(){
    this.lastSchoolFormGroup = this.formBuilder.group({
        schoolName          : ['', [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
        tcNumber            : ['', [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphanumaric]],
        passedClass       : ['', [Validators.minLength(1), CustomValidation.numeric]],
        passedClassMarks      : ['', [Validators.minLength(2), CustomValidation.numeric]],
        schoolAddress       : ['', [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
    })
  }

  createUploadDocumentForm(){
      this.uploadDocumentForm = this.formBuilder.group({
        studentPhoto: ['', ],
        file  :['', [CustomValidation.fileTypeValidator]]
      });
  }

   //get student formcontroll
   get studentFormControll(){
    return this.studentgroup.controls;
  }

  //get parent formcontroll
  get parentFormControll(){
    return this.parentgroup.controls;
  }

  //get address formcontroll
  get addressFormControll(){
    return this.addressgroup.controls;
  }

  //get Emergency contact formcontroll
  get emergencyContactFormControll(){
    return this.emergencyContactFormGroup.controls;
  }

  //get last school formcontroll
  get lastSchoolFormControll(){
    return this.lastSchoolFormGroup.controls;
  }

  //get upload document formcontroll
  get uploadDocumentFormControll(){
    return this.uploadDocumentForm.controls;
  }

  loadDropdowns(){
    this.loadStandard();
  }

  loadStandard(){
      this.classService.getAllClass().subscribe(res=>{
        this.standard = res.data
      })
  }

  // generate registration number
  generateRegistrationNumber(existingStudents: number) {
  // Get the values from the form group
  const academicYear = this.studentFormControll.academicYearCode.value;
  const standard = this.studentFormControll.standard.value;
  const uniqueIdentifier = (existingStudents + 1).toString().padStart(4, '0'); // Pad with zeros to ensure a fixed length
  
  this.registrationNumber = academicYear + standard + uniqueIdentifier;
  this.studentFormControll.registrationNo.setValue(this.registrationNumber);

}

  //File Upload

  logConfirmDetails() {
    console.log('confirmDetails:', this.confirmDetails); // Log the value
  }
  toggleConfirm(event: MatSlideToggleChange) {
    this.confirmDetails = event.checked;
    console.log('confirmDetails:', this.confirmDetails); // Log the value
  }

  onStudentPhotoFileChange(event:any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
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
  
  submit(){
        const formData = new FormData();
        for (var i = 0; i < this.documents.length; i++) { 
            formData.append("file[]", this.documents[i]);
            console.log(this.documents[i]);
        }
  }

  //  handle the final submission
  finalSubmit() {
    
  }

}
