import ingredientsReducer, {
  fetchIngredients
} from '../services/ingredient-slice';
import { TIngredient } from '@utils-types';

describe('Тестирование редьюсера ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
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

  it('Статус Request (pending)', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('Статус Success (fulfilled)', () => {
    const stateBeforeSuccess = { ...initialState, isLoading: true };
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockMainIngredient]
    };
    const newState = ingredientsReducer(stateBeforeSuccess, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual([mockMainIngredient]);
  });

  it('Статус Failed (rejected)', () => {
    const stateBeforeFailed = { ...initialState, isLoading: true };
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const newState = ingredientsReducer(stateBeforeFailed, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка сети');
  });
});
