import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsecasesService } from '../../services/usecases.service';
import { Modal } from 'flowbite';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-manage-use-cases',
    standalone: true,
    templateUrl: './manage-use-cases.component.html',
    styleUrl: './manage-use-cases.component.css',
    imports: [TitlebannerComponent, HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterModule, MatFormFieldModule, MatSelectModule, MatIconModule]
})
export class ManageUseCasesComponent {
selectedValues: any;


  constructor(private useCasesService : UsecasesService) { }

  selectedFilter : any;
  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  selectDelete:  number = 999999;

  updateSelectDelete(event: Event, id: number) {
    event.stopPropagation();
    console.log(id)
    this.selectDelete = id;
  }




  tactics = ["Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection", 
  "Command and Control",
  "Exfiltration",
  "Impact"];

  useCases : any = [ ]
  
  selectedTactics: any = [];

  ngOnInit() {

    this.useCasesService.getUseCases().subscribe((data: any) => {
      this.useCases = data

      console.log(data)
    
    
    });
    }
  



  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.useCases.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }

  updateSelectedTactics(){

   
    
    
console.log(this.selectedTactics)
  }

  deleteUseCase() {
console.log("deleteUseCase")
    console.log(this.selectDelete)
this.useCasesService.deleteUseCase(this.selectDelete).subscribe((data: any) => {

  this.useCases = this.useCases.filter((u: any) => u.id !== this.selectDelete);
});
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  get filteredUseCases() {
   return this.useCases.filter((u: any) => u.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }


  @ViewChild('modal') modal!: ElementRef<HTMLElement>;
  modalFlowbite!: Modal;

  ngAfterViewInit() {
    this.modalFlowbite = new Modal(this.modal.nativeElement);
  }

  openModal() {
    this.modalFlowbite.show();
  }

  closeModal() {
    this.modalFlowbite.hide();
  }


 

  
  

}



