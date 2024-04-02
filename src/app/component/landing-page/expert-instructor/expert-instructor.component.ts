import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpertInstructorDialogComponent } from '../expert-instructor-dialog/expert-instructor-dialog.component';
export interface DialogData {
  name: string;
  description: string
}

@Component({
  selector: 'app-expert-instructor',
  templateUrl: './expert-instructor.component.html',
  styleUrls: ['./expert-instructor.component.css']
})
export class ExpertInstructorComponent {

    name = '';
    description = '';

    CHAIRMAN_NAME= "CHAIRMAN (Mr. ASHOK MAURYA)"
    CHAIRMAN_DESCRIPTION=`Mr. Ashok Maurya, the visionary founder and chairman of TIME GLOBAL SCHOOL 
      He has always been providing strategic direction to the institution. He believes that
      every child has a unique set of attributes which needs nurturing.		
      Therefore, every child deserves an education that fosters academic excellence and 
      holistic development, with a promise for a bright future. He insists on a technology 
      enabled environment in school that facilitates the process of teaching and learning.`
    
    MANGINGDIRECTON_NAME= "MANGING DIRECTON (PRATEEK MAURYA)"
    MANGINGDIRECTON_DESCRIPTION= `I am delighted to welcome you to TIME GLOBAL SCHOOL.
      Our core aspiration is to provide an educational excellence, it that every student makes 
      A position difference during the time with us. In expecting excellence, we ensure that children 
      Enjoy school in a happy, safe and secure atmosphere designed to fulfil their potenical. 
      We also strive to provide a caring supportive and challenging environment to the children in which
      They can grow and flourish to the esteemed heights.
      
      Our school’s curriculum is carefully framed in such a way to deliver the quality education to the children.
      To meet the needs of high standard of education we incorporate the best and innovative practices of
      Education and technology together. Also, we know about the role of teacher in the welfare and progress 
      Of children. At Global, we recruited highly qualified teacher who ensues the development of the child 
      Academically and personality and to strengthen our vision and mission.
        
      TIME GLOBAL SCHOOL of fears and extraordinary opportunity both in scholastic and co – scholastic areas, 
      That encourage our children to develop their talents.`
    
    PRINCIPAL_NAME="PRINCIPAL’S DESK (DEEPIKA KUSHWAHA)"
    PRINCIPAL_DESCRIPTION= `TIME GLOBAL SCHOOL has a tremendous history of faith based educational excellence. At our campus we
      Aim to provide holistic approach to shape overall personality of child imbibed in the moral values.  
      Our school has a modern outlook based on the strong roots of our traditional culture.
      
      Students today are faced with challengers at every turn making it imperative for us to equip them with
      The skills and capabilities they need to achieve their goals and fulfil their dreams.
      
      The commitment to continuous improvement takes root in the vision and philosophy and value based 
      Society! Our pedagogy which is holistic and comprehensive, complements this. We have a team of fabulous
      Faculty members who display boundness energy and intense commitment which keep our school.
      
      The youth of today needs to be ready for a global stage. To make education a complete experience, 
      We encourage our children to take on responsibility and become the catalysts of change.     
      Every forward and never to look back is the spirit which invokes us and guides us throughout.`
    
    VICEPRINCIPAL_NAME="VICE-PRINCIPAL (MUDRIKA MAURYA)"
    VICEPRINCIPAL_DESCRIPTION=`We at TIME GLOBAL SCHOOL believe that education is a process of awakening individual potential to 
      Creative knowledge, but more importantly enlightening students with the wisdom that they must 
      “Never put a price tag on their heart and soul” A good career is paramount. The first step of the 
      Kid is like a raw material but after lost of effort nurture. Our students enriched with a sense of
      High morality and social responsibility will be makers of a virtuous society. In a world of stiff competition 
      Our part as educators to help children understand that predicament is common to everyone. 
      Problems and challenges need to be faced courageously with conviction in our principles and confidence
      In our inner strength and dreams.`
     

  

  constructor(public dialog: MatDialog){
  }

  openDialog(number: number): void {
    let data;
    if(number===1){
      this.name = this.CHAIRMAN_NAME;
      this.description = this.CHAIRMAN_DESCRIPTION;
    }
    if(number===2){
      this.name = this.MANGINGDIRECTON_NAME;
      this.description = this.MANGINGDIRECTON_DESCRIPTION;
    }
    if(number===3){
      this.name = this.PRINCIPAL_NAME;
      this.description = this.PRINCIPAL_DESCRIPTION;
    }
    if(number===4){
      this.name = this.VICEPRINCIPAL_NAME;
      this.description = this.VICEPRINCIPAL_DESCRIPTION;
    }
    const dialogRef = this.dialog.open(ExpertInstructorDialogComponent, {
      data: {name: this.name, description: this.description },
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
}
