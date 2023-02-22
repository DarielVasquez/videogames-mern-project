import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="hm-footer-copyright text-center">
          <div className="footer-social">
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa fa-pinterest"></i>
            </a>
            <a href="#">
              <i className="fa fa-behance"></i>
            </a>
          </div>
          <p>
            &copy;copyright. overall design by{" "}
            <a href="https://www.themesine.com/">themesine</a>
          </p>
        </div>
      </div>

      <div id="scroll-Top">
        <div className="return-to-top">
          <i
            className="fa fa-angle-up "
            id="scroll-top"
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="Back to Top"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
