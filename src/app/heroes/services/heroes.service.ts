import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }


  private get endpointHeroe() : string {
    return `${ this.baseUrl }/heroes`;
  }

  // GET
  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>( this.endpointHeroe );
  }

  getHeroe(heroeId: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.endpointHeroe }/${ heroeId }`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]>{
    const params = new HttpParams()
      .set('q', termino)
      .set('_limit', '5');
    return this.http.get<Heroe[]>( this.endpointHeroe , { params });
  }

  // POST
  agregarHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.post<Heroe>( this.endpointHeroe, heroe);
  }

  // PUT
  editarHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.put<Heroe>( `${ this.endpointHeroe }/${ heroe.id }`, heroe );
  }

  // DELETE
  eliminarHeroePorId( id: string ): Observable<any>{
    return this.http.delete<any>(`${ this.endpointHeroe }/${ id }`);
  }

}
