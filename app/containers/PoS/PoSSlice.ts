import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
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

// State
export type PoSStateType = {
  openSessions: OpenedSessionDataType[] | null;
};

const initialState: PoSStateType = {
  openSessions: null,
};

// Slice
export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setOpenedSessions: (state, action) => {
      state.openSessions = action.payload;
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
  },
});

export const { setOpenedSessions } = posSlice.actions;

export default posSlice.reducer;

export const PoSSelectors = {
  getSessions: () =>
    useSelector<any>(state => {
      let openSessions = state.pos.openSessions;

      if (Array.isArray(openSessions)) {
        openSessions = openSessions.map((each) => ({
          _id: each._id,
          code: each.code,
          initialCash: each.initialCash,
          start: new Date(each.start),
          status: each.status,
          createdAt: new Date(each.createdAt),
          updatedAt: new Date(each.updatedAt),
        }))
          .sort((a, b) => {
            if (a.start < b.start) {
              return 1;
            } else if (a.start > b.start) {
              return -1;
            }

            return 0;
          });

        return openSessions;
      }

      return null;
    }),
};
