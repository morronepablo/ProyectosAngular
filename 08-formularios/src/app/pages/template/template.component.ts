import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  // Para colocar los campos o names por defecto
  usuario = {
    nombre: 'Pablo',
    apellido: 'Morrone',
    correo: 'morronepablo@gmail.com',
    pais: 'ARG',
    genero: 'M'
  }

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;

        //se agrega un objeto nuevo al principio con codigo vacio para que apareza mensaje se de seleccion
        this.paises.unshift({
          nombre: '[ Seleccione Pais ]',
          codigo: ''
        })
      });
  }

  guardar(forma: NgForm) {
    console.log(forma);

    //Si al hacer submit son invalidos los inputs
    if(forma.invalid) {

      // colocamos que los input fueron tocados (focus)
      return Object.values(forma.controls).forEach(control => control.markAsTouched())
      
    }

    console.log(forma.value);

  }

}
