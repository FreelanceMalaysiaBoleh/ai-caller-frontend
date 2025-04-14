import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewState {
  size: ViewSizes;
}

export type ViewSizes = "small" | "medium" | "large";

const initialState: ViewState = {
  size: "large",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    updateViewSize: (state, action: PayloadAction<ViewSizes>) => {
      state.size = action.payload;
    }
  },
});

export const { updateViewSize } = viewSlice.actions;

export default viewSlice.reducer;