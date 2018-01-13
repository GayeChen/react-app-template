import React, {Component} from 'react';

import image from '../../images/icon.png'
import style from './page1.scss'

export default class extends Component {
  render() {
    return (
      <div className={style.box}>
        This is Page1~
        <img src={image} alt=""/>
      </div>
    )
  }
}