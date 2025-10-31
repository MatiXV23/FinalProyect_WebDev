import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosUsuarioListarPage } from './articulos-usuario-listar.page';

describe('ArticulosUsuarioListarPage', () => {
  let component: ArticulosUsuarioListarPage;
  let fixture: ComponentFixture<ArticulosUsuarioListarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosUsuarioListarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosUsuarioListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
