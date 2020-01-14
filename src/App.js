import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header/Header';
import EditableText from './components/EditableText/EditableText';

function App() {

  return (
    <div className="App">
      <Header />
      <EditableText />
    </div>
  );
}

export default App;
