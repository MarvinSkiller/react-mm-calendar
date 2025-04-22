import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    &copy; {currentYear} Myanmar Calendar Age Calculator
                </p>
                <p className="disclaimer">
                    Note: Calculations are approximate. The Myanmar Calendar conversion
                    is based on simplified algorithms.
                </p>
            </div>
        </footer>
    )
}

export default Footer