import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe(
        ( response ) => {
          this.heroes = response;
        }
      );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ): void{
    if( !event.option.value ){
      this.heroeSeleccionado = undefined;
      return;
    }else{
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroesService.getHeroe( heroe.id! )
        .subscribe(
          ( response ) => {
            this.heroeSeleccionado = response;
          }
        );
    }
  }

}
