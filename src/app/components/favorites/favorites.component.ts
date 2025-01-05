import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Favorite Dogs</h1>
      <div class="gallery">
        @for (url of favorites; track url) {
          <div class="dog-card">
            <img [src]="url" alt="Favorite dog">
            <button (click)="removeFavorite(url)">❌</button>
          </div>
        }
        @if (favorites.length === 0) {
          <p>No favorite dogs yet. Go back to add some!</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .dog-card {
      position: relative;
      width: 300px;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .dog-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .dog-card button {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: white;
      border: none;
      border-radius: 50%;
      padding: 8px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    @media (max-width: 768px) {
      .dog-card {
        width: calc(50% - 10px);
        height: 200px;
      }
    }
  `]
})
export class FavoritesComponent {
  favorites: string[] = [];

  constructor(private dogService: DogService) {
    this.favorites = this.dogService.getFavorites();
  }

  removeFavorite(url: string) {
    this.dogService.toggleFavorite(url);
    this.favorites = this.dogService.getFavorites();
  }
}