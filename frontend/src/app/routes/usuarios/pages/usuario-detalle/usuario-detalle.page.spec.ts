import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetallePage } from './usuario-detalle.page';

describe('UsuarioDetallePage', () => {
  let component: UsuarioDetallePage;
  let fixture: ComponentFixture<UsuarioDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDetallePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
