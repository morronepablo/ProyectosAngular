import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: ''
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        console.log(paises);

      });
  }

  guardar(forma: NgForm) {
    console.log(forma);

    //Si al hacer submit son invalidos los inputs
    if(forma.invalid) {

      // colocamos que los input fueron tocados (focus)
      Object.values(forma.controls).forEach(control => control.markAsTouched())

      return;
    }

    console.log(forma.value);

  }

}
