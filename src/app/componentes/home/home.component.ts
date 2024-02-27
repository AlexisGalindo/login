import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sesionForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,private authService:AuthService,
    private router:Router){}

  sesion(){
          sessionStorage.clear()
          this.router.navigate(['login']);

  }

}