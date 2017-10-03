import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

// pages
import Index from './components/pages/Index'
import CategoryIndex from './components/pages/CategoryIndex'
import PostIndex from './components/pages/PostIndex'
import PostCreate from './components/pages/PostCreate'

const App = () => {
  return (
    <div className="app">
      <Route exact path="/" component={Index} />
      <Route exact path="/categories" component={CategoryIndex} />
      <Route exact path="/post" component={PostIndex} />
      <Route exact path="/post/create" component={PostCreate} />
    </div>
  );
}

export default App;
