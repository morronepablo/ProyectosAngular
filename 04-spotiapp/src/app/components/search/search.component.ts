import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean | undefined;

  constructor(private spotify: SpotifyService) {
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    console.log(termino);
    // Iniciando loading anted de Cargar la data
    this.loading = true;
    this.spotify.getArtistas(termino)
        .subscribe((data:any) => {
          console.log(data);

          setTimeout(() => {
            this.artistas = data;
            // Quitando loadin una vez este la data
            this.loading = false;
          }, 500)

        })
  }

}
