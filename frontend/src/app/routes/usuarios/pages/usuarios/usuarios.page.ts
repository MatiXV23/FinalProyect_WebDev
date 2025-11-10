import { Component, inject, resource, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../../shared/types/usuario';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios',
  imports: [IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardTitle],
  templateUrl: './usuarios.page.html',
  styleUrl: './usuarios.page.css',
})
export class UsuariosPage {
  private router = inject(Router);

  private usuariosService = inject(UsuariosService);

  public usuarios = resource({
    loader: () => this.usuariosService.getUsuarios() 
  });

  

  public async handleDelete(id_usuario: number) {
    await this.usuariosService.eliminarUsuario(id_usuario);
    console.log('Eliminado');
    this.router.navigate(['home']);
  }

  public async handleEdit(id_usuario: number) {
    this.router.navigate([`usuarios/${id_usuario}/edit`]);
  }
}
