import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCrearPage } from './articulo-crear.page';

describe('ArticuloCrearPage', () => {
  let component: ArticuloCrearPage;
  let fixture: ComponentFixture<ArticuloCrearPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloCrearPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
