import { configureStore } from "@reduxjs/toolkit";
import posReducer from "./containers/PoS/PoSSlice";

export default configureStore({
  reducer: {
    pos: posReducer,
  },
});
