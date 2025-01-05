import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GalleryComponent } from './gallery.component';
import { DogService } from '../../services/dog.service';
import { of } from 'rxjs';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let dogService: jasmine.SpyObj<DogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DogService', ['getRandomDogs', 'toggleFavorite', 'isFavorite']);
    spy.getRandomDogs.and.returnValue(of([
      { url: 'test1.jpg' },
      { url: 'test2.jpg' }
    ]));
    spy.isFavorite.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [GalleryComponent, HttpClientTestingModule],
      providers: [{ provide: DogService, useValue: spy }]
    }).compileComponents();

    dogService = TestBed.inject(DogService) as jasmine.SpyObj<DogService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dogs on init', () => {
    expect(dogService.getRandomDogs).toHaveBeenCalledWith(6);
  });

  it('should toggle favorite', () => {
    const testUrl = 'test1.jpg';
    component.toggleFavorite(testUrl);
    expect(dogService.toggleFavorite).toHaveBeenCalledWith(testUrl);
  });

  it('should validate image URLs correctly', () => {
    expect(component.isValidImage('test.jpg')).toBe(true);
    expect(component.isValidImage('test.jpeg')).toBe(true);
    expect(component.isValidImage('test.png')).toBe(true);
    expect(component.isValidImage('test.gif')).toBe(true);
    expect(component.isValidImage('test.mp4')).toBe(false);
    expect(component.isValidImage('test.webm')).toBe(false);
  });
});