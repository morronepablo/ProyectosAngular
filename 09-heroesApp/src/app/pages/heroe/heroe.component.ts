import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  heroeAction: string;
  heroeId: string;

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.heroeId = id;

    console.log(this.heroeId);


    if(id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id  = id;
        });
    }


  }

  guardar(form: NgForm) {

    if(form.invalid) {
      console.log('Formulario no válido');

      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
      this.heroeAction = 'actualizó'
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
      this.heroeAction = 'creó'
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: `Se ${this.heroeAction} correctamente`,
        type: 'success',
      });
    })


  }

}
