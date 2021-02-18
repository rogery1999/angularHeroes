import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { of } from 'rxjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  heroe: Heroe = {
    alter_ego: '',
    superhero: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: 'no-image'
  };
  isEditingHero: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isEditingHero = this.router.url.includes('editar');
    // if( this.activatedRoute.snapshot.params.id ){
      if( this.isEditingHero ){
      this.activatedRoute.params
        .pipe(
          switchMap( ( {id} ) =>  this.heroesService.getHeroe( id ) )
        )
        .subscribe(
          ( response ) => {
            this.heroe = response;
          }
        );
    }
  }

  guardar(): void{
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if( this.heroe.id ){
      this.heroesService.editarHeroe( this.heroe )
        .subscribe(
          ( response ) => {
            this.heroe = response;
            this.mostrarSnackBar('Registro actualizado');
          }
        );
    }else{
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe(
          ( response ) => {
            this.router.navigate( ['/heroes/editar', response.id]);
            this.mostrarSnackBar('Registro agregado');
          }
        );
    }
  }

  eliminar(): void{

    const dialog = this.matDialog.open(
      ConfirmarComponent,
      {
        width: "300px",
        data: this.heroe
      }
      );

    dialog.afterClosed()
      .subscribe(
        ( result ) => {
          if( result ){
            this.heroesService.eliminarHeroePorId( this.heroe.id! )
              .subscribe(
                (response) => {
                  this.router.navigate( ['/heroes/listado'] );
                }
              );
          }
        }
      );
  }

  mostrarSnackBar( mensaje: string ): void{
    this.snackBar.open( mensaje, 'OK!', {
      duration: 2500
    });
  }

}
