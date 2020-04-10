import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitRatingPage } from './produit-rating.page';

describe('ProduitRatingPage', () => {
  let component: ProduitRatingPage;
  let fixture: ComponentFixture<ProduitRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
