import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  constructor(private router: ActivatedRoute) {
    this.router.params.subscribe((params: any) => {
      console.log(params['id']);

    })
  }


}