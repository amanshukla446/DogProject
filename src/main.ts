import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import { GalleryComponent } from './app/components/gallery/gallery.component';
import { FavoritesComponent } from './app/components/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'favorites', component: FavoritesComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Gallery</a>
      <a routerLink="/favorites">Favorites</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      background: #f8f9fa;
      padding: 1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    nav a {
      margin: 0 1rem;
      text-decoration: none;
      color: #007bff;
      font-weight: bold;
    }
    nav a:hover {
      color: #0056b3;
    }
  `]
})
export class App {
  name = 'Dog Gallery';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});