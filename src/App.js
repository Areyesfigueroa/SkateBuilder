import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header/Header';
import SectionWrapper from './components/SectionWrapper/SectionWrapper';
import EditableText from './components/EditableText/EditableText';
import SketchBuilder from './components/SkateBuilder/SkateBuilder';

function App() {

  return (
    <div className="App">
      <Header />

      <SectionWrapper>
        <EditableText placeholderText="My Board..."/>
      </SectionWrapper>

      <SketchBuilder />      
    </div>
  );
}

export default App;
