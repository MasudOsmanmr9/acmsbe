import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'src/helpers/cookie-utils';


@Injectable()
export class UserAuth implements CanActivate {
  constructor(
    private router: Router,
    private toast: ToastrService,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (getCookie('current_session')) {
      return true
    } else {
      this.toast.info("Please sign in");
      await this.router.navigate(['auth'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
