import { SyllabusSubjectDetails } from "./syllabus-subject-details.model";

export class Syllabus {

  syllabusId: number;
  syllabusSubjectDetails: SyllabusSubjectDetails[];
  standard: string;
  academicYearCode: string;

  constructor() {
    this.syllabusId = 0;
    this.standard = '';
    this.academicYearCode = '';
    this.syllabusSubjectDetails = [];
  }
}
