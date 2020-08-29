import React, { Component } from 'react';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear()
        return (
            <footer className="footer-container">
                <span>Copyright &copy; {year} LiftU All Rights Reserved</span>
            </footer>
        );
    }

}

export default Footer;
