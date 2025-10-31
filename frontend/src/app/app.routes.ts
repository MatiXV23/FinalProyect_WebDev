import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, title: 'Home' },
  {
    path: 'usuarios',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios/usuarios.page')).UsuariosPage,
    title: 'Usuarios',
  },

  {
    path: 'usuarios/edit',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page')).UsuariosEditPage,
    title: 'Editar usuarios',
  },

  {
    path: 'usuarios/login',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-login/usuarios-login.page'))
        .UsuariosLoginPage,
    title: 'Logear usuario',
  },

  {
    path: 'usuarios/register',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-register/usuarios-register.page'))
        .UsuariosRegisterPage,
    title: 'Regsitrar usuario',
  },

  {
    path: 'chats/enviar',
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-enviar/mensajes-enviar.page'))
        .MensajesEnviarPage,
    title: 'Enviar chat',
  },

  {
    path: 'chats/listar',
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-listar/mensajes-listar.page'))
        .MensajesListarPage,
    title: 'Listar chats',
  },

  {
    path: 'articulo/buscar',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/articulo-buscar/articulo-buscar.page'))
        .ArticuloBuscarPage,
    title: 'Buscar Articulo',
  },

  {
    path: 'articulo/comprar',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/articulo-comprar/articulo-comprar.page'))
        .ArticuloComprarPage,
    title: 'Comprar Articulo',
  },

  {
    path: 'articulo/crear',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/articulo-crear/articulo-crear.page'))
        .ArticuloCrearPage,
    title: 'Crear Articulo',
  },

  {
    path: 'articulo/detalle',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/articulo-detalle/articulo-detalle.page'))
        .ArticuloDetallePage,
    title: 'Detallar Articulo',
  },

  {
    path: 'articulo/listar',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/articulo-listar/articulo-listar.page'))
        .ArticuloListarPage,
    title: 'Listar Articulo',
  },

  {
    path: 'articulo/usuario/editar',
    loadComponent: async () =>
      (
        await import(
          './routes/articulos/pages/articulos-usuario-editar/articulos-usuario-editar.page'
        )
      ).ArticulosUsuarioEditarPage,
    title: 'Usuario edita articulos publicados',
  },

  {
    path: 'articulo/usuario/listar',
    loadComponent: async () =>
      (
        await import(
          './routes/articulos/pages/articulos-usuario-listar/articulos-usuario-listar.page'
        )
      ).ArticulosUsuarioListarPage,
    title: 'Usuario lista articulos publicados',
  },

  {
    path: 'articulo/review',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/compras-review/compras-review.page'))
        .ComprasReviewPage,
    title: 'Review Articulo',
  },

  {
    path: 'compras/usuario/listar',
    loadComponent: async () =>
      (await import('./routes/articulos/pages/compras-usuario-listar/compras-usuario-listar.page'))
        .ComprasUsuarioListarPage,
    title: 'Listar compras usuario',
  },
];
