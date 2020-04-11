import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterRecetteComponent } from './consulter-recette.component';

describe('ConsulterRecetteComponent', () => {
  let component: ConsulterRecetteComponent;
  let fixture: ComponentFixture<ConsulterRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
