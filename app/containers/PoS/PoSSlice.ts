import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sessions } from "../../services/Sessions";
import { OpenedSessionDataType } from "../../services/Sessions/SessionDataType";

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

export const loadOpenedSessions = createAsyncThunk(
  "pos/loadOpenedSessions",
  async () => {
    const result = await Sessions.listByStatus({ status: "OPENED" });
    return result;
  },
);

export type PoSStateType = {
  loading: "idle" | "loading";
  openSessions: OpenedSessionDataType[] | null;
};

const initialState: PoSStateType = {
  loading: "idle",
  openSessions: null,
};

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

      if (state.openSessions === null) {
        state.openSessions = [data];
      } else {
        state.openSessions.push(data);
      }
    });
    builder.addCase(loadOpenedSessions.fulfilled, (state, action) => {
      const sessions = action.payload;
      state.openSessions = sessions;
    });
  },
});

export const { } = posSlice.actions;

export default posSlice.reducer;
