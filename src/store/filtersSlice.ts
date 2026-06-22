import type { Priority } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
  priority: Priority | "";
  tag: string;
  title: string;
};

const initialState: FiltersState = {
  title: "",
  priority: "",
  tag: "",
};

export const FiltersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<Priority | "">) => {
      state.priority = action.payload;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setPriority, setTag, setTitle, resetFilters } =
  FiltersSlice.actions;
export default FiltersSlice.reducer;
