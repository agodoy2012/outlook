import { Component, OnInit, Inject } from '@angular/core';

import { Category, mailbox } from './categories';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { mailGlobalVariable, mailService } from '../mail.service';

import { getUser } from '../user-data';


import Swal from 'sweetalert2'; 
import { mailboxList } from '../mailbox-data';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



import { Mailbox } from '../mailbox';

import { Router } from '@angular/router';
import { CorreosService } from '../services/correos.service';
import { BodyGt, CorreosGT, CuerpoGT, Adjunto, NomAdj, NomAdjEnv } from '../interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';





export interface DialogData {

  asunto: string;

  destino: string;

  mensaje: string;

}

@Component({



  selector: 'app-dialog-data-example-dialog',

  template: `

    <h3 class="m-t-0">Nuevo Correo</h3>

    <form class="basic-form">

      <div fxLayout="row" fxLayoutWrap="wrap">

        <!-- column -->

        <div fxFlex.gt-sm="50" fxFlex="50">

          <mat-form-field>

            <input matInput placeholder="Para:" type="email" [(ngModel)]="data.destino" name="email" />

          </mat-form-field>

        </div>

        <!-- column -->

        <div fxFlex.gt-sm="50" fxFlex="50">

          <mat-form-field>

            <input matInput placeholder="Asunto:" type="text"[(ngModel)]="data.asunto" name="asunto" />

          </mat-form-field>

        </div>

      </div>

      <div fxLayout="row" fxLayoutWrap="wrap">

        <!-- column -->

        <div fxFlex.gt-sm="100" fxFlex="100">

          <quill-editor [style]="{ height: '200px' }" [(ngModel)]="data.mensaje" name="mensaje"></quill-editor>

        </div>

      </div>

      <div fxLayout="row" fxLayoutWrap="wrap">

        <!-- column -->
      


        <div fxFlex.gt-sm="50" fxFlex="50" class="mini-spacer">

          <button mat-raised-button (click)="onNoClick()"  >ENVIAR</button>

         

        </div>
        
        <div fxFlex.gt-sm="50" fxFlex="50" class="mini-spacer" style="text-align: right;">
        <input type="file" (change)="basicUpload($event.target.files)" name="file" id="file-5" class="inputfile inputfile-5"  multiple />
       
        <label for="file-5">
                                <figure>
                                <svg xmlns="http://www.w3.org/2000/svg" class="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                </figure>
                              
                                <span class="iborrainputfile">Seleccionar archivo</span>
                                </label>
                                
                            </div>
      </div>

    </form>

  `,

})    

export class ListingDialogDataExampleDialogComponent {
  fileSelected: any;
  nameFileToUpload: any;
  message!: string;
  show!: boolean;
  formData: any;
  nombres!: NomAdjEnv[];
  nombresdelet!: string;
  nombreobj: string="";
  datnomb!: string;
  obj2!: string;


  

