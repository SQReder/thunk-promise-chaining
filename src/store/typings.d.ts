declare module "ThunkTypes" {
  import { ThunkAction, ThunkDispatch } from "redux-thunk";
  import { ActionType } from "typesafe-actions";
  import { ThunkExtraArguments } from "./index";
  import { Action, AnyAction } from "redux";
  import { RootState } from "Store";

  export type GenericThunkAction<T> = ThunkAction<Promise<Action>, any, ThunkExtraArguments, AnyAction>;
  export type GenericThunkDispatch<T> = ThunkDispatch<RootState, ThunkExtraArguments, ActionType<T>>;
}

declare module "Store" {
  import { ActionType, StateType } from "typesafe-actions";

  export type RootAction = ActionType<typeof import("./action")>;
  // export type RootState = StateType<typeof import("./reducer").default>;
}
