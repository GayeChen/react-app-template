import React, {Component} from 'react';
import './Home.scss'
import './Home.css'


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  
  _handleClick = () => {
    this.setState({
      count: ++this.state.count
    });
  }
  render() {
    return (
      <div className="home-page">
        This is Home~ <br/>
        当前计数： {this.state.count}
        <button onClick={this._handleClick}>自增</button>
      </div>
    )
  }
  
}