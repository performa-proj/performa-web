import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sessions } from "../../services/Sessions";
import { OpenedSessionDataType, SessionDataType } from "../../services/Sessions/SessionDataType";

type PoSType = {
  loading: "idle" | "loading";
  openSessions: OpenedSessionDataType[];
};

const initialState: PoSType = {
  loading: "idle",
  openSessions: [],
};

// Thunks
export const createNewSession = createAsyncThunk<
  any,
  { initialCash: number; }
>(
  "pos/createNewSession",
  async (args) => {
    const result = await Sessions.createNew(args);

    return result;
  },
);

// Slice
export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    loadedOpenedSessions: (state, action) => {
      const openSessions: OpenedSessionDataType[] = action.payload.map((each: any) => {
        const { _id, code, initialCash, status, start, createdAt, updatedAt, } = each;

        return {
          _id,
          code,
          initialCash,
          status,
          start: new Date(start),
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        };
      });
      state.openSessions = openSessions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewSession.fulfilled, (state, action: PayloadAction<{ session: any; }>) => {
      const data: any = action.payload;
      state.openSessions.push(data);
    });
  },
});

export const { loadedOpenedSessions } = posSlice.actions;

export default posSlice.reducer;
