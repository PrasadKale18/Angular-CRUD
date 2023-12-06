import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient){ }


  adduser(user:any){
   return this.http.post('http://localhost:3000/posts',user)
  }

  getuser(){
    return this.http.get('http://localhost:3000/posts')
  }

  deleteuser(id:any){
     return  this.http.delete('http://localhost:3000/posts/'+id)
  }
  
  updateuser(user:any,id:any){
    return this.http.put('http://localhost:3000/posts/'+id,user)
  }

 
}
