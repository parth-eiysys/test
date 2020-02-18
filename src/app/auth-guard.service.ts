import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {GlobalServiceService} from './global-service.service';
declare var Web3  :any;
declare var $: any;
declare let require: any;
declare let window: any;

@Injectable()
export class AuthGuardService implements CanActivate {

  user : any;
  private _web3: any;

  obj : any = {
    currentAccount : '',
    currentBalance : ''
  }

  constructor(public router: Router, private global_service: GlobalServiceService){
  }

	canActivate(){
    return true;
    // console.log('Auth guard route::',this.global_service.isUserLoginWithMetamask());
    // if(this.global_service.isUserLoginWithMetamask()){
    //   return true;
    // }else{
    //   this.router.navigateByUrl('/welcome');
    //   return false;
    // }

	}
}
