import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarousselComponent } from './home-caroussel.component';

describe('HomeCarousselComponent', () => {
  let component: HomeCarousselComponent;
  let fixture: ComponentFixture<HomeCarousselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCarousselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
