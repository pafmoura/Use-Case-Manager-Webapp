import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TitlebannerComponent } from "../layout/titlebanner/titlebanner.component";
import { AuthService } from '../services/auth.service';
import { User } from '../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-manage-users',
    standalone: true,
    templateUrl: './manage-users.component.html',
    styleUrl: './manage-users.component.css',
    imports: [HeaderComponent, FormsModule, CommonModule, DatePipe, TitlebannerComponent, RouterModule]
})
export class ManageUsersComponent {

  constructor(private authService : AuthService) { }

  
  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';




  users : any = [ ]
  

  ngOnInit() {
    console.log('Manage Users Component');
    this.authService.getUsers().subscribe((data: any) => {
      this.users = data

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


    this.users.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }

  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  get filteredUsers() {
   return this.users.filter((u: any) => u.email.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

 

  
  

}
