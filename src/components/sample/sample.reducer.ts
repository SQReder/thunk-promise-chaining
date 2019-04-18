import { ActionType, getType } from "typesafe-actions";
import * as actions from "./sample.actions";
import { Reducer } from "redux";
import { SampleData } from "./sample.model";

type SampleAction = ActionType<typeof actions>;

export interface SampleState {
  state: "pending" | "loaded" | "error";
  samples: SampleData[];
}

const initialState: SampleState = {
  state: "pending",
  samples: [],
};

const reducer: Reducer<SampleState, SampleAction> = (
  state: SampleState = initialState,
  action: SampleAction
): SampleState => {
  switch (action.type) {
    case getType(actions.sampleAsyncAction.request):
      return {
        state: "pending",
        samples: [],
      };
    case getType(actions.sampleAsyncAction.success):
      return {
        state: "loaded",
        samples: action.payload,
      };
    case getType(actions.sampleAsyncAction.failure):
      return {
        state: "error",
        samples: [],
      };
    default:
      return state;
  }
};

export default reducer;
