import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/master/class.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
title = 'angular-material-file-upload-app';
standard:Class[] = [];
// myFiles:string [] = [];

//Upload Documents
selectedFile: File | null = null;
selectedFileName = 'Choose file';
documents: File[] = [];

studentgroup = new FormGroup({
    studentName         : new FormControl(),
    parentContactNumber : new FormControl(),
    standard            : new FormControl(),
    section             : new FormControl(),
    academicYear        : new FormControl(),
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
    lastClassPass         : new FormControl(),
    lastClassMarks         : new FormControl(),
    schoolAddress         : new FormControl(),
});
 
uploadDocumentForm = new FormGroup({
  name: new FormControl(),
  file: new FormControl()
});
 

  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['',],
  });
  
  constructor(private formBuilder: FormBuilder,
              public validationMsg: ValidationErrorMessageService,
              private classService: ClassService
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
  }

  createStudentForm(){
    this.studentgroup = this.formBuilder.group({
      studentName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50) ] ],
      parentContactNumber: ['', ],
      standard: ['',],
      section:['', ],
      academicYear: ['', ],
      aadhaarNumber: ['', ],
      religion: ['', ],
      category: ['', ],
      registrationNo: ['', ],
    });
  }

  createParentForm(){
    this.parentgroup = this.formBuilder.group({
      fatherName          : ['', ],
      fatherAadharNo      : ['', ],
      fatherContactNo     : ['', ],
      fatherQualification : ['', ],
      fatherProfession    : ['', ],
      fatherEmailId       : ['', ],
      motherName          : ['', ],
      motherAadharNumber  : ['', ],
      motherContactNumber : ['', ],
      motherProfession    : ['', ],
      guardianName        : ['', ],
      
    });
  }

  createAddressForm(){
    this.addressgroup = this.formBuilder.group({
      country             : ['', ],
      state               : ['', ],
      city                : ['', ],
      pincode             : ['', ],
      area                : ['', ],
   });
  }

  createEmergencyContactForm(){
    this.emergencyContactFormGroup = this.formBuilder.group({
      emergencyContactPerson  : ['', ],
      emergencyNumber         : ['', ],
   });
  }

  createLastSchoolForm(){
    this.lastSchoolFormGroup = this.formBuilder.group({
        schoolName          : ['', ],
        tcNumber            : ['', ],
        lastClassPass       : ['', ],
        lastClassMarks      : ['', ],
        schoolAddress       : ['', ],
    })
  }

  createUploadDocumentForm(){
      this.uploadDocumentForm = this.formBuilder.group({
        name  :([Validators.required, Validators.minLength(3)]),
        file  :([Validators.required])
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

  //File Upload

  // onFileChange(event:any) {
  //   for (var i = 0; i < event.target.files.length; i++) { 
  //       this.myFiles.push(event.target.files[i]);
  //   }
  // }

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

}
