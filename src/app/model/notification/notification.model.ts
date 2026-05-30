export class Notifications {
  notificationId: number;
  isReaded: boolean;
  notificationType: string;
  notificationTitle: string;
  notificationMessage: string;
  createdAt: string;
  studentName: string;
  standard: string;
  academicYearCode: string;
  registrationNo: string;
  extraData: {
    [key: string]: any;
  };

    constructor(){
        this.notificationId=0;
        this.isReaded=false;
        this.notificationType='';
        this.notificationTitle='';
        this.notificationMessage='';
        this.createdAt=new Date().toISOString();
        this.studentName='';
        this.standard='';
        this.academicYearCode='';
        this.registrationNo='';
        this.extraData={};
    }

}

