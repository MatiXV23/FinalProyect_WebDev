import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';

@Component({
  selector: 'app-articulo-crear',
  imports: [IonCard, IonCardHeader, IonCardTitle, ArticuloFormComponent],
  templateUrl: './articulo-crear.page.html',
  styleUrl: './articulo-crear.page.css',
})
export class ArticuloCrearPage {}
