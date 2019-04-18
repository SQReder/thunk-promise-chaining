import sampleReducer from "../components/sample/sample.reducer";
import { ActionType, StateType } from "typesafe-actions";
import { combineReducers, Reducer } from "redux";
import rootAction from "./action";

export interface RootState {
  sample: StateType<typeof sampleReducer>;
}

export const rootReducer: Reducer<RootState, ActionType<typeof rootAction>> = combineReducers<
  RootState,
  ActionType<typeof rootAction>
>({
  sample: sampleReducer,
});

export default rootReducer;