  constructor(

    public dialogRef: MatDialogRef<ListingDialogDataExampleDialogComponent>, private correoservice: CorreosService,private http: HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    pruebasnomb: NomAdj[] = [{"filename":'',"path":''}];
    validate(files: any): void {
      this.fileSelected = files;
     

    }
  validateExtension(extension: any) {
    throw new Error('Method not implemented.');
  }
      

  basicUpload(files: File[]){
    
    //this.correoservice.updad(files,'nombre').subscribe(resp=>{
      var formData = new FormData();
     
      Array.from(files).forEach(f => formData.append('file', f))
   
      console.log(formData)
    this.correoservice.updad(formData,'nombre').subscribe(resp=>{
        this.nombres = resp;
        
       for(let sum = 0; sum < this.nombres.length;){

        if(sum<1)
        {
          this.nombreobj = this.nombres[sum].path!;
        }
        else{
          this.nombreobj = this.nombreobj+"/"+this.nombres[sum].path;
        }
        sum++;
       }
     
        
 
    })
  
 
    
  }
  onNoClick(): void {
    
    //this.pruebasnomb =[{filename: "poel2.jpeg",path: "./poel2.jpeg"},{filename: "2993E67D-E966-4793-97CD-3E3FA40DF8F5.pdf",path: "./2993E67D-E966-4793-97CD-3E3FA40DF8F5.pdf"}];

    this.correoservice.sendEmail(this.data.destino,this.data.asunto,this.data.mensaje,this.nombres)
    .subscribe(resp=>{
      
   
    this.correoservice.updadelet(this.nombreobj).subscribe(resp=>{

    })
   
     
    this.dialogRef.close()
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

 

 this.correoservice.inbox()
 .subscribe(resps=>{



 })



  }

  enviocorreo(){
 
  }

}



@Component({

  selector: 'app-listing',

  templateUrl: './listing.component.html',

  styleUrls: ['./listing.component.css'],

})

export class ListingComponent implements OnInit {

  correos:CorreosGT[] = [];
  cuerpobody!:CuerpoGT[];
  bodygt!: BodyGt[];
  adjuntos!: Adjunto[];
  adjunto!: string;
  datagt!: string;
  mensaje!: string; 
  sujeto!: string;
  bodycorreo: boolean = false;
  uid: string = ""; 
  fromgt: string = "";
  copymail!: string;

  asunto!: string;

  destino!: string;

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);



  public config: PerfectScrollbarConfigInterface = {};



  sidePanelOpened = true;

  displayMode = 'default';

  p = 1;

  mailboxes: Category[] = mailbox;





  constructor(

    public ms: mailGlobalVariable,

    // tslint:disable-next-line: no-shadowed-variable
    private correoservice: CorreosService,
    public mailService: mailService,

    public router: Router,

    public dialog: MatDialog,

  ) {

    if (this.ms.type === null || this.ms.type === '' || this.ms.type === undefined) {

      this.router.navigate(['apps/mailbox/inbox']);

    }

    this.ms.type = 'inbox';

  }



  isOver(): boolean {

    return this.mediaMatcher.matches;

  } 

  ngOnInit(): void {


    
    this.ms.inboxList = this.mailService.getInbox();

    
    
   this.correoservice.inbox()
   .subscribe(resp =>{
    this.correos = resp; 
    
   })
 







   


    this.ms.mailList = this.ms.inboxList;

    this.ms.collectionSize = this.ms.mailList.length;



    for (const mail of this.ms.inboxList) {

      const User = getUser(mail.fromId);

      if (User !== null) {

        this.ms.users.push(User);

      }

    }



    this.ms.topLable = 'Inbox';

    this.ms.global();

  }



  mailSelected(mail1: CorreosGT): void {



     
    
    
    
    this.uid = mail1.uid?.toString()!;
    this.fromgt = mail1.from!;
    this.copymail = mail1.CC!;

   
    this.cuerpo(this.uid)
    
   
    
    this.bodycorreo = true

  
   
  
   

;

   
    localStorage.setItem('uid',this.uid );// grabar en local token



   



    if (this.ms.type === 'Bandeja de entrada') {

      this.router.navigate(['apps/mailbox/Bandeja de entrada', mail1.subject]);

    }



    if (this.ms.type === 'sent') {

      this.router.navigate(['apps/mailbox/sent', mail1.subject]);

    }
 


  

    if (this.ms.type === 'prueba') {

      this.router.navigate(['apps/mailbox/spam', mail1.subject]);

    }



    if (this.ms.type === 'trash') {

      this.router.navigate(['apps/mailbox/trash', mail1.subject]);

    }



  

  }

   cuerpo(uid: string){

 
  this.correoservice.body(this.uid)
    .subscribe(resp =>{
    
      this.bodygt = resp;
      this.mensaje = this.bodygt[0].html?.toString()!;
      this.sujeto = this.bodygt[0].subject!;
      
    
    
    })
  

  }

  // tslint:disable-next-line: typedef

  mailboxesChanged(type: string): void {

    if (type === 'Bandeja de entrada') {

      this.ms.mailList = this.ms.inboxList;

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.inboxList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Inbox';

      this.mailActiveClass(type);

      this.ms.type = 'inbox';

      this.router.navigate(['apps/mailbox/Bandeja de entrada']);

    } else if (type === 'Spam') {
     

      this.ms.mailList = this.ms.sentList;

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.sentList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Spam';

      this.mailActiveClass(type);

      this.ms.type = 'spam';

      this.router.navigate(['apps/mailbox/spam']);

    } else if (type === 'Draft') {

      this.ms.mailList = this.ms.draftList;

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.draftList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Draft';

      this.mailActiveClass(type);

      this.ms.type = 'draft';

      this.router.navigate(['apps/mailbox/draft']);

    } else if (type === 'Spam') {

      this.ms.mailList = this.ms.spamList;

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.spamList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Spam';

      this.mailActiveClass(type);

      this.ms.type = 'spam';

      this.router.navigate(['apps/mailbox/spam']);

    } else if (type === 'Trash') {

      this.ms.mailList = this.ms.trashList;

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.trashList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Trash';

      this.mailActiveClass(type);

      this.ms.type = 'trash';

      this.router.navigate(['apps/mailbox/trash']);

    }

  }



  mailActiveClass(type: string): void {

 







    for (const mail of mailbox) {

      mail.active = false;

    }

    // tslint:disable-next-line: no-non-null-assertion

    mailbox.find((m) => m.name === type)!.active = true;

  }



  filtersClick(type: string): void {

    if (type === 'Star') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        for (const fil of mail.filter) {

          if (fil === 'Star') {

            this.ms.mailList.push(mail);

          }

        }

      }

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.topLable = 'Starred';

      this.ms.selectedMail = null;



      this.ms.type = 'star';

      this.router.navigate(['apps/mailbox/star']);

    } else if (type === 'Important') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        for (const fil of mail.filter) {

          if (fil === 'Important') {

            this.ms.mailList.push(mail);

          }

        }

      }

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.topLable = 'Important';

