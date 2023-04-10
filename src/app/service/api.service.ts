import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl='http://localhost:3000/enquiry'
  constructor( private http:HttpClient) { }
  postRegisterUser(registerObj:User){

    return this.http.post<User>(`${this.baseUrl}`,registerObj )

  }
  getRegisterUser(){
    return this.http.get<User[]>(`${this.baseUrl}`)
  }
 updateRegisterUser(registerObj:User,id:number){
    return this.http.put<User>(`${this.baseUrl}/${id}`,registerObj )
  }
  deleteRegister(id:number){
    return this.http.delete<User>(`${this.baseUrl}/${id}` )
  }
  getRegisterUserId(id:number){
    return this.http.get<User>(`${this.baseUrl}/${id}` )

  }
  // https://www.youtube.com/watch?v=PdLpeXd5plc&t=3626s
}
