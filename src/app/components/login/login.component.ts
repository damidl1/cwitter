import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {


  loginForm = this.fb.group({
    username:[''],
    email:[''],
    password:['']
  })

  constructor(private fb: FormBuilder, private authServ: AuthService){}

  onSubmit(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authServ.login(email!, password!);
  }

}
