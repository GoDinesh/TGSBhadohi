import { TimeTableDetails } from "./time-table-details.model";

export class TimeTable {
      timeTableId: number;
      timeTableDetails: TimeTableDetails[];
      standard: string;
      academicYearCode: string;
      active: boolean;

      constructor() {
        this.timeTableId = 0;
        this.standard = '';
        this.academicYearCode = '';
        this.timeTableDetails = [];
        this.active = true;
      }
}
