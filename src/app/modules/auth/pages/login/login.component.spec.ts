import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsModule } from 'src/app/shared/components/components.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ComponentsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a login button', () => {});
});

/**
 * Testar se usuário preencheu os dados corretamente
 * Testar se usuário clicou no botão de login e a request foi disparada
 *
 */
