import userReducer, {
  register,
  login,
  updateProfile,
  logout,
  checkUserAuth,
  clearAuthError
} from '../services/user-slice';
import { TUser } from '@utils-types';

describe('Тестирование редьюсера userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    data: null,
    error: null
  };

  const mockUser: TUser = {
    email: 'test_user@gmail.com',
    name: 'User'
  };

  describe('Синхронные экшены', () => {
    it('Экшен clearAuthError', () => {
      const stateWithError = { ...initialState, error: 'Ошибка' };
      const action = clearAuthError();
      const newState = userReducer(stateWithError, action);

      expect(newState.error).toBeNull();
    });
  });

  describe('Проверка авторизации (checkUserAuth)', () => {
    it('Статус Success (fulfilled)', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('Статус Failed (rejected)', () => {
      const action = { type: checkUserAuth.rejected.type };
      const newState = userReducer(initialState, action);

      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toBeNull();
    });
  });

  describe('Регистрация пользователя (register)', () => {
    it('Статус Success (fulfilled)', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    it('Статус Failed (rejected)', () => {
      const action = {
        type: register.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const newState = userReducer(initialState, action);

      expect(newState.error).toBe('Ошибка регистрации');
      expect(newState.data).toBeNull();
    });
  });

  describe('Вход пользователя (login)', () => {
    it('Статус Success (fulfilled)', () => {
      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    it('Статус Failed (rejected)', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const newState = userReducer(initialState, action);

      expect(newState.error).toBe('Ошибка входа');
      expect(newState.data).toBeNull();
    });
  });

  describe('Выход из профиля (logout)', () => {
    it('Статус Success (fulfilled)', () => {
      const stateWithUser = { ...initialState, data: mockUser };
      const action = { type: logout.fulfilled.type };
      const newState = userReducer(stateWithUser, action);

      expect(newState.data).toBeNull();
    });
  });

  describe('Обновление профиля (updateProfile)', () => {
    it('Статус Success (fulfilled)', () => {
      const stateWithUser = { ...initialState, data: mockUser };
      const updatedUser = { email: 'new_test_user@gmail.com', name: 'New User' };
      const action = {
        type: updateProfile.fulfilled.type,
        payload: updatedUser
      };
      const newState = userReducer(stateWithUser, action);

      expect(newState.data).toEqual(updatedUser);
      expect(newState.error).toBeNull();
    });

    it('Статус Failed (rejected)', () => {
      const action = {
        type: updateProfile.rejected.type,
        error: { message: 'Ошибка обновления профиля' }
      };
      const newState = userReducer(initialState, action);

      expect(newState.error).toBe('Ошибка обновления профиля');
    });
  });
});
