import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesEnviarPage } from './mensajes-enviar.page';

describe('MensajesEnviarPage', () => {
  let component: MensajesEnviarPage;
  let fixture: ComponentFixture<MensajesEnviarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesEnviarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesEnviarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
