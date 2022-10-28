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
      'Authorization': 'Bearer BQDLr8OeHsieCLwU7WLUKuSPoQGsxZLL9zOLAoWdD3uUy8TErLQ4bAwvGO5tBdpC3eF0oWZrQ2-zoxJfcr8P4eVq6TRuiEaRo8r7lSYwX9sDP-fPQ3c'
    });

    return this.http.get(url, { headers })
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?country=AR&limit=20')
              .pipe(map((data:any) => data.albums.items));
  }

  getArtista(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&market=AR&limit=15`)
              .pipe(map((data:any)=> data.artists.items));
  }

}
