import { Component,Compiler } from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import {GlobalServiceService} from './global-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tradelink';
  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 2000
    });

  constructor(private _compiler: Compiler,private globalService : GlobalServiceService, private route: ActivatedRoute,
              private router: Router,
              private http:Http){
    this._compiler.clearCache();
    // localStorage.clear();
    if(this.globalService.getUser().hasOwnProperty('first_name')){
      this.router.navigateByUrl('/users');
    }else{
      console.log('user not login')
      this.router.navigateByUrl('/login');
    }

  }
}


