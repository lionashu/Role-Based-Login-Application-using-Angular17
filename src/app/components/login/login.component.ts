import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService:AuthServiceService,private formBuilder:FormBuilder,private router:Router, private snackbar:MatSnackBar){}

  loginForm = this.formBuilder.group({
    id:['', [Validators.required, Validators.minLength(5)]],
    password:['',[Validators.required, Validators.minLength(5)]]
  })

  confirmLogin(){
    if(this.loginForm.valid){
      const loginId = this.loginForm.value.id!;
      const loginPassword = this.loginForm.value.password!;
      this.authService.login(loginId, loginPassword).subscribe(
        (res)=>{
          if(res.success){
            this.router.navigate(['']);
          }else{
            console.log(res.message);
          }
        }
      ), (error:any)=>{
        console.log(error)
      }
    }
  }
}
