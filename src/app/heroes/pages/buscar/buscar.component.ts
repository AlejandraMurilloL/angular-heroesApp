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

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroesService.getSugerencias(this.termino).subscribe(heroes =>  this.heroes = heroes);
  }

  heroeSeleccionadoChanged(e: MatAutocompleteSelectedEvent): void {

    if(!e.option.value) { 
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = e.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroeById(heroe.id!).subscribe(heroe => this.heroeSeleccionado = heroe);
  }
}
