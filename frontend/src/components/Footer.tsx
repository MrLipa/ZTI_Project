import { FaFacebookF, FaTwitter, FaYoutube, FaGooglePlus } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h5>{t('Air Book')}</h5>
            <p>{t('Footer_Introduce')}</p>
            <h5>Student Debil</h5>
            <div className="my-4">
              <FaFacebookF style={{ marginRight: "20px", width: "32px", height: "32px" }} />
              <FaTwitter style={{ marginRight: "20px", width: "32px", height: "32px" }} />
              <FaYoutube style={{ marginRight: "20px", width: "32px", height: "32px" }} />
              <FaGooglePlus style={{ marginRight: "20px", width: "32px", height: "32px" }} />
            </div>
          </div>
          <div className="col-md-3">
            <h5>{t('Footer_Contact')}</h5>
            <ul className="list-unstyled">
              <li><strong>{t('Footer_Name')}</strong> Student Debil</li>
              <li><strong>{t('Footer_Email')}</strong> student.debil@example.com</li>
              <li><strong>{t('Footer_Phone')}</strong> +48 213 742 069</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>{t('Footer_Newsletter')}</h5>
            <p>{t('Footer_Subscribe')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
