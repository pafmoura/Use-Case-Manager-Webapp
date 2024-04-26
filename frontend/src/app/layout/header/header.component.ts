import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthService;
  user : any = [];
  
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.loggedInInfo().subscribe((value) => {
      var temp: string = value.toString(); 
      this.user = JSON.parse(temp);
      this.user = this.user[0].fields;
    });
  }
}
