import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
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

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardarHeroe(): void {
    if(!this.heroe.superhero.trim()){
      return;
    } 
    
    this.heroesService.saveHeroe(this.heroe).subscribe(resp => {
      this.heroe = resp;
      this.showSnackBar("Héroe Guardado correctamente");
      this.router.navigate(['/heroes/editar', this.heroe.id]);
    });
  }

  deleteHeroe(): void {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: {...this.heroe} // Para no pasarlo por referencia
    });

    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe(() => {
          this.showSnackBar('Héroe eliminado correctamente');
          this.router.navigate(['/heroes']);
        });
      } 
    });

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500
    });
  }
}
