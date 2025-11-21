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
  color: string = '#ffd700';      
  size= input(24);

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
        this.stars.push('star');
      } else if (i - 0.5 <= rating) {
        this.stars.push('star-half');
      } else {
        this.stars.push('star-outline');
      }
    }
  }
}
