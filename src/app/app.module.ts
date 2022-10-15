import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getCookie } from 'src/helpers/cookie-utils';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { AdminService } from '../services/admin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorInterceptor } from 'src/helpers/error.interceptor';
import { UserAuth } from 'src/auth-guards/user-auth';
import { DynamicTableModule } from './dynamic-table/dynamic-table.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return getCookie("access_token")!;
        },
        allowedDomains: [
          "http://localhost:4200",
          "localhost:4200",
          "http://localhost:3000",
          "localhost:3000",
        
        ],
      },
    }),
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthService,
    StorageService,
    AdminService,
    UserAuth,
    DynamicTableModule,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (toast: ToastrService, spinner: NgxSpinnerService, router: Router) {
        return new ErrorInterceptor(toast, spinner, router);
      },
      multi: true,
      deps: [ToastrService, NgxSpinnerService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
