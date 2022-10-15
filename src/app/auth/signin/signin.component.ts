import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signInForm!: FormGroup;

  userNameError = false;
  passwordError = false;
  screenSize = 0;
  returnUrl = "";
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signInForm = this._fb.group({
      useremail: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      userpassword: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      remember: [],
    });

    this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  resizeScreen(event?: any) {
    this.screenSize = window.innerWidth;
  }

  async signin() {
    try {
      console.log('this.signInForm.value', this.signInForm.value, this.signInForm.valid);
      this.submitted = true;
      if (this.signInForm.invalid) {
        return;
      }

      this.spinner.show();
      let res = await this.authService.login(this.signInForm.value.useremail, this.signInForm.value.userpassword, this.signInForm.value.remember)
      this.spinner.hide();
      if (res.Success) {
        this.toast.success("Logged in");
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.toast.error(res.Message);
      }
    } catch (e: any) {
      this.spinner.hide();
      this.toast.error(e);
    }
  }

}
