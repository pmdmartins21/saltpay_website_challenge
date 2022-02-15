import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top100listComponent } from './top100list.component';

describe('Top100listComponent', () => {
  let component: Top100listComponent;
  let fixture: ComponentFixture<Top100listComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top100listComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top100listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
