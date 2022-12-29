import { Component, OnInit, Input, AfterContentInit, SimpleChanges } from '@angular/core';
import { getUser } from '../user-data';
import { mailGlobalVariable, mailService } from '../mail.service';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CorreosService } from '../services/correos.service';
import { Adjunto, BodyGt, CorreosGT, CuerpoGT, NomAdj } from '../interfaces/interfaces';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-maildetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  // tslint:disable-next-line: no-shadowed-variable
@Input() mensaje!: string ;
@Input() fromegt!: string;
@Input() sujeto!: string;
@Input() copymail!: string;
@Input() uid!: string;



mensajegt: string = "";



 
 

  constructor(
    public ms: mailGlobalVariable,
    public mailService: mailService,
    public router: Router,
    private correoservice: CorreosService
    
  ) {} 

  public config: PerfectScrollbarConfigInterface = {};
  adjuntos!: Adjunto[];
  adjunto!: string;
  datagt!: string;
 valoradj: number = 0;
 pruebasnomb!: NomAdj[];
 nombredelite!: string[];
  ngOnInit(): void {
    this.valoradj = 0;

    this.correoservice.adjunto(this.uid)
    .subscribe(resp => {
      console.log("ID DE BUSQUEDAS::: "+this.uid)
      if(resp.length<1)
      {
        this.adjuntos = [];
        this.adjunto = "";
        this.datagt = "";
        this.valoradj = 0; 
      }
      else{
        this.adjuntos = resp;
        this.adjunto = this.adjuntos[0].filename!;
        this.datagt = this.adjuntos[0].data!;
        this.valoradj = resp.length; 
      }
    

    })


  }

  downloadPdf(base64String: string, name: string) {
   base64String = base64String.replace('"','');
   console.log(base64String);
    const source = `data:application/;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${name}`
    link.click();
  }
  onClickDownloadPdf(data: string, name: string){
    let base64String = data;
    this.downloadPdf(data,name);
  }



  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  
    this.valoradj = 0;

    this.correoservice.adjunto(this.uid)
    .subscribe(resp => {
      this.adjuntos = resp;
      this.adjunto = this.adjuntos[0].filename!;
      this.datagt = this.adjuntos[0].data!;
      this.valoradj = resp.length; 

    })
  }

  iconsClick(name: string): void {
    if (this.ms.selectedMail) {
      if (name === 'Star') {
        if (this.ms.selectedMail.filter.indexOf('Star') !== -1) {
          this.ms.selectedMail.filter = this.ms.selectedMail.filter.filter((fil) => fil !== 'Star');
        } else {
          this.ms.selectedMail.filter.push('Star');
        }
      }
      if (name === 'Important') {
        if (this.ms.selectedMail.filter.indexOf('Important') !== -1) {
          this.ms.selectedMail.filter = this.ms.selectedMail.filter.filter(
            (fil) => fil !== 'Important',
          );
        } else {
          this.ms.selectedMail.filter.push('Important');
        }
      }
    }
  }

  resetCount(): void {

  }

  reply(): void {
    this.ms.replyShow = true;

  }

  sendButtonClick(): void {
    this.ms.replyShow = false;
    
    this.correoservice.sendEmail(this.fromegt,this.sujeto,this.mensajegt,this.pruebasnomb) 
    .subscribe(resp=>{
      
     
  
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: 'red',
      color: 'red',
      title: 'CORREO ENVIADO',
      showConfirmButton: false,
      timer: 1500
    })
    });

  }

  removeClass(): void {
    this.ms.addClass = false;
  }
}
