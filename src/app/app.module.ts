import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuardService} from './auth-guard.service';
import { GlobalServiceService }  from   './global-service.service';
import { MessageService }  from   './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { AgGridModule } from 'ag-grid-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { ClassComponent } from './class/class.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ClassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    AgGridModule.withComponents(null),
    NgbModule.forRoot(),
    ToasterModule.forRoot(),
  ],
  providers: [ToasterService,AuthGuardService,GlobalServiceService,MessageService,AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
