import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adjunto, BodyGt, CorreosGT, NomAdj, NomAdjEnv } from '../interfaces/interfaces';
import { U } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(private http: HttpClient) { }

sendEmail(para: string, subj: string, mensaje: string, nomadj: NomAdj[]){

  const body = {para,subj,mensaje,nomadj};
   return this.http.post(`http://localhost:8080/enviar-correo/`,body) 
}

inbox(){

  return this.http.get<CorreosGT[]>(`http://localhost:8080/correo/agodoy@gestionadora.gt/12345`) 

}
 
body(uid: string){
  
  return this.http.get<BodyGt[]>(`http://localhost:8080/obtener-correo/${uid}`) 

}
adjunto(uid: string){
  var url = this.http.get<Adjunto[]>(`http://localhost:8080/obtener-adjunto/${uid}`) 
  
  return  url

}
updad(adj: any, nombre:string)
{
 
  const body ={adj, nombre}
  return this.http.post<NomAdjEnv[]>(`http://localhost:8080/upload`,adj) 
  
  
}
updadelet(nombre:string)
{
 
  const body ={nombre};
  console.log("correos.services:"+nombre)
  return this.http.post(`http://localhost:8080/upload-delete/`,body) 
  
  
}
 

}
 
