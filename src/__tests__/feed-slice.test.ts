import feedReducer, { fetchFeed } from '../services/feed-slice';
import { TOrder } from '@utils-types';

describe('Тестирование редьюсера feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['1', '2', '1'],
    status: 'done',
    name: 'Марсианский бургер',
    createdAt: '',
    updatedAt: '',
    number: 4242
  };

  it('Статус Request (pending)', () => {
    const action = { type: fetchFeed.pending.type };
    const newState = feedReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('Статус Success (fulfilled)', () => {
    const stateBeforeSuccess = { ...initialState, isLoading: true };
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: {
        orders: [mockOrder],
        total: 100,
        totalToday: 10
      }
    };
    const newState = feedReducer(stateBeforeSuccess, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual([mockOrder]);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(10);
  });

  it('Статус Failed (rejected)', () => {
    const stateBeforeFailed = { ...initialState, isLoading: true };
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'Ошибка загрузки ленты' }
    };
    const newState = feedReducer(stateBeforeFailed, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки ленты');
  });
});
