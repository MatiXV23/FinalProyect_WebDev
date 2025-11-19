import { Component, input, OnInit } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss'],
  imports: [IonIcon],
})
export class RatingStarComponent  implements OnInit {
  rating= input(0) ;
  maxStars: number = 5;
  color: string = '#ffd700'; // color dorado por defecto
  size= input(24);
  showHalf: boolean = true; // mostrar medias estrellas

  stars: string[] = [];

  ngOnInit() {
    this.updateStars();
  }

  ngOnChanges() {
    this.updateStars();
  }

  updateStars() {
    this.stars = [];
    const rating = Math.min(Math.max(this.rating(), 0), this.maxStars);

    for (let i = 1; i <= this.maxStars; i++) {
      if (i <= rating) {
        // Estrella completa
        this.stars.push('star');
      } else if (this.showHalf && i - 0.5 <= rating) {
        // Media estrella
        this.stars.push('star-half');
      } else {
        // Estrella vacía
        this.stars.push('star-outline');
      }
    }
  }
}
