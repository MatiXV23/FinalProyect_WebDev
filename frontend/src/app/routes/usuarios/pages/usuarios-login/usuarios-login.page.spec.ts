import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosLoginPage } from './usuarios-login.page';

describe('UsuariosLoginPage', () => {
  let component: UsuariosLoginPage;
  let fixture: ComponentFixture<UsuariosLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosLoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
