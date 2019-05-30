import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../ducks/counter";
import "./Counter.css";

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>ReduxCounter</h1>
        <div className="counter">
          <div
            style={{
              color: this.props.count >= 0 ? "green" : "red"
            }}
            className="counterCount"
          >
            {this.props.count}
          </div>

          <button
            className="counter-btn"
            onClick={() => this.props.increase(10)}
          >
            +10
          </button>
          <button
            className="counter-btn"
            onClick={() => this.props.decrease(10)}
          >
            -10
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    count: state.counter.count
  }),
  { increase, decrease }
)(Counter);

// import store from '../store'
// export default class ConnectedCounter extends React.Component {
//   componentDidMount() {
//     store.subscribe(() => this.forceUpdate())
//   }

//   render() {
//     return (
//       <Counter
//         // map state to props
//         count={store.getState().counter.count}

//         // map dispatch to props
//         increase={() => store.dispatch(increase(10))}
//         decrease={() => store.dispatch(decrease(10))}
//       />
//     );
//   }
// }
