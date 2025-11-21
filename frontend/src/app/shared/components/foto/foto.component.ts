import { Component, output, input, effect } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'photo-button',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
  imports: [IonIcon],
})
export class FotoComponent {
  public foto = output<string>();
  public img = input<string | undefined>('');

  shownImg?: string;

  imgLoader = effect(() => {
    if (this.img()) this.shownImg = this.img();
  });

  public async takePhoto() {
    const img = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if (!img.webPath) throw new Error('Error al tomar la foto');

    this.shownImg = img.webPath;
    this.foto.emit(img.webPath);
  }
}
