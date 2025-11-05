import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArticuloListarPage } from './routes/articulos/pages/articulo-listar/articulo-listar.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ArticuloListarPage, title: 'Home' },
  
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios/usuarios.page')).UsuariosPage,
        title: 'Usuarios',
      },
      {
        path: ':id_usuario/edit',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page')).UsuariosEditPage,
        title: 'Editar usuarios',
      },

      {
        path: ':id_usuario/articulos',
        loadComponent: async () =>
          (
            await import(
              './routes/articulos/pages/articulos-usuario-listar/articulos-usuario-listar.page'
            )
          ).ArticulosUsuarioListarPage,
        title: 'Usuario lista articulos publicados',
      },
    ]
  },

  

  {
    path: 'cuenta',
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuario-detalle/usuario-detalle.page'))
            .UsuarioDetallePage,
        title: 'Editar cuenta',
      },
      {
        path: 'edit',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page')).UsuariosEditPage,
        title: 'Editar cuenta',
      },

      

      {
        path: 'compras',
        children: [
          {
            path: '',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/compras-usuario-listar/compras-usuario-listar.page'))
                .ComprasUsuarioListarPage,
            title: 'Listar compras usuario',
          },
          {
            path: ':id_articulo/review',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/compras-review/compras-review.page'))
                .ComprasReviewPage,
            title: 'Review Articulo',
          },
        ]
      },
    ]
  },

  

  {
    path: 'login',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-login/usuarios-login.page'))
        .UsuariosLoginPage,
    title: 'Logear usuario',
  },

  {
    path: 'registro',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-register/usuarios-register.page'))
        .UsuariosRegisterPage,
    title: 'Regsitrar usuario',
  },


  {
    path: 'chats',
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/chats/pages/mensajes-listar/mensajes-listar.page'))
            .MensajesListarPage,
        title: 'Listar chats',
      },
      {
        path: ':id_chat',
        loadComponent: async () =>
          (await import('./routes/chats/pages/mensajes-detalle/mensajes-detalle.page'))
            .MensajesDetallePage,
        title: 'Chat con :id_chat',
      },
    ]
  },

  
  {
    path: 'articulos',
    children: [
      
      {
        path: 'crear',
        loadComponent: async () =>
          (await import('./routes/articulos/pages/articulo-crear/articulo-crear.page'))
            .ArticuloCrearPage,
        title: 'Crear Articulo',
      },

      {
        path: ':id_articulo',
        children: [
          {
            path: '',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/articulo-detalle/articulo-detalle.page'))
                .ArticuloDetallePage,
            title: 'Detallar Articulo',
          },
          {
            path: 'comprar',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/articulo-comprar/articulo-comprar.page'))
                .ArticuloComprarPage,
            title: 'Comprar Articulo',
          },
          {
            path: ':id_articulo/editar',
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/articulos-usuario-editar/articulos-usuario-editar.page'
                )
              ).ArticulosUsuarioEditarPage,
            title: 'Usuario edita articulos publicados',
          },
        ]
      },
    ]
  },

  

  

  

  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'No encontrado',
  },
];
