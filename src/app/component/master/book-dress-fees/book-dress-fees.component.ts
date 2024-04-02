import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { BookAndDressFees } from 'src/app/model/master/book-and-dress-fees.model';
import { Class } from 'src/app/model/master/class.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { BookAndDressFeesService } from 'src/app/service/masters/book-and-dress-fees.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-book-dress-fees',
  templateUrl: './book-dress-fees.component.html',
  styleUrls: ['./book-dress-fees.component.css']
})
export class BookDressFeesComponent {
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: BookAndDressFees[] = [];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  actionFlag = true;
  bookAndDressFeelModel: BookAndDressFees = new BookAndDressFees();

  formgroup = new FormGroup({
    id: new FormControl(),
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    bookFees: new FormControl(),
    // boyDressFees: new FormControl(),
    // girlDressFees: new FormControl(),
    active: new FormControl(),

  });

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    public validationMsg: ValidationErrorMessageService,
    private sweetAlertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router,
    private bookAndDressFeesService: BookAndDressFeesService,
    private alertService: SweetAlertService,
    
  ) {
  }

  //get student formcontroll
  get formgroupControll() {
    return this.formgroup.controls;
  }

  ngOnInit() {
    this.customInit();
    
  }

  customInit() {
    this.createBookAndDressForm(new BookAndDressFees());
    this.updateEditable();
    this.loadClass();
    this.loadTable();
    this.loadAcademicyear();
    this.getTableRecord();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createBookAndDressForm(bookAndDressFees: BookAndDressFees) {
    this.formgroup = this.formBuilder.group({
      id: [bookAndDressFees.id],
      standard: [bookAndDressFees.standard,[Validators.required]],
      academicYearCode: [bookAndDressFees.academicYearCode,[Validators.required]],
      bookFees: [bookAndDressFees.bookFees,[Validators.required, CustomValidation.amountValidation]],
      // boyDressFees: [bookAndDressFees.boyDressFees,[Validators.required, CustomValidation.amountValidation ]],
      // girlDressFees: [bookAndDressFees.girlDressFees,[Validators.required, CustomValidation.amountValidation ]],
      active: [bookAndDressFees.active, [Validators.required]]
     });
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


  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
    };
  }

  save(){
    this.bookAndDressFeelModel = { ...this.bookAndDressFeelModel, ...this.formgroup.value }
    try {
      this.bookAndDressFeesService.insertBookAndDressFees(this.bookAndDressFeelModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          this.getTableRecord();
          this.resetForm();
        }
        
      });
    } catch (error) { }
  }

  //To get Student List
  async getTableRecord() {
    
    this.bookAndDressFeesService.getAllBookAndDressFees().subscribe(res=>{
     if(res.status === msgTypes.SUCCESS_MESSAGE){
      if(res.data.length>0){
          this.posts = res.data;
          if(this.posts.length == 0){
            this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
          }
        }
      }
      })
  }

  resetForm() {
    this.createBookAndDressForm(new BookAndDressFees());
    this.getTableRecord();
    this.posts = [];
    this.actionFlag = true;
  }

  //set value in formfield to update
  setValueToUpdate(data: BookAndDressFees) {
    this.createBookAndDressForm(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.bookAndDressFeelModel = { ...this.bookAndDressFeelModel, ...this.formgroup.value }
    this.bookAndDressFeesService.insertBookAndDressFees(this.bookAndDressFeelModel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: BookAndDressFees) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.bookAndDressFeesService.insertBookAndDressFees(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }
}
