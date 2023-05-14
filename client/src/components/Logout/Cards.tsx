import Card from "react-bootstrap/Card";

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
    image: "https://picsum.photos/id/1074/300/200",
    from: "Rome",
    to: "Italy",
    date: "2023-05-15",
},
{
    id: 3,
    city: "Tokyo",
    country: "Japan",
    price: 199.99,
    image: "https://picsum.photos/id/1021/300/200",
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
interface ProductCardProps {
  flight: Flight;
}

const ProductCard: React.FC<ProductCardProps> = ({ flight }) => {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={flight.image} />
            <Card.Body>
                <Card.Title style={{ color: "blue" }}>
                {flight.from} - {flight.to}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                Data: {flight.date}
                </Card.Text>
                <Card.Text style={{ color: "red", textAlign: "right" }}>
                Cena: {flight.price} PLN
                </Card.Text>
            </Card.Body>
        </Card>
    );
};


const Cards = () => {
  return (
    <section className="py-5">
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard flight={product} />
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Cards