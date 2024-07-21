import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, throwError } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  apiUrl="http://localhost:3000/users";

  private loginStatusSubject= new Subject<boolean>();
  loginStatus$ = this.loginStatusSubject.asObservable();

  updateLoginStatus(isLogedIn:boolean){
    this.loginStatusSubject.next(isLogedIn)
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError((error:any)=>{
      return throwError('User Not Found.!');
    }));
  }
  CreateUser(userData:User){
    return this.http.post<User>(this.apiUrl,userData);
  }
  updateUser(id:any, userData:any){
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }
  deleteUser(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  isLogedIn(){
    return sessionStorage.getItem('username') !==null;
  }

  getUserRole(){
    const role = sessionStorage.getItem('userrole');
    return role !== null ?role.toString():'';
  }
  login(id:string , password:string):Observable<any>{
    return this.getUserById(id).pipe(
      map((res:any)=>{
        if(res && res.password === password && res.isActive){
          sessionStorage.setItem('username', res.id);
          sessionStorage.setItem('userrole', res.role);
          this.updateLoginStatus(true)// Emit login Event
          return {success:true, role:res.role};
        }else{
          return{
            success:false,
            message:'invalid Credential or User Inactive'
          }
        }
      })
       , catchError((error:any)=>{
        return throwError('User Not Found !')
       })
    )
  }

  logOut():Observable<any>{
    console.log('session' , sessionStorage);
    this.updateLoginStatus(false); //emit logout event
    sessionStorage.clear();
    return of({success:true, role:''})
  }
}
