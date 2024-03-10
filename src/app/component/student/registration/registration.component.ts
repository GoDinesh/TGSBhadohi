import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Class } from 'src/app/model/master/class.model';
import { catchError, map } from 'rxjs/operators';
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
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, throwError } from 'rxjs';
import { FeesStructureService } from 'src/app/service/masters/fees-structure.service';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { forEach } from 'jszip';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/common/auth.service';

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
  reg: Registration;
  updateFlag: boolean = false;
  updateButtonFlag: boolean = true;
  editable: boolean | undefined;
  today = new Date(); 
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
    registrationId: new FormControl(),
    rollNumber: new FormControl(),
    studentName: new FormControl(),
    gender: new FormControl(),
    // parentContactNumber : new FormControl(),
    dateOfBirth: new FormControl(),
    standard: new FormControl(),
    section: new FormControl(),
    academicYearCode: new FormControl(),
    enrollmentType: new FormControl(),
    aadhaarNumber: new FormControl(),
    religion: new FormControl(),
    category: new FormControl(),
    registrationNo: new FormControl(),
    isPromoted: new FormControl(),
    isActive: new FormControl(),
    
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
    private feesStructureService: FeesStructureService,
    private alertService: SweetAlertService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  //load ngOnInit
  ngOnInit() {
    // this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
    //   if (res && res.studetails && res.studetails.registrationNo && res.studetails.registrationNo.length > 0) {
    //     this.reg = res.studetails;
    //     this.updateFlag = true;

    //     if (this.reg.profileImage) {
    //       this.selectedStudentPhoto = this.reg.profileImage.link;
    //       this.fetchFile(this.reg.profileImage.link, this.reg.profileImage.fileName).subscribe((file: File) => {
    //         this.selectedPhoto = file;
    //         // console.log(this.selectedPhoto);
    //       });
    //     }

    //     if (this.reg.documents && this.reg.documents.length > 0) {
    //       const documentObservables = this.reg.documents.map(doc => this.fetchFile(doc.link, doc.fileName));

    //       forkJoin(documentObservables).subscribe((files: File[]) => {
    //         this.documents = files;

    //         // Update the uploadDocumentForm
    //         this.uploadDocumentForm.patchValue({
    //           studentPhoto: this.selectedStudentPhoto,
    //           file: this.documents
    //         });
    //       });
    //     }

    //   }
    // })

    //this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      
      
    this.route.queryParams.subscribe((params) => {
      let res;
      if(params.data!=undefined){
        const txndata = JSON.parse(params.data);
        const decryptedData = this.authService.getDecryptText(txndata);
         res = JSON.parse(decryptedData);
      }

      if (res  && res.registrationNo && res.registrationNo.length > 0) {
        this.reg = res;
        this.updateFlag = true;

        if (this.reg.profileImage) {
          this.selectedStudentPhoto = this.reg.profileImage.link;
          this.fetchFile(this.reg.profileImage.link, this.reg.profileImage.fileName).subscribe((file: File) => {
            this.selectedPhoto = file;
          });
        }

        if (this.reg.documents && this.reg.documents.length > 0) {
          const documentObservables = this.reg.documents.map(doc => this.fetchFile(doc.link, doc.fileName));

          forkJoin(documentObservables).subscribe((files: File[]) => {
            this.documents = files;

            // Update the uploadDocumentForm
            this.uploadDocumentForm.patchValue({
              studentPhoto: this.selectedStudentPhoto,
              file: this.documents
            });
          });
        }
      } else {
        this.reg = new Registration();
        this.updateFlag = false;
        this.selectedStudentPhoto = null;
        this.selectedPhoto = null;
        this.documents = [];
      }
    });


    this.createStudentForm(this.reg);
    this.createParentForm(this.reg);
    this.createAddressForm(this.reg);
    this.createEmergencyContactForm(this.reg);
    this.createLastSchoolForm(this.reg);
    this.createUploadDocumentForm();
    this.updateEditable();
    this.loadDropdowns();
    this.getSections();
    this.customInit();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  customInit() {
    this.loadClass();
    this.loadAcademicyear();
    // Listen for changes on the form && Enable the generate button 
    // this.studentgroup.valueChanges.subscribe(() => {
    //   const standardValue = typeof this.studentgroup.controls.standard.value === 'string' ? this.studentgroup.controls.standard.value.trim() : '';
    //   const academicYearCodeValue = typeof this.studentgroup.controls.academicYearCode.value === 'string' ? this.studentgroup.controls.academicYearCode.value.trim() : '';
    //   const sectionValue = typeof this.studentgroup.controls.section.value === 'string' ? this.studentgroup.controls.section.value.trim() : '';

    //   const standardValid = this.studentgroup.controls.standard.valid && standardValue !== '';
    //   const academicYearCodeValid = this.studentgroup.controls.academicYearCode.valid && academicYearCodeValue !== '';
    //   const sectionValid = this.studentgroup.controls.section.valid && sectionValue !== '';

    //   this.updateFlag = !(standardValid && academicYearCodeValid && sectionValid);
    // });
    this.studentgroup.valueChanges.subscribe(() => {
      const isValid = (controlName: string) => {
        const control = (this.studentgroup.controls as { [key: string]: AbstractControl })[controlName];
        const value = control.value;
        return control.valid && (typeof value === 'string' ? value.trim() : '') !== '';
      };

      this.updateButtonFlag = !['standard', 'academicYearCode', 'section'].every(isValid);
    });

    //change the date format
    // Listen for changes
    this.studentFormControll.dateOfBirth.valueChanges.subscribe(value => {
      if (value) {
        // Format the date here
        const date = new Date(value);

        // Adjust for time zone
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        const formattedDate = date.toISOString().split('T')[0];

        // Update the form control
        this.studentFormControll.dateOfBirth.setValue(formattedDate, { emitEvent: false });
      }
    });


  }

  fetchFile(url: string, fileName: string): Observable<File> {
    return from(
      fetch(url)
        .then(response => response.blob())
        .then(blob => new File([blob], fileName, { type: blob.type }))
    );
  }

  loadClass() {
    this.allClassList = this.classService.getAllActiveClass().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllActiveAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  createStudentForm(stuInfo: Registration | Partial<Registration>) {
    this.studentgroup = this.formBuilder.group({
      registrationId: [stuInfo.registrationId],
      rollNumber: [stuInfo.rollNumber],
      studentName: [stuInfo.studentName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      gender: [stuInfo.gender, [Validators.required]],
      dateOfBirth: [stuInfo.dateOfBirth, [Validators.required]],
      standard: [{ value: stuInfo.standard, disabled: this.updateFlag }, [Validators.required]],
      // standard: [stuInfo.standard, [Validators.required]],
      section: [stuInfo.section, [Validators.required]],
      academicYearCode: [{ value: stuInfo.academicYearCode, disabled: this.updateFlag }, [Validators.required]],
      enrollmentType: [stuInfo.enrollmentType, [Validators.required]],
      aadhaarNumber: [stuInfo.aadhaarNumber, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      religion: [stuInfo.religion, [Validators.required]],
      category: [stuInfo.category, [Validators.required]],
      registrationNo: [stuInfo.registrationNo, [Validators.required]],
      isPromoted: [stuInfo.isPromoted],
      isActive: [stuInfo.isActive]
    });

  }

  createParentForm(parentInfo: Registration | Partial<Registration>) {
    this.parentgroup = this.formBuilder.group({
      fatherName: [parentInfo.fatherName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      fatherAadharNo: [parentInfo.fatherAadharNo, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      fatherContactNo: [parentInfo.fatherContactNo, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      fatherQualification: [parentInfo.fatherQualification, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.plainText]],
      fatherProfession: [parentInfo.fatherProfession, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.plainText]],
      fatherEmailId: [parentInfo.fatherEmailId, [CustomValidation.emailId]],
      motherName: [parentInfo.motherName, [Validators.required, CustomValidation.alphabetsWithSpace, Validators.minLength(3), Validators.maxLength(50)]],
      motherAadharNumber: [parentInfo.motherAadharNumber, [Validators.minLength(12), Validators.maxLength(12), CustomValidation.aadhaarValidation]],
      motherContactNumber: [parentInfo.motherContactNumber, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
      motherProfession: [parentInfo.motherProfession, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.plainText]],
      guardianName: [parentInfo.guardianName, [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],

    });
  }

  createAddressForm(addressInfo: Registration | Partial<Registration>) {
    this.addressgroup = this.formBuilder.group({
      country: [addressInfo.country,],
      state: [addressInfo.state,],
      city: [addressInfo.city, [Validators.minLength(3), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
      pincode: [addressInfo.pincode, [Validators.minLength(6), Validators.maxLength(6), CustomValidation.numeric]],
      area: [addressInfo.area, [Validators.minLength(3), Validators.maxLength(100), CustomValidation.plainText]],
    });
  }

  createEmergencyContactForm(contactInfo: Registration | Partial<Registration>) {
    this.emergencyContactFormGroup = this.formBuilder.group({
      emergencyContactPerson: [contactInfo.emergencyContactPerson, [Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      emergencyNumber: [contactInfo.emergencyNumber, [Validators.minLength(10), Validators.maxLength(10), CustomValidation.numeric]],
    });
  }

  createLastSchoolForm(lastSchoolInfo: Registration | Partial<Registration>) {
    this.lastSchoolFormGroup = this.formBuilder.group({
      schoolName: [lastSchoolInfo.schoolName, [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphabetsWithSpace]],
      tcNumber: [lastSchoolInfo.tcNumber, [Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphanumaric]],
      passedClass: [lastSchoolInfo.passedClass, [Validators.minLength(1), Validators.maxLength(50), CustomValidation.numeric]],
      passedClassMarks: [lastSchoolInfo.passedClassMarks, [Validators.minLength(2), Validators.maxLength(3), CustomValidation.numeric]],
      schoolAddress: [lastSchoolInfo.schoolAddress, [Validators.minLength(2), Validators.maxLength(100), CustomValidation.plainText]],
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

  getSections() {
    return [
      // {
      //   title: 'Student Details',
      //   fields: [
      //     { label: 'Student Name', value: this.studentgroup.controls.studentName.value },
      //     { label: 'Gender', value: this.studentFormControll.gender.value },
      //     { label: 'Standard', value: this.studentFormControll.standard.value },
      //     { label: 'Academic Year', value: this.studentFormControll.academicYearCode.value },
      //     { label: 'Aadhar Number', value: this.studentFormControll.aadhaarNumber.value },
      //     { label: 'Religion', value: this.studentFormControll.religion.value },
      //     { label: 'Category', value: this.studentFormControll.category.value },
      //     { label: 'Registration Number', value: this.studentFormControll.registrationNo.value },
      //   ]
      // },
      {
        title: 'Parent Details',
        fields: [
          { label: 'Father Name', value: this.parentFormControll.fatherName.value },
          { label: 'Father Adhar No.', value: this.parentFormControll.fatherAadharNo.value },
          { label: 'Father Contact No.', value: this.parentFormControll.fatherContactNo.value },
          { label: 'Father Qualification', value: this.parentFormControll.fatherQualification.value },
          { label: 'Father Profession', value: this.parentFormControll.fatherProfession.value },
          { label: 'Father EmailId', value: this.parentFormControll.fatherEmailId.value },
          { label: 'Mother Name', value: this.parentFormControll.motherName.value },
          { label: 'Mother Adhar No.', value: this.parentFormControll.motherAadharNumber.value },
          { label: 'Mother Contact No.', value: this.parentFormControll.motherContactNumber.value },
          { label: 'Mother Profession', value: this.parentFormControll.motherProfession.value },
          { label: 'Guardian Name', value: this.parentFormControll.guardianName.value }
        ]
      },
      {
        title: 'Address Details',
        fields: [
          { label: 'Country', value: this.addressFormControll.country.value },
          { label: 'State', value: this.addressFormControll.state.value },
          { label: 'City', value: this.addressFormControll.city.value },
          { label: 'Pincode', value: this.addressFormControll.pincode.value },
          { label: 'Area', value: this.addressFormControll.area.value },
        ]
      },
      {
        title: 'Emergency Details',
        fields: [
          { label: 'Emergency Contact Person', value: this.emergencyContactFormControll.emergencyContactPerson.value },
          { label: 'Emergency Number', value: this.emergencyContactFormControll.emergencyNumber.value },
        ]
      },
      {
        title: 'Previous Schools Details',
        fields: [
          { label: 'School Name', value: this.lastSchoolFormControll.schoolName.value },
          { label: 'TC Number', value: this.lastSchoolFormControll.tcNumber.value },
          { label: 'Passes Class', value: this.lastSchoolFormControll.passedClass.value },
          { label: 'Passed Class Marks', value: this.lastSchoolFormControll.passedClassMarks.value },
        ]
      },
    ];
  }

  loadDropdowns() {
    this.loadStandard();
  }

  loadStandard() {
    this.classService.getAllActiveClass().subscribe(res => {
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

    this.registrationService.getMaxRegistrationNumber().subscribe(res => {
      if(res.status === msgTypes.SUCCESS_MESSAGE){
        this.registrationNumber = academicYear + standard + res.data[0].rollNumber;
        this.studentFormControll.registrationNo.setValue(this.registrationNumber);

      this.registrationService.getRollNumber(reg).subscribe(res=>{
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.studentFormControll.rollNumber.setValue(res.data[0].rollNumber);
        }
      })
      
     }else{
      this.studentFormControll.registrationNo.setValue("");
     }
      
    });
  }

  //File Upload

  toggleConfirm(event: MatSlideToggleChange) {
    this.confirmDetails = event.checked;
  }

  onStudentPhotoFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPhoto = input.files[0];
      this.selectedStudentPhotoName = input.files[0].name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedStudentPhoto = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeSelectedPhoto() {
    this.selectedPhoto = null;
    this.selectedStudentPhoto = null;
    // Clear the form control value if needed
    this.uploadDocumentForm.patchValue({
      studentPhoto: null
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // console.log(this.selectedFile);
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

  async prepareAcquirerForm() {



  }

  //  handle the final submission
  async finalSubmit() {

    this.reg = new Registration();

    this.reg = { ...this.reg, ...this.studentgroup.getRawValue() };
    this.reg = { ...this.reg, ...this.parentgroup.value };
    this.reg = { ...this.reg, ...this.addressgroup.value };
    this.reg = { ...this.reg, ...this.emergencyContactFormGroup.value };
    this.reg = { ...this.reg, ...this.lastSchoolFormGroup.value };

    this.reg.dateOfBirth = moment(this.reg.dateOfBirth).format(msgTypes.YYYY_MM_DD);

    const formData = new FormData();
    if (this.documents && this.documents.length > 0) {
      for (let i = 0; i <= this.documents.length - 1; i++) {
        formData.append("documentUpload[]", <File>this.documents[i]);
      }
    }

    if (this.selectedPhoto) {
      formData.append("profileImage", <File>this.selectedPhoto);
    }

    formData.append("requestData", JSON.stringify(this.reg))

    this.registrationService.studentRegistrationWithImage(formData).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.resetForm();
        this.router.navigateByUrl('/navmenu' + appurl.menuurl_student + appurl.student_list);
      }
    });
  }

  resetForm() {
    this.studentgroup.reset();
    this.parentgroup.reset();
    this.emergencyContactFormGroup.reset();
    this.lastSchoolFormGroup.reset();
    this.uploadDocumentForm.reset();
    this.addressgroup.reset();
    this.selectedStudentPhoto = '';
    this.documents = [];
  }

  isFeesStructureAvailable() {
    const academicYearCode = this.studentgroup.controls.academicYearCode.value;
    const standard = this.studentgroup.controls.standard.value;
    const enrollmentType = this.studentgroup.controls.enrollmentType.value;

    if ((standard != '' && standard != null && standard != undefined) 
      && (academicYearCode != '' && academicYearCode != null && academicYearCode != undefined)
      && (enrollmentType != '' && enrollmentType != null && enrollmentType != undefined)
    ) {
      const feesStructure = new FeesStructure();
      feesStructure.academicYearCode = academicYearCode;
      feesStructure.classCode = standard;
      this.feesStructureService.getByAcademicYearAndClassAndEnrollmentType(feesStructure).subscribe((res) => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          if (res.data.length == 0) {
            this.alertService.showAlert(msgTypes.ERROR_MESSAGE, "Fees Structure is not created", msgTypes.ERROR, msgTypes.OK_KEY)
            this.studentgroup.controls.academicYearCode.reset();
            this.studentgroup.controls.standard.reset();
          }
        }
      })

    }

  }


  handleInputChange(formcontrol: FormControl){  
    formcontrol.setValue(formcontrol.value.replace(/\b\w/g, (first:string) => first.toLocaleUpperCase()) );
  }

}
