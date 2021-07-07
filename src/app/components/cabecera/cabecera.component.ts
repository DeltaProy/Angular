import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private backendService: BackendServiceService
  ) { }

  ngOnInit(): void {
  }

  salir(){
    this.backendService.userId = null;
    localStorage.removeItem('user');
  }
}
