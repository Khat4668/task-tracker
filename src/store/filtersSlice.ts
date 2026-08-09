import type { Priority } from "@/lib/issue-constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
  title: string;
  priority: Priority | "";
  tag: string;
};

const initialState: FiltersState = {
  title: "",
  priority: "",
  tag: "",
};

export const filtersSlice = createSlice({
  name: "filters",
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
  filtersSlice.actions;
export default filtersSlice.reducer;
