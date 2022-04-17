import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  creadores = [
    {
      id: 'DC Comics',
      descripcion: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      descripcion: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    publisher: Publisher.MarvelComics,
    first_appearance: '',
    characters: '',
    alt_img: ''
  };



  constructor() { }

  ngOnInit(): void {
  }

}
