import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { deleteCookie } from './cookie-utils';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toast: ToastrService, private spinner: NgxSpinnerService , private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.spinner.hide();
            if (err.status != null && err.status === 401) {
                this.toast.error("Session Expired");
                this.spinner.hide();
                window.location.href = '/auth';
                deleteCookie('current_session');
            }
            return throwError(err);
        }));
    }
}
