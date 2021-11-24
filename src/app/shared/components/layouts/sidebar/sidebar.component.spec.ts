import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findComponent } from 'src/app/core/spec-helpers/element.spec-helper';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renders a Cash App Logo', () => {
    const logoComponent = fixture.nativeElement.querySelector('app-logo');
    expect(logoComponent).toBeTruthy();
  });

  it('should renders the menu items', () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="menu"]').length
    ).toBe(3);
  });

  it('should render theme switcher button', () => {
    expect(findComponent(fixture, 'app-theme-switcher')).toBeTruthy();
  });
});
