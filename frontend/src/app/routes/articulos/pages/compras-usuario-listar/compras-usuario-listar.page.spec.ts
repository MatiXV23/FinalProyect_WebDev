import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasUsuarioListarPage } from './compras-usuario-listar.page';

describe('ComprasUsuarioListarPage', () => {
  let component: ComprasUsuarioListarPage;
  let fixture: ComponentFixture<ComprasUsuarioListarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasUsuarioListarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasUsuarioListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
