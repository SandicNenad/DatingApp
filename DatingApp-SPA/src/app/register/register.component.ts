import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: FormGroup) {
    // tslint:disable-next-line: object-literal-key-quotes
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  // tslint:disable-next-line: typedef
  register() {
    // tslint:disable-next-line: deprecation
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('registration successful');
    // }, error => {
    //   this.alertify.error(error);
    // });

    console.log(this.registerForm.value);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    console.log('Canceled registration');
  }

}
