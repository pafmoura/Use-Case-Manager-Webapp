import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthService;
  user : any = {
    companies : [""],
  };


  
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  
  ngOnInit() {

   
    initFlowbite();
    this.authService.loggedInInfo().subscribe((value) => {
      var temp: string = value.toString(); 
      this.user = JSON.parse(temp);
      this.user = this.user[0].fields;

      if (this.user.companies == null) {
        this.user.companies = [];
      }

      console.log(this.user);
    });
  }
}
