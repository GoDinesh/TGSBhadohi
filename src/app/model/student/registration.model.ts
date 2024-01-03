import { StudentFeesStructure } from "../fees/student-fees-structure.model";
import { FeesStructure } from "../master/fees-structure.model";
import { UploadedProfileImage } from "../master/uploaded-profile-image.model";

export class Registration {
        registrationId: string;

        rollNumber: number;
        studentName     : string;
        gender          : string;
        dateOfBirth     : string; 
        standard        : string; 
        section         : string; 
        academicYearCode: string; 
        aadhaarNumber   : string; 
        religion        : string; 
        category        : string;
        registrationNo  : string;

        fatherName      : string; 
        fatherAadharNo  : string;
        fatherContactNo : string 
        fatherQualification : string; 
        fatherProfession    : string; 
        fatherEmailId       : string; 
        motherName          : string; 
        motherAadharNumber  : string; 
        motherContactNumber : string;
        motherProfession    : string;
        guardianName        : string;

        country           : string; 
        state             : string; 
        city              : string; 
        pincode           : string; 
        area              : string; 

        emergencyContactPerson  : string; 
        emergencyNumber       : string; 

        profileImage: { id: number, fileName: string, link: string };
        documents: { id: number, fileName: string, link: string }[];


        schoolName            : string; 
        tcNumber              : string;   
        passedClass           : string; 
        passedClassMarks      : string; 
        schoolAddress         : string;

        studentFeesStructure: StudentFeesStructure[]= []

        isPromoted: boolean;
        isActive: boolean;
        isChecked: boolean;

        totalFees: number;
        paidFees: number;
        pendingFees: number;
        isTotalFeesPaid: boolean;
        

        constructor(){
            this.registrationId = '';
            this.rollNumber= 0;
            this.studentName     ='';
            this.gender          ='';
            this.dateOfBirth     =''; 
            this.standard        =''; 
            this.section         =''; 
            this.academicYearCode=''; 
            this.aadhaarNumber   =''; 
            this.religion        =''; 
            this.category        ='';
            this.registrationNo  ='';

            this.fatherName      = ''; 
            this.fatherAadharNo  = '';
            this.fatherContactNo = '';
            this.fatherQualification = ''; 
            this.fatherProfession    = ''; 
            this.fatherEmailId       = ''; 
            this.motherName          = ''; 
            this.motherAadharNumber  = ''; 
            this.motherContactNumber = '';
            this.motherProfession    = '';
            this.guardianName        = '';

            this.country           = ''; 
            this.state             = ''; 
            this.city              = ''; 
            this.pincode           = ''; 
            this.area              = ''; 

            this.emergencyContactPerson  = ''; 
            this.emergencyNumber       = ''; 

            this.schoolName            = ''; 
            this.tcNumber              = '';   
            this.passedClass           = ''; 
            this.passedClassMarks      = ''; 
            this.schoolAddress         = '';
            // this.profileImage          = new UploadedProfileImage();

            this.isPromoted = false;
            this.isActive = true;
            this.isChecked = false;

            this.totalFees = 0;
            this.paidFees = 0;
            this.pendingFees=0;
            this.isTotalFeesPaid = false;
        }
     
}
