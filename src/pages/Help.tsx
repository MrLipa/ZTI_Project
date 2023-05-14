import {
  Container,
} from "react-bootstrap";
import backgroundImage from "../images/1.jpg";
import Cards from "../components/Logout/Cards";
import Navbar from "../components/Logout/Navbar";
import Footer from "../components/Footer";

const Help = () => {
return (
  <>
      <div style={{backgroundImage: `url(${backgroundImage})`,height: "100vh",backgroundSize: "cover",}}>
          <Navbar/>
          <Container style={{ marginTop: "20vh" }} className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit nunc nunc, vitae volutpat massa elementum non. Mauris dapibus sed dolor ut dictum. Etiam malesuada at libero et imperdiet. Vivamus vestibulum tempor lorem, quis placerat nisl rhoncus vitae. Aliquam luctus justo vel dui iaculis fringilla. Donec semper mi vitae mauris gravida, vitae sagittis justo aliquet. Pellentesque convallis eros ut urna vulputate, nec euismod sapien finibus. Duis gravida augue at lectus porttitor, id faucibus quam pulvinar.
            Ut quis libero non lorem auctor malesuada non vitae augue. Sed convallis luctus erat dapibus pulvinar. Sed blandit justo orci, eget facilisis urna tincidunt rutrum. Vivamus ac egestas sem, quis auctor felis. In hac habitasse platea dictumst. Suspendisse potenti. Proin ut molestie eros. Nam ornare aliquam elementum. In tellus diam, sollicitudin a aliquet at, tincidunt nec sapien. Praesent eget nisi at nulla finibus finibus. Aliquam erat volutpat. Pellentesque rutrum lobortis congue. Duis luctus tincidunt rhoncus.
          </Container>
      </div>
      <Cards/>
      <Footer />
  </>
)
}

export default Help