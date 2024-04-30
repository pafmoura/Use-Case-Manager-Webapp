import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-manage-use-cases',
    standalone: true,
    templateUrl: './manage-use-cases.component.html',
    styleUrl: './manage-use-cases.component.css',
    imports: [TitlebannerComponent, HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterModule]
})
export class ManageUseCasesComponent {


  constructor(private authService : AuthService) { }

  
  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  selectDelete:  number = 999999;

  updateSelectDelete(id: number) {
    this.selectDelete = id;
  }




  useCases : any = [ ]
  

  ngOnInit() {
    this.authService.getUsers().subscribe((data: any) => {
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

  deleteUser() {

    this.authService.deleteUser(this.selectDelete).subscribe(() => {
      
      this.authService.getUsers().subscribe((data: any) => {
        this.useCases = data
      });
    });
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  get filteredUsers() {
   return this.useCases.filter((u: any) => u.email.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

 

  
  

}



