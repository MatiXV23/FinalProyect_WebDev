import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesListarPage } from './mensajes-listar.page';

describe('MensajesListarPage', () => {
  let component: MensajesListarPage;
  let fixture: ComponentFixture<MensajesListarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesListarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
