import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux'

import {decrement, increment, reset} from "actions/counter";
import {makeSelectCount, selectCounter} from "../../myredux/selectors";

class Counter extends Component {
  render() {
    console.log(this.props);
    return (
    <div>
      <div>{this.props.counter.get('count')}</div>
      <button onClick={() => {
       this.props.increment()
      }}>自增
      </button>
      <button onClick={() => {
        this.props.decrement();
      }}>自减
      </button>
      <button onClick={() => {
        this.props.reset()
      }}>重置
      </button>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // counter: state.counter,
    // counter: state.get('counter'),
    counter: selectCounter(state),
  }
};

// const mapStateToProps = createStructuredSelector({
//   counter: selectCounter(),
//   count: makeSelectCount()
// });

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    reset: () => {
      dispatch(reset())
    }
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Counter);