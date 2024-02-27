import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../servicios/auth.services';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
  {
    validators: passwordMatchValidator
  }
  );
  mensaje: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {
  }

  get name(){
    return this.registerForm.controls['name'];
  }

  get email(){
    return this.registerForm.controls['email']
  }

  get password(){
    return this.registerForm.controls['password']
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword']
  }

  enviarRegistro(){
    //console.log(this.registerForm.value);
    const data = {...this.registerForm.value};

    delete data.confirmPassword;

    this.authService.registerUser(data as User).subscribe(
      response => {
        console.log(response)
        this.mensaje.add({severity: 'success', summary: 'Success', detail: 'Registro Agregado'});
        this.router.navigate(['login']);
      },
      error => console.log(error)
    )
  }

}