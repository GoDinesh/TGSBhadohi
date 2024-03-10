import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDressFeesComponent } from './book-dress-fees.component';

describe('BookDressFeesComponent', () => {
  let component: BookDressFeesComponent;
  let fixture: ComponentFixture<BookDressFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDressFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDressFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
