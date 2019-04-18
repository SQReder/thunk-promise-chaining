import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { SampleData } from "../components/sample/sample.model";
import api from "../api";

export interface ThunkExtraArguments {
  api: {
    fetchData: () => Promise<SampleData[]>;
  };
}

export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument<ThunkExtraArguments>({ api })));
