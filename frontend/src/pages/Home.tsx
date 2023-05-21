import { Form, FormControl, Button, Container, InputGroup } from 'react-bootstrap';
import backgroundImage from '../images/1.jpg';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import FlightCards from '../components/Logout/FlightCards';
import Navbar from '../components/Logout/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '100vh',
          backgroundSize: 'cover',
        }}
      >
        <Navbar />
        <Container style={{ marginTop: '20vh' }} className="text-center">
          <h1 className="display-4 mb-4">{t('Home_Title')}</h1>
          <p className="lead mb-4">{t('Home_Description')}</p>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <FormControl
              placeholder={t('Home_Placeholder_From') as string}
              className="me-1"
              style={{ height: '50px' }}
            />
            <InputGroup.Text>
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <FormControl
              placeholder={t('Home_Placeholder_To') as string}
              className="me-1"
              style={{ height: '50px' }}
            />
            <Form.Control
              as="select"
              className="me-2"
              style={{ height: '50px' }}
            >
              <option>{t('Home_Class_Economy')}</option>
              <option>{t('Home_Class_Premium')}</option>
              <option>{t('Home_Class_Business')}</option>
            </Form.Control>
            <Button variant="primary">
              <FaSearch /> {t('Home_Search')}
            </Button>
          </InputGroup>
        </Container>
      </div>
      <FlightCards />
      <Footer />
    </>
  );
};

export default Home;
