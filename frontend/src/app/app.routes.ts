import { Routes } from '@angular/router';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { ArticuloListarPage } from './routes/articulos/pages/articulo-listar/articulo-listar.page';
import { isNotLoggedGuard } from './core/guards/is-not-logged-guard';
import { isAdminGuard } from './core/guards/is-admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ArticuloListarPage, title: 'Home' },

  {
    path: 'usuarios',
    canActivateChild: [isLoggedGuard, isAdminGuard],
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
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page'))
            .UsuariosEditPage,
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
    ],
  },

  {
    path: 'usuarios/:id_usuario',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuario-detalle/usuario-detalle.page'))
        .UsuarioDetallePage,
    title: 'Editar usuarios',
  },

  {
    path: 'cuenta',
    canActivateChild: [isLoggedGuard],
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
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page'))
            .UsuariosEditPage,
        title: 'Editar cuenta',
      },

      {
        path: 'compras',
        canActivateChild: [isLoggedGuard],
        children: [
          {
            path: '',
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/compras-usuario-listar/compras-usuario-listar.page'
                )
              ).ComprasUsuarioListarPage,
            title: 'Listar compras usuario',
          },
          {
            path: ':id_articulo/review',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/compras-review/compras-review.page'))
                .ComprasReviewPage,
            title: 'Review Articulo',
          },
        ],
      },
    ],
  },

  {
    path: 'login',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-login/usuarios-login.page'))
        .UsuariosLoginPage,
    canActivate: [isNotLoggedGuard],
    title: 'Logear usuario',
  },

  {
    path: 'registro',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-register/usuarios-register.page'))
        .UsuariosRegisterPage,
    canActivate: [isNotLoggedGuard],
    title: 'Regsitrar usuario',
  },

  {
    path: 'chats',
    canActivate: [isLoggedGuard],
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-listar/mensajes-listar.page'))
        .MensajesListarPage,
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/chats/pages/no-chat/no-chat.page')).NoChatPage,
        title: 'Chat con :id_chat',
      },
      {
        path: ':id_chat',
        loadComponent: async () =>
          (await import('./routes/chats/pages/mensajes-detalle/mensajes-detalle.page'))
            .MensajesDetallePage,
        title: 'Chat con :id_chat',
      },
    ],
  },

  {
    path: 'articulos',
    children: [
      {
        path: 'crear',
        canActivate: [isLoggedGuard],
        loadComponent: async () =>
          (await import('./routes/articulos/pages/articulo-crear/articulo-crear.page'))
            .ArticuloCrearPage,
        title: 'Crear Articulo',
      },
      {
        path: 'usuario',
        canActivate: [isLoggedGuard],
        loadComponent: async () =>
          (
            await import(
              './routes/articulos/pages/articulos-usuario-listar/articulos-usuario-listar.page'
            )
          ).ArticulosUsuarioListarPage,
        title: 'Listar articulos del usuario',
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
            canActivate: [isLoggedGuard],
            loadComponent: async () =>
              (await import('./routes/articulos/pages/articulo-comprar/articulo-comprar.page'))
                .ArticuloComprarPage,
            title: 'Comprar Articulo',
          },
          // ##TODO: Crear Guard, isAdminOrOwner, para entrar y crear un boton que verifique lo mismo en el template de articulo
          {
            path: 'editar',
            canActivate: [isLoggedGuard],
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/articulos-usuario-editar/articulos-usuario-editar.page'
                )
              ).ArticulosUsuarioEditarPage,
            title: 'Usuario edita articulos publicados',
          },
        ],
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'No encontrado',
  },
];
