import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosFormComponent } from '../../components/usuarios-form/usuarios-form.component';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios-edit',
  imports: [UsuariosFormComponent, IonCard, IonCardHeader, IonCardTitle],
  templateUrl: './usuarios-edit.page.html',
  styleUrl: './usuarios-edit.page.css',
})
export class UsuariosEditPage {

}
