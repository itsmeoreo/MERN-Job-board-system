import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div>
      <div className="css-Footer-part1">
        <div style={{ listStyle: "none" }}className="css-heading-forjobseekers">
          <ul>
            <h4>For job seekers</h4>
            <li>
              <a href="">Search jobs</a>
            </li>
            <li>
              <a href="">Browse jobs</a>
            </li>
            <li>
              <a href="">Create free account</a>
            </li>
            <li>
              <a href="">Support</a>
            </li>
          </ul>
        </div>
        <div style={{ listStyle: "none" }}className="css-heading-partnerwithus">
          <ul>
            <h4>Partner with us</h4>
            <li>
              <a href="">Partners</a>
            </li>
            <li>
              <a href="">Sponcered reach</a>
            </li>
          </ul>
        </div>
        <div style={{ listStyle: "none" }} className="css-heading-company">
          <ul>
            <h4>Company</h4>
            <li>
              <a href="">About us</a>
            </li>
          </ul>
        </div>
        <div style={{ listStyle: "none" }} className="css-heading-contactus">
          <ul>
            <h4>Contact us</h4>
            <li>
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=memurli2322@gmail.com
              " target='_blank'>Email us</a>
            </li>
            <li>
              <a href="">Call +91 9150144706</a>
            </li>
            <li className="css-footer-contact-ussocial-media">
              <a><FontAwesomeIcon icon={faFacebookF} size="xl" style={{ paddingRight: "1.2rem", cursor: "pointer"}} /></a>
              <a><FontAwesomeIcon icon={faInstagram} size="2xl" style={{ paddingRight: "1.2rem", cursor: "pointer"}} /></a>
              <a><FontAwesomeIcon icon={faLinkedinIn} size="2xl" style={{ paddingRight: "1.2rem", cursor: "pointer"}} /></a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ listStyle: "none", display: "flex" }}className="css-Footer-part2">
        <p>
          <a href="">Privacy policy</a>
        </p>
        <p>
          <a href="">Terms of use</a>
        </p>
        <p>
          <a href="">Cookie policy</a>
        </p>
        <p>
          <a href="">Job posting rules</a>
        </p>
        <p>Red tie, Inc @ inspired from foundit, joblift, ziprecruiter</p>
      </div>
    </div>
  );
}

export default Footer;
