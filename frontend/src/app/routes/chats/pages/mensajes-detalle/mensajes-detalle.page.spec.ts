import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesDetallePage } from './mensajes-detalle.page';

describe('MensajesDetallePage', () => {
  let component: MensajesDetallePage;
  let fixture: ComponentFixture<MensajesDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesDetallePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
