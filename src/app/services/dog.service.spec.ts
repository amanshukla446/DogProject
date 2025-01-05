import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogService } from './dog.service';

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService]
    });
    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should fetch random dogs', () => {
    const mockDogs = [
      { url: 'dog1.jpg' },
      { url: 'dog2.jpg' }
    ];

    service.getRandomDogs(2).subscribe(dogs => {
      expect(dogs).toEqual(mockDogs);
    });

    const requests = httpMock.match(service['apiUrl']);
    expect(requests.length).toBe(2);
    requests.forEach((req, index) => {
      req.flush(mockDogs[index]);
    });
  });

  it('should manage favorites in localStorage', () => {
    const testUrl = 'test-dog.jpg';
    
    // Add to favorites
    service.toggleFavorite(testUrl);
    expect(service.getFavorites()).toContain(testUrl);
    expect(service.isFavorite(testUrl)).toBe(true);
    
    // Remove from favorites
    service.toggleFavorite(testUrl);
    expect(service.getFavorites()).not.toContain(testUrl);
    expect(service.isFavorite(testUrl)).toBe(false);
  });
});