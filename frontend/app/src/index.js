import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './Home';
import NewBlogPost from './NewBlogPost';
import BlogPost from './BlogPost'
import ModifyBlogPost from './ModifyBlogPost';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/newblogpost" component={NewBlogPost} />
      <Route path="/modifyblogpost/:blogPostId" component={ModifyBlogPost} />
      <Route path="/blogposts/:blogPostId" component={BlogPost} />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker();