      this.ms.selectedMail = null;

  

      this.ms.type = 'important';

      this.router.navigate(['apps/mailbox/important']);

    }

  }







  labelChange(type: string): void {

    if (type === 'Personal') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        // tslint:disable-next-line: no-shadowed-variable

        for (const label of mail.label) {

          if (label === 'Personal') {

            this.ms.mailList.push(mail);

          }

        }

      }



      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }

      this.labelActiveClass(type);

      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Personal';

      this.ms.type = 'Personal';

      this.router.navigate(['apps/mailbox/personal']);

    } else if (type === 'Work') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        // tslint:disable-next-line: no-shadowed-variable

        for (const label of mail.label) {

          if (label === 'Work') {

            this.ms.mailList.push(mail);

          }

        }

      }

 

      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }



      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Work';

      this.labelActiveClass(type);

      this.ms.type = 'Work';

      this.router.navigate(['apps/mailbox/work']);

    } else if (type === 'Payments') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        // tslint:disable-next-line: no-shadowed-variable

        for (const label of mail.label) {

          if (label === 'Payment') {

            this.ms.mailList.push(mail);

          }

        }

      }



      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }



      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Payments';

      this.labelActiveClass(type);

      this.ms.type = 'Payment';

      this.router.navigate(['apps/mailbox/payments']);

    } else if (type === 'Accounts') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        // tslint:disable-next-line: no-shadowed-variable

        for (const label of mail.label) {

          if (label === 'Account') {

            this.ms.mailList.push(mail);

          }

        }

      }



      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }



      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Accounts';

      this.labelActiveClass(type);

      this.ms.type = 'Account';

      this.router.navigate(['apps/mailbox/accounts']);

    } else if (type === 'Invoice') {

      this.ms.mailList = [];



      for (const mail of mailboxList) {

        // tslint:disable-next-line: no-shadowed-variable

        for (const label of mail.label) {

          if (label === 'Invoice') {

            this.ms.mailList.push(mail);

          }

        }

      }



      this.ms.users = [];

      for (const mail of this.ms.mailList) {

        const User = getUser(mail.fromId);

        if (User !== null) {

          this.ms.users.push(User);

        }

      }



      this.ms.collectionSize = this.ms.mailList.length;

      this.ms.selectedMail = null;

      this.ms.topLable = 'Invoices';

      this.labelActiveClass(type);

      this.ms.type = 'Invoice';

      this.router.navigate(['apps/mailbox/invoices']);

    } else if (type === 'Forums') {

    }

  } 



  labelActiveClass(type: string): void {

   





    for (const mail of mailbox) {

      mail.active = false;

    }



   

  }



  // Compose button

  openDialog(): void {

    const dialogRef = this.dialog.open(ListingDialogDataExampleDialogComponent, {



      data: {asunto: this.asunto, destino: this.destino}

    });

    dialogRef.afterClosed().subscribe((result) => {

   

      console.log(`Dialog result: ${result}`);

    });

  }



}

 