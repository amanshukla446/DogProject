import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://random.dog/woof.json';

  constructor(private http: HttpClient) {}

  getRandomDogs(count: number): Observable<any[]> {
    const requests = Array(count).fill(null).map(() => this.http.get(this.apiUrl));
    return forkJoin(requests);
  }

  getFavorites(): string[] {
    const favorites = localStorage.getItem('favoriteDogs');
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(imageUrl: string): void {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(imageUrl);
    
    if (index === -1) {
      favorites.push(imageUrl);
    } else {
      favorites.splice(index, 1);
    }
    
    localStorage.setItem('favoriteDogs', JSON.stringify(favorites));
  }

  isFavorite(imageUrl: string): boolean {
    return this.getFavorites().includes(imageUrl);
  }
}