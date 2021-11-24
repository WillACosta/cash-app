import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwictherComponent } from './theme-swicther.component';

describe('ThemeSwictherComponent', () => {
  let component: ThemeSwictherComponent;
  let fixture: ComponentFixture<ThemeSwictherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeSwictherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwictherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
