import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasReviewPage } from './compras-review.page';

describe('ComprasReviewPage', () => {
  let component: ComprasReviewPage;
  let fixture: ComponentFixture<ComprasReviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasReviewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
