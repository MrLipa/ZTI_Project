import { Container } from 'react-bootstrap';
import { FaFacebookF,FaTwitter,FaYoutube,FaGooglePlus } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h5>Traveever</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum imperdiet tellus ex, tincidunt euismod eros aliquet non. Sed sed lectus nec lectus dictum scelerisque. Nulla congue venenatis mi, venenatis viverra ligula sodales et. Nam condimentum varius efficitur.</p>
            <h5>Szkaradek Tomasz</h5>
            <Container className="my-4">
              <FaFacebookF style={{ marginRight: "20px", width: "32px",height: "32px"}}/>
              <FaTwitter style={{ marginRight: "20px", width: "32px",height: "32px"}} />
              <FaYoutube style={{ marginRight: "20px", width: "32px",height: "32px"}} />
              <FaGooglePlus style={{ marginRight: "20px", width: "32px",height: "32px"}} />
            </Container>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><strong>Name:</strong> John Doe</li>
              <li><strong>Email:</strong> john.doe@example.com</li>
              <li><strong>Phone:</strong> +1-555-1234</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Newsletter</h5>
            <p>Subscribe to our newsletter to get the latest news and updates.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;