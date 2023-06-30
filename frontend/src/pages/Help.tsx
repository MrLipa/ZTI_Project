import backgroundImage from "../images/background.jpg";
import { Navbar } from "./../components/Navbar";
import { Footer } from "./../components/Footer";

/**
 * @typedef {Object} Help
 * @description This React component represents the Help page.
 * @returns {JSX.Element} Help
 */
const Help = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "130vh",
          backgroundSize: "cover",
        }}
      >
        <Navbar />
        <div
          style={{
            margin: "auto",
            width: "70vw",
            marginTop: "20vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut elit a lectus euismod pretium ut in ipsum. Aliquam velit nisi,
          lobortis pellentesque sodales et, ornare eget augue. Nulla facilisi.
          Sed eleifend, neque sit amet posuere dictum, dolor eros luctus magna,
          vel maximus neque ipsum et diam. Quisque vulputate dapibus tortor quis
          fermentum. Nullam accumsan non nibh in placerat. Suspendisse et dolor
          congue dolor congue tempus eget in enim.
        </div>
      </div>
      <Footer />
    </>
  );
};

export { Help };
