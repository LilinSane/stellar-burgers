import { rootReducer } from '../services/store';

describe('Тестирование rootReducer', () => {
  it('Проверка инициализации rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        error: null,
        orderModalData: null,
        orderRequest: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      orders: {
        orders: [],
        isLoading: false
      },
      user: {
        data: null,
        isAuthChecked: false,
        error: null
      }
    });
  });
});
