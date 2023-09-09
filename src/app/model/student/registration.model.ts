import { AddressInfo } from "./address-info.model";
import { EnergencyContactInfo } from "./energency-contact-info.model";
import { ParentInfo } from "./parent-info.model";
import { PreviousSchoolInfo } from "./previous-school-info.model";
import { StudentInfo } from "./student-info.model";

export class Registration {

        studentInfo: StudentInfo;
        parentInfo: ParentInfo;
        addresInfo: AddressInfo;
        emergencyContactInfo: EnergencyContactInfo;
        previousSchoolInfo: PreviousSchoolInfo;

        constructor(){
            this.studentInfo = new StudentInfo();
            this.parentInfo = new ParentInfo();
            this.addresInfo = new AddressInfo();
            this.emergencyContactInfo = new EnergencyContactInfo();
            this.previousSchoolInfo = new PreviousSchoolInfo();
        }
     
}
