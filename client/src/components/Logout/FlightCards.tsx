import Card from "react-bootstrap/Card";
import { useTranslation } from 'react-i18next'

interface Flight {
  image: string;
  from: string;
  to: string;
  date: string;
  price: number;
}

const products = [
{
    id: 1,
    city: "Paris",
    country: "France",
    price: 99.99,
    image: "https://picsum.photos/id/1065/300/200",
    from: "Paris",
    to: "France",
    date: "2023-05-15",
},
{
    id: 2,
    city: "Rome",
    country: "Italy",
    price: 149.99,
    image: "https://res.klook.com/image/upload/Mobile/City/afmqgg5h0jl9wnr1dfmf.jpg",
    from: "Rome",
    to: "Italy",
    date: "2023-05-15",
},
{
    id: 3,
    city: "Tokyo",
    country: "Japan",
    price: 199.99,
    image: "https://lp-cms-production.imgix.net/2021-03/500pxRF_77415821.jpg?auto=format&w=1440&h=810&fit=crop&q=75",
    from: "Tokyo",
    to: "Japan",
    date: "2023-05-15",
},
{
    id: 4,
    city: "New Delhi",
    country: "India",
    price: 249.99,
    image: "https://picsum.photos/id/1079/300/200",
    from: "New Delhi",
    to: "India",
    date: "2023-05-15",
},
{
    id: 5,
    city: "London",
    country: "United Kingdom",
    price: 99.99,
    image: "https://picsum.photos/id/1080/300/200",
    from: "London",
    to: "United Kingdom",
    date: "2023-05-15",
},
{
    id: 6,
    city: "Sydney",
    country: "Australia",
    price: 149.99,
    image: "https://picsum.photos/id/1082/300/200",
    from: "Sydney",
    to: "Australia",
    date: "2023-05-15",
},
{
    id: 7,
    city: "Rio de Janeiro",
    country: "Brazil",
    price: 199.99,
    image: "https://picsum.photos/id/1080/300/200",
    from: "Rio de Janeiro",
    to: "Brazil",
    date: "2023-05-15",
},
{
    id: 8,
    city: "Toronto",
    country: "Canada",
    price: 249.99,
    image: "https://picsum.photos/id/110/300/200",
    from: "Toronto",
    to: "Canada",
    date: "2023-05-15",
},
];

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { t } = useTranslation()
  return (
      <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={flight.image} style={{ width: "18rem", height: "200px" }} />
          <Card.Body>
              <Card.Title style={{ color: "blue" }}>
              {flight.from} - {flight.to}
              </Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
              {t('FlightCard_Date')} {flight.date}
              </Card.Text>
              <Card.Text style={{ color: "red", textAlign: "right" }}>
              {t('FlightCard_Price')} {flight.price} {t('FlightCard_Currency')}
              </Card.Text>
          </Card.Body>
      </Card>
  );
};


const FlightCards = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <FlightCard flight={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FlightCards