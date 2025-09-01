
import './Footer.css';
import React from 'react';
import footer_logo from '../../assets/images/footer_logo.jpg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <img src={footer_logo} alt="Logo" className="footer-logo" />
          <div className="footer-title">© Мой Силант 2022</div>
          <div className="footer-contact">+7-8352-20-12-09, Telegram</div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;