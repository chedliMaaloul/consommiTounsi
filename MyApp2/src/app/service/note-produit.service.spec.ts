import { TestBed } from '@angular/core/testing';

import { NoteProduitService } from './note-produit.service';

describe('NoteProduitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteProduitService = TestBed.get(NoteProduitService);
    expect(service).toBeTruthy();
  });
});
