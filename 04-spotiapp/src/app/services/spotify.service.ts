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
      'Authorization': 'Bearer BQD7j63PqD1uKDeKIJgwitMRa4V20UNaFPElFvWY3GnV1TgHlm6TvMWMzQJS72G0VpNxLLTP_CJwzfjt4HEj99n0l5GP1nJmXLyxvIuA0nin-OVi7dI'
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
