import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRegisterPage } from './usuarios-register.page';

describe('UsuariosRegisterPage', () => {
  let component: UsuariosRegisterPage;
  let fixture: ComponentFixture<UsuariosRegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosRegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
