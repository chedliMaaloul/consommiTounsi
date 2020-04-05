import { TestBed } from '@angular/core/testing';

import { ProduitUpdateRequestService } from './produit-update-request.service';

describe('ProduitUpdateRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitUpdateRequestService = TestBed.get(ProduitUpdateRequestService);
    expect(service).toBeTruthy();
  });
});
