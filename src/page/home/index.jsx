import { useEffect, useState } from "react";
import Header from "../../component/header";
import ProductCard from "../../component/product-card";
import { motion } from 'framer-motion';

import "./index.scss";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { ArrowUpOutlined } from "@ant-design/icons";
import Footer from "../../component/footer";

const Home = () => {
  const [koiFishs, setKoiFishs] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokendecode,setTokenDecode] = useState(false);
  //motion 
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },  
    visible: { opacity: 1, y: 0 }    
  };

  // const fetchKoiFish = async () => {
  //   try {
  //     const response = await api.get("product");
  //     console.log("API Response:", response.data);
  //     setKoiFishs(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
 

  useEffect(() => {
    // fetchKoiFish();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true); 
      } else {
        setShowScrollButton(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={tableVariants}
    transition={{ duration: 0.5 }}  // Thời gian hiệu ứng
  >
    <div className="bg-gray-100 min-h-screen">
             <Header setIsLoggedIn={setIsLoggedIn}/>

      {showScrollButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <ArrowUpOutlined/>
        </button>
      )}

      <div className="home__main-content">
        {koiFishs.map((koiFish) => {
          console.log(koiFish);
          return <ProductCard key={koiFish.id} koiFish={koiFish} />;
        })}
      </div>

      <main className="position-relative">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            marginTop: "-50px",
          }}
        >
          <img
            src="/cakoi.jpg"
            alt="Koi fish swimming in water"
            style={{
              width: "100%",
              height: "80vh",
              display: "block",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "black",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              KOIFARMSHOP
            </h1>
            <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              KoiFarmShop is an acclaimed multidisciplinary studio specializing
              in interior architecture, interior design, and décor that
              redefines laid-back luxury.
            </p>
            <Link to={"/shop"}>
              <button 
                style={{
                  marginTop: "1.5rem",
                  backgroundColor: "green",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </main>

      <div
        className="container text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ width: "50%", textAlign: "left", paddingRight: "20px" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#333",
              textAlign: "center",
            }}
          >
            Koi Fish
          </h1>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#333" }}>
            Welcome to {" "}
            <span style={{ fontWeight: "bold" }}>Koi Farm Shop SWP391</span>,
            A Place Specializing in Providing and Caring for High-Quality Koi Fish.
            Our website is not only a place to buy and sell Koi fish, but also offers a comprehensive management system and care services to meet all the needs of Koi enthusiasts. With a mission to deliver healthy, beautiful Koi fish along with professional care services, we are proud to be a trusted and reliable address for our customers.
          </p>
        </div>

        <div style={{ width: "45%" }}>
          <img
            src="/image 33.jpg"
            alt=""
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/koikohaku.jpg"
            alt="Koi kohaku"
            className="koi-image"
          />
          <div className="koi-video">
            <iframe
              src="https://www.youtube.com/embed/LFshr6i-pPE"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/koishowa.jpg"
            alt="Koi Showa"
            className="koi-image"
          />
          <div className="koi-video">
            <iframe
              src="https://www.youtube.com/embed/c1i7FjLKWkM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/koiasagi.jpg"
            alt="Koi Asagi"
            className="koi-image"
          />
          <div className="koi-video-1">
            <iframe
              src="https://www.youtube.com/embed/c8RldGCYhu8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/shusui.jpg"
            alt="Koi Shusui"
            className="koi-image"
          />
          <div className="koi-video">
            <iframe
              src="https://www.youtube.com/embed/14UZaw8_QyM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/tanchosake.jpg"
            alt="Koi Tancho Sanke"
            className="koi-image"
          />
          <div className="koi-video-1">
            <iframe
              src="https://www.youtube.com/embed/KnFXeZsRfHg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/tancho.jpg"
            alt="Koi Tancho"
            className="koi-image"
          />
          <div className="koi-video">
            <iframe
              src="https://www.youtube.com/embed/cqe01Qg34FY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="koi-fish-section">
        <div className="koi-info">
          <img
            src="/shiro.jpg"
            alt="Koi Shiro UtSuri"
            className="koi-image"
          />
          <div className="koi-video-1">
            <iframe
              src="https://www.youtube.com/embed/9HNsjYP8Cfw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </motion.div> 
  );
};

export default Home;
