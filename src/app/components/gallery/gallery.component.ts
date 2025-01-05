import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Random Dogs Gallery</h1>
      <div class="gallery">
        @for (dog of dogs; track dog.url) {
          <div class="dog-card">
            @if (isValidImage(dog.url)) {
              <img [src]="dog.url" alt="Random dog" (click)="toggleFavorite(dog.url)">
              <button [class.favorite]="isFavorite(dog.url)" (click)="toggleFavorite(dog.url)">
                {{ isFavorite(dog.url) ? '❤️' : '🤍' }}
              </button>
            }
          </div>
        }
      </div>
      <button class="refresh-button" (click)="loadNewDogs()">Load New Dogs</button>
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
      cursor: pointer;
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
    .refresh-button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .refresh-button:hover {
      background: #0056b3;
    }
    @media (max-width: 768px) {
      .dog-card {
        width: calc(50% - 10px);
        height: 200px;
      }
    }
  `]
})
export class GalleryComponent implements OnInit {
  dogs: any[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadNewDogs();
  }

  loadNewDogs() {
    this.dogService.getRandomDogs(6).subscribe(dogs => {
      this.dogs = dogs;
    });
  }

  toggleFavorite(url: string) {
    this.dogService.toggleFavorite(url);
  }

  isFavorite(url: string): boolean {
    return this.dogService.isFavorite(url);
  }

  isValidImage(url: string): boolean {
    return url.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
  }
}