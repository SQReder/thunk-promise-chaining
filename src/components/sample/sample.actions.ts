import { ActionType, createAsyncAction } from "typesafe-actions";
import { SampleData } from "./sample.model";
import { ThunkExtraArguments } from "../../store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/reducer";

export const sampleAsyncAction = createAsyncAction("@sample/REQUEST", "@sample/SUCCESS", "@sample/FAIL")<
  void,
  SampleData[],
  Error
>();

let body = async function(
  dispatch: ThunkDispatch<RootState, ThunkExtraArguments, ActionType<typeof sampleAsyncAction>>,
  getState: () => RootState,
  extraArguments: ThunkExtraArguments
) {
  dispatch(sampleAsyncAction.request());

  try {
    const data: SampleData[] = await extraArguments.api.fetchData();
    return dispatch(sampleAsyncAction.success(data));
  } catch (e) {
    dispatch(sampleAsyncAction.failure(e));
    return Promise.reject();
  }
};
export const fetchSomeData = (): ThunkAction<
  ReturnType<typeof body>,
  any,
  ThunkExtraArguments,
  ActionType<typeof sampleAsyncAction>
> => body;

/*
export const fetchSomeData = (): ThunkAction<
  Promise<PayloadAction<"@sample/SUCCESS", SampleData[]>>,
  any,
  ThunkExtraArguments,
  AnyAction
  > =>
  async function(
    dispatch: GenericThunkDispatch<typeof sampleAsyncAction>,
    getState: () => RootState,
    extraArguments: ThunkExtraArguments
  ) {
    dispatch(sampleAsyncAction.request());

    try {
      const data: SampleData[] = await extraArguments.api.fetchData();
      return dispatch(sampleAsyncAction.success(data));
    } catch (e) {
      dispatch(sampleAsyncAction.failure(e));
      return Promise.reject();
    }
  };
*/
