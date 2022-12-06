import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorreosGT } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(private http: HttpClient) { }

sendEmail(para: string, subj: string, mensaje: string){

  const body = {para,subj,mensaje};
   return this.http.post(`http://localhost:8080/enviar-correo/`,body) 
}

inbox(){

  return this.http.get<CorreosGT[]>(`http://localhost:8080/correo/agodoy@gestionadora.gt/12345`) 

}
 
body(uid: string){

  return this.http.get<CorreosGT[]>(`http://localhost:8080/obtener-correo/${uid}`) 

}
 

}
 