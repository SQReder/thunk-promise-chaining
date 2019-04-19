import { createAsyncAction } from "typesafe-actions";
import { SampleData } from "./sample.model";
import { ThunkExtraArguments } from "../../store";
import { RootState } from "../../store/reducer";
import { AsyncThunkAction, RootDispatch } from "ThunkTypes";

export const sampleAsyncAction = createAsyncAction("@sample/REQUEST", "@sample/SUCCESS", "@sample/FAIL")<
  void,
  SampleData[],
  Error
>();

export function fetchSomeData(): AsyncThunkAction<typeof sampleAsyncAction.success> {
  return async function(
    dispatch: RootDispatch,
    getState: () => RootState,
    extraArguments: ThunkExtraArguments
  ): Promise<ReturnType<typeof sampleAsyncAction.success>> {
    dispatch(sampleAsyncAction.request());

    try {
      const data: SampleData[] = await extraArguments.api.fetchData();
      return dispatch(sampleAsyncAction.success(data));
    } catch (e) {
      dispatch(sampleAsyncAction.failure(e));
      return Promise.reject();
    }
  };
}
