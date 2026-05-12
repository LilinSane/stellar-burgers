import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { orderBurgerApi } from '@api';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export const orderBurger = createAsyncThunk(
  'burgerConstructor/order',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    const order: TOrder = {
      ...res.order,
      ingredients: data
    };

    return order;
  }
);

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

const constructorSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка заказа';
      });
  },
  initialState,
  name: 'burgerConstructor',
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      const ingredients = [...state.ingredients];

      const movedItem = ingredients.splice(fromIndex, 1)[0];

      ingredients.splice(toIndex, 0, movedItem);

      state.ingredients = ingredients;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
