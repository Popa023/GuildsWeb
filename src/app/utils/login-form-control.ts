import {FormControl, Validators} from '@angular/forms';

export class LoginFormControl {
  static emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  static nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  static passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
}
