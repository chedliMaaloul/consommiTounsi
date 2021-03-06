import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProduitsPage } from './list-produits.page';

describe('ListProduitsPage', () => {
  let component: ListProduitsPage;
  let fixture: ComponentFixture<ListProduitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
