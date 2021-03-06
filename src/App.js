import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

// pages
import Index from './components/pages/Index';
import PostsByCategory from './components/pages/PostsByCategory';
import PostIndex from './components/pages/PostIndex';
import PostCreate from './components/pages/PostCreate';
import PostEdit from './components/pages/PostEdit';
import CommentEdit from './components/pages/CommentEdit';
import ErrorPage from './components/pages/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/:category/posts" component={PostsByCategory} />
          <Route exact path="/post" component={PostCreate} />
          <Route exact path="/post/:id/edit" component={PostEdit} />
          <Route exact path="/post/:id" component={PostIndex} />
          <Route exact path="/comment/:id" component={CommentEdit} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect()(App);
