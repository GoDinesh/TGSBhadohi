import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayCollectionsComponent } from './today-collections.component';

describe('TodayCollectionsComponent', () => {
  let component: TodayCollectionsComponent;
  let fixture: ComponentFixture<TodayCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
