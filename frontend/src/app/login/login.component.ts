import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  otpForm = new FormGroup({
    otp: new FormControl('', Validators.required),
  });
  hideLoading = true;
  showOTPForm = false;
  email = '';

  @ViewChild('errorDialog') errorDialog!: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.hideLoading = false;
    this.authService
      .login(this.userForm.value['email']!, this.userForm.value['password']!)
      .subscribe((otpSent) => {
        this.hideLoading = true;
        if (otpSent) {
          this.showOTPForm = true;
          this.email = this.userForm.value['email']!;
        } else {
          this.dialog.open(this.errorDialog);
        }
      });
  }

  onSubmitOTP() {
    this.hideLoading = false;
    this.authService
      .verifyOTP(this.email, this.otpForm.value['otp']!)
      .subscribe((verified) => {
        this.hideLoading = true;
        if (verified) {
          this.router.navigate(['home']);
        } else {
          this.dialog.open(this.errorDialog);
        }
      });
  }
}
