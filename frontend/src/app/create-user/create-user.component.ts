import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";
import { TitlebannerComponent } from "../layout/titlebanner/titlebanner.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-create-user',
    standalone: true,
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.css',
    imports: [HeaderComponent, TitlebannerComponent, CommonModule, ReactiveFormsModule, FormsModule]
})
export class CreateUserComponent {


    constructor(private authService : AuthService, private router : Router) { }
    isAdminSelected: boolean = true;

    trueIsAdminSelected() {
        this.isAdminSelected = true;
        this.createUserForm.get('company')?.disable();
        this.createUserForm.get('company')?.setValue('');
    }

    falseIsAdminSelected() {
        this.isAdminSelected = false;
        this.createUserForm.get('company')?.enable();

    }
    

    clients : any = [ ]
    clientNames : any = [ ]
    ngOnInit() {
        this.createUserForm.get('company')?.disable();

        this.authService.getClients().subscribe((data: any) => {
            this.clients = data
            console.log(data)

            this.clientNames = this.clients.map((client: any) => {
                return client.name;
            });


        });

    }

 user : any = {
    username: "",
    company: "",
    email: "",
    password: ""
 }

  createUserForm = new FormGroup({
    username: new FormControl(""),
    company: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")})

    get username() {
        return this.createUserForm.get('username');
    }

    get company() {
        return this.createUserForm.get('company');
    }

    get email() {
        return this.createUserForm.get('email');
    }

    get password() {
        return this.createUserForm.get('password');
    }


  createUser() {
 
const userData = {
    username: this.username!.value!,
    company: this.company!.value!,
    email: this.email!.value!,
    password: this.password!.value!
}


    this.authService.createUser(userData).subscribe((response) => {
      console.log(response);

        this.router.navigate(['/manage-users']);
    });

}



}
