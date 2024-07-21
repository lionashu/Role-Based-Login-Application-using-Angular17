import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
 const service = inject(AuthServiceService);

 if(service.isLogedIn()){
  const userRole = service.getUserRole();

  console.log(route.data['role']);
  console.log(userRole);
  if(route.data['role'] && route.data['role'].indexOf(userRole)=== -1){
    alert('Access denied');
    return false;
  }else{
    return true;
  }
 }else{
  alert('User not logged in');
  router.navigate(['/login']);
  return false;
 }

};
