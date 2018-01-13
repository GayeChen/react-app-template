import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Bundle from "./Bundle";

// import Home from 'pages/Home/Home'
// import Page1 from 'pages/Page1/Page1'
// import Counter from 'pages/Counter/Counter'
// import UserInfo from 'pages/UserInfo/UserInfo'

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home'
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1'
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter'
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo'
import Draft from 'bundle-loader?lazy&name=draft!pages/Draft/Draft'

const Loading = function () {
  return <div>Loading...</div>
}

const createRouterComponent = (component) => () => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component/> : <Loading/>
    }
  </Bundle>
)

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/page1">Page1</Link></li>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/userinfo">UserInfo</Link></li>
        <li><Link to="/draft">Draft</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={createRouterComponent(Home)}/>
        <Route path="/page1" component={createRouterComponent(Page1)}/>
        <Route path="/counter" component={createRouterComponent(Counter)}/>
        <Route path="/userinfo" component={createRouterComponent(UserInfo)}/>
        <Route path="/draft" component={createRouterComponent(Draft)}/>
        
        {/*<Route exact path="/" component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/userinfo" component={UserInfo}/>*/}
      </Switch>
    </div>
  </Router>
)

export default getRouter;