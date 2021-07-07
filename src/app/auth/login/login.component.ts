import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../../services/backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    user: [, Validators.required],
    password: [, Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private backendService: BackendServiceService
  ) { }

  ngOnInit(): void {
  }

  ingresar(event:Event){
    event.preventDefault();

    const userData = {
      user: this.loginForm.controls.user.value,
      idUser: 2,//Este valor es de prueba, se debe extraer el id de una base de datos del personal
      password: this.loginForm.controls.password.value
    }

    this.backendService.userId = userData.idUser;

    localStorage.setItem('user', JSON.stringify(userData));
    this.loginForm.reset();
    this.router.navigate(['/home']);
  }
}
