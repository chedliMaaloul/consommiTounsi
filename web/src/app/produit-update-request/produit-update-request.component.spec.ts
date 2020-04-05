import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitUpdateRequestComponent } from './produit-update-request.component';

describe('ProduitUpdateRequestComponent', () => {
  let component: ProduitUpdateRequestComponent;
  let fixture: ComponentFixture<ProduitUpdateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitUpdateRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitUpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
