import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloListarPage } from './articulo-listar.page';

describe('ArticuloListarPage', () => {
  let component: ArticuloListarPage;
  let fixture: ComponentFixture<ArticuloListarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloListarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
