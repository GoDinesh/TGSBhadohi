import { UploadedProfileImage } from "../master/uploaded-profile-image.model";

export class Registration {
        id: string;

        rollNumber: number;
        // studentInfo: StudentInfo;
        // parentInfo: ParentInfo;
        // addresInfo: AddressInfo;
        // emergencyContactInfo: EnergencyContactInfo;
        // previousSchoolInfo: PreviousSchoolInfo;
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

        profileImage: UploadedProfileImage;

        schoolName            : string; 
        tcNumber              : string;   
        passedClass           : string; 
        passedClassMarks      : string; 
        schoolAddress         : string;
        

        constructor(){
            this.id = '';
            this.rollNumber= 0;
            // this.studentInfo = new StudentInfo();
            // this.parentInfo = new ParentInfo();
            // this.addresInfo = new AddressInfo();
            // this.emergencyContactInfo = new EnergencyContactInfo();
            // this.previousSchoolInfo = new PreviousSchoolInfo();
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
        }
     
}
