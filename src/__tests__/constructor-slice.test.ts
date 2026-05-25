import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../services/constructor-slice';
import { TIngredient } from '@utils-types';

describe('Тестирование редьюсера constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockMainIngredient: TIngredient = {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 3000,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  describe('Экшен addIngredient', () => {
    it('Добавление булки', () => {
      const action = {
        type: addIngredient.type,
        payload: { ...mockBun, id: 'uid' }
      };

      const newState = constructorReducer(initialState, action);

      expect(newState.bun).toEqual({ ...mockBun, id: 'uid' });
      expect(newState.ingredients).toHaveLength(0);
    });

    it('Добавление ингредиента', () => {
      const action = {
        type: addIngredient.type,
        payload: { ...mockMainIngredient, id: 'uid' }
      };

      const newState = constructorReducer(initialState, action);

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual({
        ...mockMainIngredient,
        id: 'uid'
      });
      expect(newState.bun).toBeNull();
    });
  });

  describe('Экшен removeIngredient', () => {
    it('Удаление ингредиента', () => {
      const stateWithIngredient = {
        ...initialState,
        ingredients: [{ ...mockMainIngredient, id: 'uid' }]
      };

      const action = removeIngredient('uid');
      const newState = constructorReducer(stateWithIngredient, action);

      expect(newState.ingredients).toHaveLength(0);
    });
  });

  describe('Экшен moveIngredient', () => {
    it('Изменение порядка ингредиента', () => {
      const itemA = {
        ...mockMainIngredient,
        _id: 'A',
        id: 'id-A',
        name: 'Котлета A'
      };
      const itemB = {
        ...mockMainIngredient,
        _id: 'B',
        id: 'id-B',
        name: 'Соус B'
      };
      const itemC = {
        ...mockMainIngredient,
        _id: 'C',
        id: 'id-C',
        name: 'Зелень C'
      };

      const stateWithIngredients = {
        ...initialState,
        ingredients: [itemA, itemB, itemC]
      };

      const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
      const newState = constructorReducer(stateWithIngredients, action);

      expect(newState.ingredients).toHaveLength(3);
      expect(newState.ingredients[0]).toEqual(itemB);
      expect(newState.ingredients[1]).toEqual(itemA);
      expect(newState.ingredients[2]).toEqual(itemC);
    });
  });
});
