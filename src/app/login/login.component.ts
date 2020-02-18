declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import  {MessageService} from '../message.service';

import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm  : FormGroup;
  loading : boolean = false;
  companyForm :FormGroup;
  originalData : any [] = [];
  currentData : any;
  
  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,
              private _message : MessageService) { 
  }

  ngOnInit() {
  	// $('#myModal').modal({backdrop: 'static',
   //  keyboard: false}); 
      this.getData();
    }


 initSubjectForm(){
     this.companyForm= new FormGroup({
      first_name : new FormControl('', Validators.required),
      last_name : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      company_name : new FormControl('', Validators.required),
      license_start_date : new FormControl(''),
      license_end_date : new FormControl(''),
    })
  }

  close(){
  	$('#myModal1').modal('hide'); 
  	$('#myModal').modal('show'); 
  }

  loginFormInit(){
    this.loginForm= new FormGroup({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      // partytype : new FormControl('', Validators.required),
    });
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }

  login(){
  	 this.loading = true;
    let url = this.globalService.basePath+"user/login";

    if(this.loginForm.valid){
    this.globalService.PostRequestUnautorized(url,this.loginForm.value).subscribe(response=>{
      if(response[0].json.status==200){
        this.loading = false;
        this.globalService.setUserStatus(true);
        this._message.sendMessage(response[0].json.data);
        localStorage.setItem('user',JSON.stringify(response[0].json.data));
        localStorage.setItem('logout','yes');
        this.router.navigateByUrl('/users');
        $('#myModal').modal('hide');
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
	}else{
		this.globalService.showNotification('Please send details for login!.',4);
	}
  }

  register(){
    $('#myModal').modal('hide'); 
    $('#myModal1').modal('show'); 
     this.loading = true;
    let url = this.globalService.basePath+"user/registration";

    if(this.companyForm.value.company_name && this.companyForm.value.first_name){
      this.companyForm.value.password = "company@123";
      this.globalService.PostRequestUnautorized(url,this.companyForm.value).subscribe(response=>{
        if(response[0].json.status==200){
          this.loading = false;
          $('#myModal1').modal('hide');
          $('#myModal').modal('show');
          this.globalService.showNotification(response[0].json.message,2);
        }else{
          this.loading = false;
          this.globalService.showNotification(response[0].json.message,4);
        }
      });
    }else{
      this.globalService.showNotification('Please send details for registration!.',4);
    }

  }


 getData(){
     this.loading = true;
    let url = "https://hn.algolia.com/api/v1/search_by_date?tags=story";
      this.globalService.GetRequest(url).subscribe(response=>{
        if(response[0].json.hits){
          this.loading = false;
          this.originalData = response[0].json.hits;
        }else{
          this.loading = false;
          this.globalService.showNotification(response[0].json.message,4);
        }
      });
  
  }

openDialog(data){
  $('#myModal').modal('show'); 
  this.currentData = data;
}


}


