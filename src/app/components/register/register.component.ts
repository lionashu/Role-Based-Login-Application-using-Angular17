import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService:AuthServiceService,private formBuilder:FormBuilder,private router:Router, private snackbar:MatSnackBar){}

  registrationForm = this.formBuilder.group(
    {
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      role: [''],
      isActive: [false],
    },
    { validator: this.ConfirmedValidator('password', 'confirmPassword') }
  );

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  confirmRegistration() {
    if (this.registrationForm.valid) {
      const { confirmPassword, ...userDetails } = this.registrationForm.value;
      this.authService.CreateUser(userDetails).subscribe((res) => {
        this.snackbar.open('User created successfully.', '', {
          duration: 3000,
        });
        this.router.navigate(['login']);
      });
    } else {
      console.log('invalid');
    }
  }
}
