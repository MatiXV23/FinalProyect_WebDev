import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDetallePage } from './articulo-detalle.page';

describe('ArticuloDetallePage', () => {
  let component: ArticuloDetallePage;
  let fixture: ComponentFixture<ArticuloDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloDetallePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
