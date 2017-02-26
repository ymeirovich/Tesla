import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { EtlDataService } from './shared/etl-data.service';
import { EditFormComponent } from './edit-form/edit-form.component';
import { MockBackendFactory } from './shared/mockBackendFactory';
import {ChatService} from './shared/chat.service';
import {WebSocketService} from './shared/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // MaterialModule.forRoot(),
    GridModule,
    ChartsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  providers: [
    //MockBackend,
    BaseRequestOptions,
    EtlDataService,
    ChatService,
    WebSocketService,
    // {
    //   provide: Http,
    //   deps: [MockBackend, BaseRequestOptions],
    //   useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
    //     return new Http(backend, options);
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
