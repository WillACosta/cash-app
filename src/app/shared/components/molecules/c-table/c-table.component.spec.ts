import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableComponent } from './c-table.component';

describe('CTableComponent', () => {
  let component: CTableComponent;
  let fixture: ComponentFixture<CTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
