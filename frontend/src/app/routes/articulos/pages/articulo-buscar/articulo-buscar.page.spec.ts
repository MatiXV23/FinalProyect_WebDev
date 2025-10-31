import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloBuscarPage } from './articulo-buscar.page';

describe('ArticuloBuscarPage', () => {
  let component: ArticuloBuscarPage;
  let fixture: ComponentFixture<ArticuloBuscarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloBuscarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloBuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
