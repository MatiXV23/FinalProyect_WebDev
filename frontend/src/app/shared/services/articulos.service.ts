import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { baseApiURL } from '../../core/configs';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private httpClient = inject(HttpClient)

  private mainStore = inject(MainStore)

}
