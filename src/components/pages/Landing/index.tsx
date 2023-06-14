import Navbar from "./Navbar";
import Home from "./Home";
import Service from "./Service";
import About from "./About";
import Footer from "./Footer";

function index() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="service">
          <Service />
        </section>
        <section id="about">
          <About />
        </section>
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}

export default index;
