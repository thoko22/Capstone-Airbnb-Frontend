import React from 'react';
import './Footer.css';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function Footer() {
  return (
    <footer className="footer-section">
    <div className="footer-links">
        <div>
            <h4>Support</h4>
            <ul>
                <li>Help Center</li>
                <li>Safety information</li>
                <li>Cancellation options</li>
                <li>Our COVID-19 Response</li>
                <li>Supporting people with disabilities</li>
                <li>Report a neighborhood concern</li>
            </ul>
        </div>
        <div>
            <h4>Community</h4>
            <ul>
                <li>Airbnb.org: disaster relief housing</li>
                <li>Support Afghan refugees</li>
                <li>Combating discrimination</li>
                <li>Join the LGBTQ+ community</li>
                <li>Guest referrals</li>
                <li>Gift cards</li>
            </ul>
        </div>
        <div>
            <h4>Hosting</h4>
            <ul>
                <li>Try hosting</li>
                <li>AirCover protection for Hosts</li>
                <li>Explore hosting resources</li>
                <li>Visit our community forum</li>
                <li>How to host responsibly</li>
                <li>Host an online experience</li>
            </ul>
        </div>
        <div>
            <h4>About</h4>
            <ul>
                <li>Newsroom</li>
                <li>Learn about new features</li>
                <li>Letter from our founders</li>
                <li>Careers</li>
                <li>Investors</li>
                <li>Airbnb Luxe</li>
            </ul>
        </div>
    </div>
    <div className="footer-bottom">
        <div className="footer-terms">
            <span>&copy; 2024 Airbnb Clone</span>
            <a href="/terms">Terms</a>
            <a href="/sitestamp">Sitemap</a>
        </div>
        <div className="dropdown-container">
        <div className="dropdown-with-icon">
            <LanguageIcon />
            <select>
                <option value="en">English</option>
                <option value="es">Ndebele</option>
                <option value="fr">French</option>
                <option value="de">Tswana</option>
            </select>
        </div>
        <div className='dropdown-with-icon'>
            <select>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="zar">ZAR</option>
            </select>
        </div>
        <div className='social-icons'>
            <FacebookIcon className='facebook'/>
            <InstagramIcon className='instagram'/>
            <XIcon className='x'/>
        </div>
        </div>
    </div>
</footer>
  )
}

export default Footer;