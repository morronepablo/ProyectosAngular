import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements OnInit {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
      this.getSpotifyToken();
      this.cargarStorage();
  }

  ngOnInit() {
    this.getSpotifyToken();

  }

  async getSpotifyToken() {
    await this.http.get('https://spotify-token.onrender.com/spotify/584948086926499f87f7da026009c040/374009bc74ae4d3dae5cb028382a2c93').subscribe((responseData:any) => {
      localStorage.setItem('spotifyToken', JSON.stringify(responseData));
      return responseData;
    });
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.getSpotifyToken())  );
  }

  cargarStorage() {
    if(localStorage.getItem('spotifyToken')) {
      const tokenStringify: any = localStorage.getItem('spotifyToken');
      const tokenJSON = JSON.parse(tokenStringify);
      return tokenJSON;
    }
  }

  getQuery(query: string) {

    const spotifyTokenJSON = this.cargarStorage();
    const tokenBearer = spotifyTokenJSON.access_token;
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${tokenBearer}`
    });
    return this.http.get(url, { headers })
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?country=AR&limit=20')
              .pipe(map((data:any) => data.albums.items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&market=AR&limit=15`)
              .pipe(map((data:any)=> data.artists.items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
              /* .pipe(map((data:any)=> data.artists.items)); */
  }

  geTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ar`)
              .pipe(map((data:any)=> data['tracks']));
  }

}
