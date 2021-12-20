import { of } from 'rxjs';
import { MockStateContext } from '../../../core/spec';
import { ChangeTheme } from './theme.actions';
import { ThemeState } from './theme.state';

class MockThemeService {
  setTheme = jest.fn();
}

const themeStateModelDefaults = {
  activeTheme: {
    mode: 'light',
  },
};

describe('ThemeState', () => {
  let service: MockThemeService;
  let state: ThemeState;
  let stateContext: MockStateContext;

  beforeEach(() => {
    stateContext = new MockStateContext();
    service = new MockThemeService();
    state = new ThemeState(service as any);
  });

  describe('Store Selectors', () => {
    test('should get the light theme as a default value', () => {
      const actualValue = ThemeState.activeTheme(
        themeStateModelDefaults as any
      );

      expect(actualValue).toEqual({
        mode: 'light',
      });
    });
  });

  describe('Store Actions', () => {
    test('should set theme state with ChangeTheme action', () => {
      service.setTheme.mockReturnValue(of({ mode: 'dark' }));

      state
        .changeTheme(stateContext as any, new ChangeTheme({ mode: 'dark' }))
        .subscribe(() => {
          expect(stateContext.setState).toHaveBeenCalledWith({
            activeTheme: {
              mode: 'dark',
            },
          });
        });
    });
  });
});
