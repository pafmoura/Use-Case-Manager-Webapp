import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";
import { TitlebannerComponent } from "../layout/titlebanner/titlebanner.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TagInputModule } from 'ngx-chips';


@Component({
    selector: 'app-manage-clients',
    standalone: true,
    templateUrl: './manage-clients.component.html',
    styleUrl: './manage-clients.component.css',
    imports: [TitlebannerComponent, HeaderComponent, FormsModule, CommonModule, RouterModule, ReactiveFormsModule, TagInputModule]
})
export class ManageClientsComponent {
  
  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  selectDelete: number = 9999999;

  clients : any = [ ]


constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.getClients().subscribe((data: any) => {
      this.clients = data

      console.log(data)
    
    });

    

  }

  deleteClient() {
    this.authService.deleteCompany(this.selectDelete).subscribe((response) => {
      console.log(response);

      this.authService.getClients().subscribe((data: any) => {
        this.clients = data
      });
    });


  }

  
  updateSelectDelete(id: number) {
    this.selectDelete = id;
  }


  client :any = {
    name: ""
  }

  createClientForm = new FormGroup({
    name: new FormControl(""),
    logsources: new FormControl(null)
   })

   get name() {
    return this.createClientForm.get('name');
}






createClient() {
  

  var logsourcesArray :any = this.createClientForm.get('logsources')?.value;

  var logsources = logsourcesArray?.map((logsource: any) => logsource.value);

const clientData = {
    name: this.name!.value!,
    logsources: logsources
  }

console.log(clientData);

this.authService.createClient(clientData).subscribe((response) => {
  console.log(response);
  this.clients.push(clientData);
  this.createClientForm.reset();

  

//sucess modal

});

}

  
  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.clients.sort((a: any, b: any) => {
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


  get filteredClients() {
   return this.clients.filter((u: any) => u.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

 

  
  

}


