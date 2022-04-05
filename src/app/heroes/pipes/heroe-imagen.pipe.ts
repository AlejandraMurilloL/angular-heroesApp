import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImagen'
})
export class HeroeImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    const rutaBase = 'assets/heroes/';
    return `${rutaBase}${heroe.id}.jpg`;
  }

}
