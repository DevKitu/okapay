import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
  // TODO: Use EventEmitter with form value
  console.log(this.userForm.value.userName);
  console.log(this.userForm.value.password);
  this.auth.login(this.userForm.value.userName,this.userForm.value.password );
}

loginWithGoogle() {
    this.auth.loginWithGoogle();
}

}
