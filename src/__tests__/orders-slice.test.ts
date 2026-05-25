import ordersReducer, {
  fetchProfileOrders,
  fetchOrderByNumber
} from '../services/orders-slice';
import { TOrder } from '@utils-types';

describe('Тестирование редьюсера ordersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false
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

  describe('Получение заказов профиля (fetchProfileOrders)', () => {
    it('Статус Request (pending)', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
    });

    it('Статус Success (fulfilled)', () => {
      const stateBeforeSuccess = { ...initialState, isLoading: true };
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: [mockOrder]
      };
      const newState = ordersReducer(stateBeforeSuccess, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toEqual([mockOrder]);
    });

    it('Статус Failed (rejected)', () => {
      const stateBeforeFailed = { ...initialState, isLoading: true };
      const action = { type: fetchProfileOrders.rejected.type };
      const newState = ordersReducer(stateBeforeFailed, action);

      expect(newState.isLoading).toBe(false);
    });
  });

  describe('Получение заказа по номеру (fetchOrderByNumber)', () => {
    it('Статус Request (pending)', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
    });

    it('Статус Success (fulfilled) - добавление нового заказа', () => {
      const stateBeforeSuccess = {
        ...initialState,
        isLoading: true,
        orders: []
      };
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const newState = ordersReducer(stateBeforeSuccess, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toHaveLength(1);
      expect(newState.orders[0]).toEqual(mockOrder);
    });

    it('Статус Success (fulfilled) - заказ уже существует в сторе', () => {
      const stateWithOrder = {
        ...initialState,
        isLoading: true,
        orders: [mockOrder]
      };
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const newState = ordersReducer(stateWithOrder, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toHaveLength(1);
    });

    it('Статус Failed (rejected)', () => {
      const stateBeforeFailed = { ...initialState, isLoading: true };
      const action = { type: fetchOrderByNumber.rejected.type };
      const newState = ordersReducer(stateBeforeFailed, action);

      expect(newState.isLoading).toBe(false);
    });
  });
});
