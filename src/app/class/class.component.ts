import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  loading : boolean = false;
  companies : any[] = [];
  updateButton : boolean = false;
  companyForm :FormGroup;
  className : any;
  companyDetails : any;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getCompanyList();
    this.initSubjectForm();
  }

 initSubjectForm(){
     this.companyForm= new FormGroup({
      first_name : new FormControl('', Validators.required),
      last_name : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      company_name : new FormControl('', Validators.required),
      license_start_date : new FormControl('', Validators.required),
      license_end_date : new FormControl('', Validators.required),
    })
  }


  getCompanyList(){
  	this.loading = true;
    let url = this.globalService.basePath+"user/getCompanyList";
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.companies =response[0].json.data;;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deactivateComapny(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"user/deactivateCompany";
     this.globalService.PutRequest(url,{companyId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getCompanyList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  viewCompany(item,index){
    this.companyDetails = this.companies[index];
      this.companyForm.controls['first_name'].setValue(this.companyDetails.first_name);
      this.companyForm.controls['last_name'].setValue(this.companyDetails.last_name);
      this.companyForm.controls['email'].setValue(this.companyDetails.Email);
      this.companyForm.controls['company_name'].setValue(this.companyDetails.company_name);
      this.companyForm.controls['license_start_date'].setValue(this.companyDetails.license_start_date);
      this.companyForm.controls['license_end_date'].setValue(this.companyDetails.license_end_date);
     $('#myModal').modal('show');
  }

  updateCompany(){
     this.loading = true;
    let url = this.globalService.basePath+"user/editCompany";
    if(this.companyForm.valid){
     this.globalService.PutRequest(url,{companyId : this.companyDetails._id,license_start_date : this.companyForm.value.license_start_date,
       license_end_date : this.companyForm.value.license_end_date,value : this.companyForm.value}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getCompanyList();
        $('#myModal').modal('hide');
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
     }else{
       this.globalService.showNotification('Please fill form values!',4);
     }

  }


}
