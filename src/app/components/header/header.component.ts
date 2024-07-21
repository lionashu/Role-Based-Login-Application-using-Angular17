import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit , OnDestroy{
isLoggedIn :boolean = false;
private loginStatusSubscription:Subscription |undefined;
  constructor(private authService:AuthServiceService, private router:Router){

    console.log(this.isLoggedIn);
  }

  logout(){
    console.log('Logout Initiated')
    this.authService.logOut().subscribe({next:()=>{
      this.router.navigate(['/home']);
    },error:(err)=>{
      console.log('Logout Failed',err)
    }
  });
  }

  ngOnInit(): void {
    this.loginStatusSubscription = this.authService.loginStatus$.subscribe((isLoggedIn)=>{
      this.isLoggedIn  = isLoggedIn;
      console.log('Login Status Updated:', this.isLoggedIn)
    })
  }

  ngOnDestroy(): void {
 this.loginStatusSubscription?.unsubscribe();
  }
}
