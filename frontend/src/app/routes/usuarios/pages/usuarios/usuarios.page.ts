import { Component, inject, resource, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../../shared/types/usuario';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardTitle, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonModal } from '@ionic/angular/standalone';
import { CategoriasService } from '../../../../shared/services/categorias.service';
import { Categoria } from '../../../../shared/types/categoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [ IonButton, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonModal, FormsModule],
  templateUrl: './usuarios.page.html',
  styleUrl: './usuarios.page.css',
})
export class UsuariosPage {
  
  private router = inject(Router);
  private categoriasService = inject(CategoriasService)
  private usuariosService = inject(UsuariosService);

  public usuarios = resource({
    loader: () => this.usuariosService.getUsuarios(),
  });
  
  categorias = resource({
    loader: () => this.categoriasService.getCategorias()
  })
  isModalOpen: boolean = false
  categoriaForm: Categoria = { id_categoria: 0, nombre: ''};
  isEditMode: any;

  async submitForm() {
    if (this.isEditMode) await this.categoriasService.editCategoria(this.categoriaForm)
    else if (this.categoriaForm.nombre) await this.categoriasService.createCategoria(this.categoriaForm.nombre)

    this.closeModal()
    this.categorias.reload()
    return
  }
  
  openCreateModal() {
    this.isEditMode = false;
    this.categoriaForm = { id_categoria: 0, nombre: '' };
    this.isModalOpen = true;
  }

  openEditModal(categoria: Categoria) {
    this.isEditMode = true;
    this.categoriaForm = { id_categoria: categoria.id_categoria, nombre: categoria.nombre };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.categoriaForm = { id_categoria: 0, nombre: '' };
  }

  async deleteCategoria(id_categoria: number) {
    await this.categoriasService.deleteCategoria(id_categoria)
    this.categorias.reload()
  }

  public async handleDelete(event: any, id_usuario: number) {
    event.stopPropagation();
    await this.usuariosService.eliminarUsuario(id_usuario);
    console.log('Eliminado');
    this.router.navigate(['home']);
  }

  public handleEdit(event: any, id_usuario: number) {
    event.stopPropagation();
    this.router.navigate([`usuarios/${id_usuario}/edit`]);
  }

  public viewProfile(id_usuario: number) {
    this.router.navigate([`usuarios/${id_usuario}`]);
  }
}
