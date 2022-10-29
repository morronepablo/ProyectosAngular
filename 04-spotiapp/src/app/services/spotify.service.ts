import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');

  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCLH95_faGLmDcRD6OwfgEa5UnQR83YUr9y70ZRQ8DbBOkOztH9pvPgNe3g2yukgsp4-fYT87oqrF4p15nI9EMj-PaI5SP_dUV9joXd4odNBIAqW4Y'
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

}
