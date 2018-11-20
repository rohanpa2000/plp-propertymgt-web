import React, { Component } from 'react';
import './App.css';

//import MenubarLayout from './pages/root/Menuebar';
import RootLayout from './pages/booking/layouts/Booking';

class App extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
        <RootLayout/>
      </div>
    );
  }
}

export default App;
