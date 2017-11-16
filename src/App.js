import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from './containers/home.page.container';
import PostPageContainer from './containers/post.page.container';

import { state as initState } from './MockData';

const store = createStore(reducers, initState || {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/:category" component={HomePageContainer}/>
        <Route exact path="/:category/:id" component={PostPageContainer}/>
        {/* <Route exact path="/category/post/:id" render={}/>
        <Route path="/post/new" render={}/>
        <Route path="/post/:id/edit" render={}/> */}
        <Route path="/" component={HomePageContainer}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
