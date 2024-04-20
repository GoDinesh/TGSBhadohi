import { Fees } from "../fees/fees.model";
import { StudentFeesStructure } from "../fees/student-fees-structure.model";
import { FeesStructure } from "../master/fees-structure.model";
import { UploadedProfileImage } from "../master/uploaded-profile-image.model";

export class Registration {
        registrationId: string;

        rollNumber: number;
        studentName     : string;
        gender          : string;
        dateOfBirth     : string; 
        dateOfAdmission : string;
        standard        : string; 
        section         : string; 
        academicYearCode: string; 
        aadhaarNumber   : string; 
        religion        : string; 
        bloodGroup      : string;
        category        : string;
        registrationNo  : string;
        enrollmentType  : string; 
        idCardNumber    : string;

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
        discountAmount:number;
        isTotalFeesPaid: boolean;
        temp: string;
        bookFees: number;
        pendingBookFees: number;
        paidBookFees: number;
        isTotalBookFeesPaid: boolean;

        fees: Fees[]=[]
        

        constructor(){
            this.registrationId = '';
            this.rollNumber= 0;
            this.studentName     ='';
            this.gender          ='';
            this.dateOfBirth     =''; 
            this.dateOfAdmission = '';
            this.standard        =''; 
            this.section         =''; 
            this.academicYearCode=''; 
            this.aadhaarNumber   =''; 
            this.religion        =''; 
            this.bloodGroup      ='';
            this.category        ='';
            this.registrationNo  ='';
            this.idCardNumber    ='';

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
            this.discountAmount=0;
            this.isTotalFeesPaid = false;

            this.temp = ''
            this.bookFees = 0;
            this.pendingBookFees = 0;
            this.paidBookFees = 0;
            this.isTotalBookFeesPaid = false;
        }
     
}
