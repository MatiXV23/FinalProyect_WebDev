import { Component, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  imports: [IonInput, IonInputPasswordToggle, IonButton],
})
export class UsuariosFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
