import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import $ from 'jquery'
import * as bootstrap from 'bootstrap';

$( '#topheader .navbar-nav a' ).on( 'click', function () {
	$( '#topheader .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
	$( this ).parent( 'li' ).addClass( 'active' );
});

const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

