import { addIndex, map } from "ramda";
import cc from "classcat";
import React, { PureComponent, ReactNode } from "react";
import styles from "./sample.component.module.scss";
import { SampleData } from "./sample.model";
import { connect } from "react-redux";
import { RootAction } from "Store";
import { ThunkDispatch } from "redux-thunk";
import { fetchSomeData } from "./sample.actions";
import { ThunkExtraArguments } from "../../store";
import { RootState } from "../../store/reducer";

interface Props extends StateToProps, DispatchToProps {}

interface SampleComponentState {
  fetchResult: "pending" | "success" | "fail";
  fetchCount?: number;
}

export class SampleComponent extends PureComponent<Props, SampleComponentState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fetchResult: "pending",
    };
  }

  componentDidMount() {
    this.props
      .fetchData()
      .then(samples => {
        this.setState(state => ({
          fetchResult: "success",
          fetchCount: samples.length,
        }));
      })
      .catch(() => {
        this.setState(state => ({
          fetchResult: "fail",
          fetchCount: -1,
        }));
      });
  }

  private renderSample = (sample: SampleData, idx: number): ReactNode => {
    return <li>{sample.value}</li>;
  };

  private renderSamples: (samples: SampleData[]) => ReactNode[] = addIndex<SampleData, ReactNode>(map)(
    this.renderSample
  );

  render() {
    const { samples, state } = this.props;
    const { fetchCount, fetchResult } = this.state;
    const renderedSamples = this.renderSamples(samples);
    return (
      <div className={cc(styles.wrapper)}>
        <div>
          Promise: {fetchResult} -> {fetchCount}
        </div>
        <div>
          <div>Store State: {state}</div>
          <ul>{renderedSamples}</ul>
        </div>
      </div>
    );
  }
}

interface StateToProps {
  state: string;
  samples: SampleData[];
}

interface DispatchToProps {
  fetchData: () => Promise<SampleData[]>;
}

export default connect(
  (state: RootState): StateToProps => {
    return {
      state: state.sample.state,
      samples: state.sample.samples,
    };
  },
  (dispatch: ThunkDispatch<RootState, ThunkExtraArguments, RootAction>): DispatchToProps => ({
    fetchData: () => dispatch(fetchSomeData()).then(value => value.payload),
  })
)(SampleComponent);
