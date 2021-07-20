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
    nombre: [, Validators.required],
    apellido: [, Validators.required]
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

    const nomper = this.loginForm.controls.nombre.value;
    const apeper = this.loginForm.controls.apellido.value;
    this.backendService.buscarPersonalPorNombre(nomper, apeper).subscribe(
      resp => {
        const userData = {
          nombre: nomper,
          idUser: resp.idpersonal,
          apellido: apeper
        }
        this.backendService.userId = resp.idpersonal;
        localStorage.setItem('user', JSON.stringify(userData));
        this.loginForm.reset();
        this.router.navigate(['/home']);
      }
    )
  }
}
