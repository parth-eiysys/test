import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
declare var Web3  :any;
// import * as Web3 from 'web3';
declare var $: any;
declare let require: any;
declare let window: any;
import { ToasterContainerComponent, ToasterService} from 'angular2-toaster';


@Injectable()
    export class GlobalServiceService {
        public basePath: string;
        public companyDetails : any;
        private toasterService: ToasterService;
        user:any;
        userInfo: any;
        userType:any;
        public headers: Headers;
        public requestoptions: RequestOptions;
        public res: Response;
        private status : boolean = false;

      constructor(
                    public http: Http,
                    public router: Router,
                     toasterService:ToasterService
                   )
                    {
                       // this.basePath = "https://ecoach-backend.herokuapp.com/";
                     this.basePath = "http://localhost:9000/";
                     this.companyDetails = {
                       address : '0x10E92e0465c0C659391329eAB64a7B47710534e4',
                       ratio : 1
                     }
                      this.toasterService = toasterService;
                     }

    			   showNotification(message, type) {
    			        this.toasterService.clear();
    			         if(type==2){
    			          this.toasterService.pop('success', "", message);
    			         }
    			         if(type==4){
    			          this.toasterService.pop('error', "", message);
    			         }
    			    }



    	public getRequsetOptions(url: string): RequestOptions {
            let headers;
            if (localStorage.getItem('token')) {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                headers = new Headers();
                headers.append("Content-Type", "application/json");
                headers.append("token",this.userInfo.token);
            }
            else {
                 // this.consoleFun('Unautorized Request !');
                 }
            let requestoptions = new RequestOptions({
                method: RequestMethod.Get,
                url: url,
                headers: headers
            });
            return requestoptions;
        }



        public PostRequestUnautorized(url?: string, data?: any): any {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            let requestoptions = new RequestOptions({
                method: RequestMethod.Post,
                url: url,
                headers: headers,
                body: JSON.stringify(data)
            });

            return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res.json() }]
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
        }

        public PostRequest(url: string, data: any, flag?: any): any {
            var TOKEN=localStorage.getItem('token');
            let headers;
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("authorization","jwt "+TOKEN);
            this.requestoptions = new RequestOptions({
                method: RequestMethod.Post,
                url: url,
                headers: headers,
                body: JSON.stringify(data)
            })

            return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                if(res.status==200){
                   return [{ status: res.status, json: res }]
                }
            })
            .catch((error: any) => {
                if(error.status == 401){
                    localStorage.clear();
                    this.showNotification(error.json().err.object,4);
                    this.router.navigateByUrl('/login');
                }
                 if(error.status===0){
                   this.showNotification('No internet connection, Please try again!.',4);
               }
                return Observable.throw(error);
            });
        }

          public PutRequest(url: string, data: any, flag?: any): any {
            var TOKEN=localStorage.getItem('token');
            let headers;
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("authorization","jwt "+TOKEN);
            this.requestoptions = new RequestOptions({
                method: RequestMethod.Put,
                url: url,
                headers: headers,
                body: JSON.stringify(data)
            })

            return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                if(res.status==200){
                   return [{ status: res.status, json: res }]
                }
            })
            .catch((error: any) => {
                if(error.status == 401){
                    localStorage.clear();
                    this.showNotification(error.json().err.object,4);
                    this.router.navigateByUrl('/login');
                }
                 if(error.status===0){
                   this.showNotification('No internet connection, Please try again!.',4);
               }
                return Observable.throw(error);
            });
        }

        

        public GetRequest(url: string): any {
            return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    jsonObj = null;
                }
                else {
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 0)
                   // this.consoleFun('error here', error);
                return Observable.throw(error);
            });
        }



public logout(){
        //const url = this.basePath + "admin/logout" ;
        //let obj = {token:this.userInfo.token};
       // this.PostRequest(url,obj).subscribe(res => {
           // this.consoleFun(res[0].json.json());
             localStorage.clear();
            this.router.navigateByUrl('/login');
       // }, err => {
         //   this.consoleFun(err);
       // })
 }

  isLogedIn(){
       this.user=JSON.parse(localStorage.getItem('user'));
       if(this.user!=null||this.user!=undefined){
         return true;
       }{
           return false;
       }
   }

   getUser(){
     let data = localStorage.getItem('user');
     if(data){
       return JSON.parse(data);
     }else{
       return {};
     }
   }

   getCurrencies(){
     var currency = [{id : 1, name : 'INR'},{id :2, name :'USD'},{id:3, name:'AUD'}];
     return currency;
   }

    getPaymentTerms(){
     var currency = [{id : 1, name : '20% DEPOSIT IN ADVANCE'},{id :2, name :'PREPARED BY CHEQUE'},{id:3, name:'WIRE TRANSFER'},{id:4, name:'CREDIT CARD'},{id:5, name:'DUE ON RECEPIENT'}];
     return currency;
   }

   getDeliveryTerms(){
     var currency = [{id : 1, name : 'FOB ORIGIN'},{id :2, name :'FOB DESTINATION'}];
     return currency;
   }

    getShipmentTerms(){
     var currency = [{id : 1, name : 'AIR'},{id :2, name :'SEA'},{id:3, name:'ROAD'}];
     return currency;
   }
    getStatus(){
     var currency = [{id : 1, name : 'OPEN'},{id :2, name :'CLOSED'}];
     return currency;
   }

   getItems(){
     var items = [{code :'ITEM001', name:'ITEMAAA',UOM :'KG'},{code :'ITEM002', name:'ITEMBBB',UOM :'GRAMS'},{code :'ITEM003', name:'ITEMCC',UOM :'PCS'}];
     return items;
   }

  getEpochTime(date){
          return new Date(date).getTime();
  }

  getDate(){
      var currDate = new Date();
      let getCurrentDate = '';
      if(currDate.getDate() <= 9) getCurrentDate = '0'+currDate.getDate();
      else getCurrentDate = (currDate.getDate()).toString();
      let obj = { minDate : '', maxDate :''};
      obj.minDate = currDate.getFullYear()+'/'+(currDate.getMonth()+1)+'/'+getCurrentDate+', '+currDate.getHours()+':'+currDate.getMinutes()+' '+(currDate.getHours()>12 ? 'PM' : 'AM' );
      obj.maxDate = (currDate.getFullYear()+5)+'-'+(currDate.getMonth()+1)+'-'+getCurrentDate;
    return obj;
  }

public getUserStatus(){
  return this.status;
}

public setUserStatus(status){
  this.status = status;
}

}
