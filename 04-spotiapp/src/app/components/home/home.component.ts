import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'false-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  // paises: any[] = [];

  nuevasCanciones: any[] = [];
  loading: boolean | undefined;
  error: boolean | undefined;
  mensajeError: string | undefined;

  constructor(private spotify: SpotifyService) {
    // this.http.get('https://restcountries.com/v3.1/lang/spa')
    //       .subscribe((resp:any) => {
    //         this.paises = resp;
    //         console.log(resp);

    //       })

    // Iniciando loading anted de Cargar la data
    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( (data:any) => {
          console.log(data);
          setTimeout(() => {
            this.nuevasCanciones = data;
            // Quitando loadin una vez este la data
            this.loading = false;
          }, 500)

        }, (errorServicio) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = errorServicio.error.error.message;

        });
  }

  ngOnInit(): void {
  }

}
