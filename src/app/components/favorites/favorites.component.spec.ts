import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { DogService } from '../../services/dog.service';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let dogService: jasmine.SpyObj<DogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DogService', ['getFavorites', 'toggleFavorite']);
    spy.getFavorites.and.returnValue(['test1.jpg', 'test2.jpg']);

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: DogService, useValue: spy }]
    }).compileComponents();

    dogService = TestBed.inject(DogService) as jasmine.SpyObj<DogService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    expect(dogService.getFavorites).toHaveBeenCalled();
    expect(component.favorites.length).toBe(2);
  });

  it('should remove favorite', () => {
    const testUrl = 'test1.jpg';
    component.removeFavorite(testUrl);
    expect(dogService.toggleFavorite).toHaveBeenCalledWith(testUrl);
    expect(dogService.getFavorites).toHaveBeenCalled();
  });
});