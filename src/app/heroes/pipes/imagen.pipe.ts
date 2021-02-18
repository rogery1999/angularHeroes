import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string {

    if( !heroe.id || heroe.alt_img?.length === 0 ){
      return 'assets/no-image.png';
    }
    if( heroe.alt_img ){
      return heroe.alt_img;
    }
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
