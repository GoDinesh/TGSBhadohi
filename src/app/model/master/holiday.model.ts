export class Holiday {
  id: string;
	academicYearCode: string;
	name: string;
	startDate: string;
  endDate: string;
	type: string;
  active: boolean;

  constructor(){
        this.id = '';
        this.academicYearCode = '';
        this.name = '';
        this.type = '';
        this.startDate= "";
        this.endDate= "";
        this.active = false;
  }
}
