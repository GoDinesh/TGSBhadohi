import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent {

  displayedColumns = ["sNo","academicYearCode","academicYear","active"];
  academicYearmodel: AcademicYear = new  AcademicYear();
  dataSource = new MatTableDataSource < AcademicYear > ();
  dtOptions: any = {};
  posts: Observable<AcademicYear[]> = new Observable();
  actionFlag = true;
  
  formgroup = new FormGroup({
      id: new FormControl(),
      academicYearCode: new FormControl(),
      academicYear: new FormControl(),
      active: new FormControl(),
  });

  //Constructor
  constructor( private formBuilder: FormBuilder,
      public validationMsg: ValidationErrorMessageService,
      private academicYearService: AcademicYearService,
      private alertService: SweetAlertService){
  }
  //load ngOnInit
  ngOnInit(){
    this.createForm(new AcademicYear());
    this.customInit();
    this.loadTable();
  }

  async customInit(){
    await this.getTableRecord();
  }

  createForm(academicYear: AcademicYear) {
      this.formgroup = this.formBuilder.group({
            id: [academicYear.id],
            academicYearCode: [academicYear.academicYearCode,[Validators.required, Validators.minLength(8), Validators.maxLength(8), CustomValidation.alphanumaric]],
            academicYear: [academicYear.academicYear,[Validators.required, Validators.minLength(9), Validators.maxLength(9), CustomValidation.academicYear]],
            active: [academicYear.active,[Validators.required]]
      });
  }

  //load the table
  loadTable(){
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
    };
  }

  //get formcontroll
  get formControll(){
    return this.formgroup.controls;
  }

  async getTableRecord(){
    this.posts = this.academicYearService.getAllAcademicYear().pipe(
      map((res)=>{
          return res.data;
      })
  )};

  save(){
    this.academicYearmodel = {...this.academicYearmodel,...this.formgroup.value}
    try{
            this.academicYearService.insertAcademicYear(this.academicYearmodel).subscribe(res=>{
              if(res.status === msgTypes.SUCCESS_MESSAGE){
                this.getTableRecord();
              }
              this.resetForm();
            });
      }catch(error){}
  }

  resetForm(){
    this.createForm(new AcademicYear())
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data:AcademicYear) {
    const flag = await this.alertService.updateAlert()
    if(flag)  {
          data.active = !data.active;
          this.academicYearService.insertAcademicYear(data).subscribe();
    }else{
          element.source.checked = data.active;
    }
  }
  
  //set value in formfield to update
  setValueToUpdate(data:AcademicYear){
      this.createForm(data);
      this.actionFlag = false;
  }

  //update the record
  update(){
      this.academicYearmodel = {...this.academicYearmodel,...this.formgroup.value}
      this.academicYearService.insertAcademicYear(this.academicYearmodel).subscribe((res)=>{
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.getTableRecord();
          this.resetForm();
        }
      });
  } 
}

