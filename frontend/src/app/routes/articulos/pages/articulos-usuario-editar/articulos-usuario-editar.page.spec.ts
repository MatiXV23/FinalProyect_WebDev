import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosUsuarioEditarPage } from './articulos-usuario-editar.page';

describe('ArticulosUsuarioEditarPage', () => {
  let component: ArticulosUsuarioEditarPage;
  let fixture: ComponentFixture<ArticulosUsuarioEditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosUsuarioEditarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosUsuarioEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
