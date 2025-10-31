import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloComprarPage } from './articulo-comprar.page';

describe('ArticuloComprarPage', () => {
  let component: ArticuloComprarPage;
  let fixture: ComponentFixture<ArticuloComprarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloComprarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloComprarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
