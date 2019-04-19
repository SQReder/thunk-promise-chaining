declare module "ThunkTypes" {
  import { ThunkAction, ThunkDispatch } from "redux-thunk";
  import { ThunkExtraArguments } from "./index";
  import { RootAction, RootState } from "Store";
  import { AnyAction } from "redux";

  export type AsyncThunkAction<R> = ThunkAction<Promise<ReturnType<R>>, any, ThunkExtraArguments, AnyAction>;
  export type SyncThunkAction<R> = ThunkAction<ReturnType<R>, any, ThunkExtraArguments, AnyAction>;

  export type RootDispatch = ThunkDispatch<RootState, ThunkExtraArguments, RootAction>;
}

declare module "Store" {
  import { ActionType } from "typesafe-actions";

  export type RootAction = ActionType<typeof import("./action")>;
  // export type RootState = StateType<typeof import("./reducer").default>;
}
