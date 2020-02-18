import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import  {GlobalServiceService} from '../global-service.service';
import  {MessageService} from '../message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {
isButtonActive : boolean;
username :any;
accountType : any;
subscription: Subscription;

  constructor(private http:Http,
              private router: Router,private globalService : GlobalServiceService,
              private _message : MessageService) { 
    // this.isButtonActive = this.globalService.getUserStatus();
  }

  ngOnInit() {
  	var data = localStorage.getItem('logout');
  	if(data){
  		this.isButtonActive = true;
  	}else{
  		this.isButtonActive = false;
  	}
    this.username = this.globalService.getUser().first_name;
    this.subscription = this._message.getMessage().subscribe(message => {
      if(message.text){
        debugger
        this.isButtonActive = true;
        this.username = message.text.first_name;
      }
      else{
        this.isButtonActive = false;
      }
    })

    
  }

  logout(){
  	localStorage.clear();
    localStorage.removeItem('user');
    this._message.sendMessage('');
  	this.router.navigateByUrl('/login');
  }
   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  // openClasses(){
  //   this.router.navigateByUrl('/class');
  // }  

  // openSubject(){
  //   this.router.navigateByUrl('/subject');
  // }

  // openBoards(){
  //  this.router.navigateByUrl('/board'); 
  // }

  // openFormula(){
  //  this.router.navigateByUrl('/formula');  
  // }

  openCountry(){
    this.router.navigateByUrl('/country-capital');
  }
}
