import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEditPage } from './usuarios-edit.page';

describe('UsuariosEditPage', () => {
  let component: UsuariosEditPage;
  let fixture: ComponentFixture<UsuariosEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
