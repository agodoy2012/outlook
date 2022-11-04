import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(private http: HttpClient) { }

sendEmail(para: string, subj: string, mensaje: string){
  console.log(mensaje);
  const body = {para,subj,mensaje};
   return this.http.post(`http://localhost:8080/enviar-correo/`,body) 
}


}
 