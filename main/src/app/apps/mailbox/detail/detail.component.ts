import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { getUser } from '../user-data';
import { mailGlobalVariable, mailService } from '../mail.service';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CorreosService } from '../services/correos.service';
import { BodyGt, CorreosGT, CuerpoGT } from '../interfaces/interfaces';

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

 
 

  constructor(
    public ms: mailGlobalVariable,
    public mailService: mailService,
    public router: Router,
    private correoservice: CorreosService
  ) {}

  public config: PerfectScrollbarConfigInterface = {};


  ngOnInit(): void {
   
    console.log(this.mensaje);
  }
  ngAfterContentInit() {
    console.log("cambios")
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
  console.log("pruebas")
  }

  reply(): void {
    this.ms.replyShow = true;
  }

  sendButtonClick(): void {
    this.ms.replyShow = false;
  }

  removeClass(): void {
    this.ms.addClass = false;
  }
}
