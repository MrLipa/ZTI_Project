import { FaFacebookF, FaTwitter, FaYoutube, FaGooglePlus } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} Footer
 * @description This React component represents the footer section of the application.
 * It displays information about the application, contact details, and a newsletter subscription form.
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>{t('Air Book')}</h5>
            <br/>
            <p>{t('Footer_Introduce')}</p>
            <br/>
            <h5>Student Debil</h5>
            <br/>
            <div className="icon-container">
              <FaFacebookF className="icon" />
              <FaTwitter className="icon" />
              <FaYoutube className="icon" />
              <FaGooglePlus className="icon" />
            </div>
            <br/>
          </div>
          <div className="col">
            <h5>{t('Footer_Contact')}</h5>
            <br/>
            <ul className="contact-list">
              <li><strong>{t('Footer_Name')}</strong> Student Debil</li>
              <li><strong>{t('Footer_Email')}</strong> student.debil@example.com</li>
              <li><strong>{t('Footer_Phone')}</strong> +48 213 742 069</li>
            </ul>
          </div>
          <div className="col">
            <h5>{t('Footer_Newsletter')}</h5>
            <br/>
            <p>{t('Footer_Subscribe')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export {Footer};
