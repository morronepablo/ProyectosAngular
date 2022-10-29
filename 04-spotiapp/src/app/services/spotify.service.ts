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
      'Authorization': 'Bearer BQCSWsXNvs0gx-EHOYLq8wnQAuvt3N7t4Smd8NCr2wlk1OXPV9R1s97rBJYA-L4rlsDzETZHqRQ5baRGzqknx6T9EpVkJuosdPizqKKWKxJQqA8Dgds'
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
