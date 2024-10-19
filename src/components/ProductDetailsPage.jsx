import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import ProductCarousel from "./productPage";
import Mobileproductpage from "./mobile_productpage";
import ModelViewer from "./ModelViewer";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/css/style.css";
import "../assets/css/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { useLanguage } from "./TranslationContext";
import { Helmet } from "react-helmet";
import { Pagination, Navigation } from "swiper/modules";

const Breadcrumbs = ({ categoryType, productName }) => {
  let breadcrumbText = "";
  let breadcrumbLink = "";
  
  switch (categoryType) {
    case "Bike":
      breadcrumbText = "Bike";
      breadcrumbLink = "/v1/products/Bike";
      break;
    case "Scooter":
      breadcrumbText = "Scooter";
      breadcrumbLink = "/v1/products/Scooter";
      break;
    default:
      breadcrumbText = "Products";
      breadcrumbLink = "/";
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="https://juhuu.app/">JUHUU</a></li>
        <li className="breadcrumb-item"><a href={breadcrumbLink}>{breadcrumbText}</a></li>
        <li className="breadcrumb-item active" aria-current="page">{productName}</li>
      </ol>
    </nav>
  );
};

const MetaTags = ({ product, language }) => {
  return (
    <Helmet>
      <title>{product.name}</title>
      <meta name="description" content={product.description[language.language]} />
      <link rel="canonical" href={`https://marketplace.juhuu.app/v1/products/${product.id}`} />
      <meta name="keywords" content={`juhuu, iot, bikebox, marketplace , ${product.name}`} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description[language.language]} />
      <meta property="og:image" content={product.bannerImageDark[0]} />
      <meta property="og:url" content={`https://marketplace.juhuu.app/v1/products/${product.id}`} />
      <meta property="og:type" content="product" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description[language.language]} />
      <meta name="twitter:image" content={product.bannerImageDark[0]} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

const ProductDetailsPage = () => {
  const { productId, categoryType } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedText, setExpandedText] = useState({});
  const navigate = useNavigate();
  const language = useLanguage();

  const toggleExpand = (index) => {
    setExpandedText((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.juhuu.app/v1/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return <div>No data available</div>;
  }

  const modelSrc = product.product.model3d;
  const handle3DModelButtonClick = () => {
    if (modelSrc) {
      window.open(modelSrc, "_blank");
    } else {
      console.error("3D model source is not available.");
    }
  };

  return (
    <>
      <MetaTags product={product.product} language={language} />

      <section className="main-product-slider">
        {/* Your main product slider section */}
      </section>
      <section className="product-details">
        <div className="container">
          <Breadcrumbs categoryType={categoryType} productName={product.product.name} />
          <h1 className="h2 product-title">
            <span>{product.product.name}</span>
          </h1>

          <Swiper
            navigation={{
              nextEl: ".slider-next",
              prevEl: ".slider-prev",
            }}
            pagination={{ type: "fraction" }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="d-flex justify-content-center">
              <ModelViewer className="model-viewer" src={modelSrc} />
            </SwiperSlide>
            <SwiperSlide className="d-flex justify-content-center">
              <img
                src={product.product.bannerImageDark[0]}
                alt="image"
                className="main-swiper-img"
              />
            </SwiperSlide>
          </Swiper>

          <div className="button-Atrrangment">
            <div className="slider-nav">
              <div className="slider-prev"></div>
              <div className="slider-next"></div>
              <div className="swiper-scrollbar"></div>
            </div>
          </div>
          <div className="button text-end mt-2"></div>
        </div>
      </section>

      <section className="product-details">
        <div className="container">
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example2"
            data-bs-root-margin="0px 0px -40%"
            data-bs-smooth-scroll="true"
            className="scrollspy-example p-3 rounded-2"
            tabIndex={0}
          >
            <div className="section-detail" id="Description">
              <div className="row">
                <div className="col-md-6 justified-text">
                  <h3>Description</h3>
                  <p>
                    {product.product.description[language.language] || "Description not available"}
                  </p>
                </div>
                <div className="col-md-5 highlights">
                  <h3>Highlights</h3>
                  <ul className="highlightsUl">
                    {product.product.highlightArray?.map((highlight, index) => (
                      <li key={index}>
                        {highlight[language.language] || "No highlights available"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="section-detail mt-5" id="ProductDataSheets">
                  <h3 className="ProductDataSheets-1">Produkt Informationen</h3>
                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header accordion-button-h">
                        <button
                          className="accordion-button collapsed accordion-button-1"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapse5"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapse5"
                        >
                          Techische Unterlagen Download
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapse5" className="accordion-collapse collapse">
                        <div className="accordion-body" style={{ fontSize: 20 }}>
                          <i className="bi bi-download" style={{ color: "#CD2B23", marginRight: 5 }} />
                          <a
                            className="download-link"
                            target="_blank"
                            href={product.product.datasheet[language.language]}
                          >
                            {language.language === "en"
                              ? "Download product data sheet"
                              : language.language === "de"
                              ? "Produktdatenblatt herunterladen"
                              : language.language === "fr"
                              ? "Télécharger la fiche produit"
                              : ""}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="OptionalAccessories pt-5 mt-5" id="OptionalAccessories">
              <h1>Optional Accessories</h1>
              <div className="Carousel-Desktop">
                <ProductCarousel />
              </div>
              <div className="Digital-Responsive d-flex flex-column Carousel-responsive" id="digital">
                <Mobileproductpage />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
};

export default ProductDetailsPage;
