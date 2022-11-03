import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];

  loadingArtist: boolean | undefined;

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {

    // Iniciando loading anted de Cargar la data
    this.loadingArtist = true;
    this.router.params.subscribe((params: any) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    // Iniciando loading anted de Cargar la data
    this.loadingArtist = true;
    this.spotify.getArtista(id)
        .subscribe((artista:any) => {
          setTimeout(() => {
            this.artista = artista;
            // Quitando loadin una vez este la data
            this.loadingArtist = false;
          }, 500)
        });
  }

  getTopTracks(id: string) {
    this.spotify.geTopTracks(id)
        .subscribe((topTracks: any) => {
          this.topTracks = topTracks;
        })
  }

}
