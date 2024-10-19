import React from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import ContactForm from "./ContactForm";
import Productpagegrid from "./productpagegrid";
import Productpagegridanalogue from "./Productpagegridanalogue";
import { useLanguage } from "./TranslationContext";
import { Helmet } from "react-helmet"; // Import Helmet
import "../assets/css/style.css";

const ProductOverviewPage: React.FC = () => {
  const language = useLanguage();

  // Type definitions for the text variables
  let DigitalText: string = "";
  let AnalogueText: string = "";
  let BeschreibungFahrradText: string = "";
  let BeschreibungFahrradDescriptionText: string = "";
  let BeschreibungScooterText: string = "";
  let BeschreibungScooterDescriptionText: string = "";
  let BeschreibungZugangssystemeText: string = "";
  let BeschreibungZugangssystemeDescriptionText: string = "";
  
  if (language.language === "en") {
    DigitalText = "Digital";
    AnalogueText = "Analogue";
    BeschreibungFahrradText = "Bicycle Description";
    BeschreibungFahrradDescriptionText =
      "At the JUHUU Marketplace, you will find a wide selection of bicycle infrastructure products from various providers, including both digital and analog solutions to meet diverse needs and location requirements.";
    BeschreibungScooterText = "Scooter Description";
    BeschreibungScooterDescriptionText =
      "At the JUHUU Marketplace, you will find a wide selection of scooter infrastructure products from various providers, including both digital and analog solutions to meet diverse needs and location requirements.";
    BeschreibungZugangssystemeText = "Access Systems Description";
    BeschreibungZugangssystemeDescriptionText =
      "At the JUHUU Marketplace, you will find a comprehensive selection of digital access systems integrated into the JUHUU UMP and JUHUU App. Our offerings include solutions from various providers to meet all your needs for secure and efficient bicycle parking.";
  } else if (language.language === "de") {
    DigitalText = "Digital";
    AnalogueText = "Analog";
    BeschreibungFahrradText = "Beschreibung Fahrrad";
    BeschreibungFahrradDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine breite Auswahl an Fahrradinfrastrukturprodukten von verschiedenen Anbietern, sowohl digitale als auch analoge Lösungen, um unterschiedlichste Bedürfnisse und Standortanforderungen zu erfüllen";
    BeschreibungScooterText = "Beschreibung Scooter";
    BeschreibungScooterDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine breite Auswahl an Scooterinfrastrukturprodukten von verschiedenen Anbietern, sowohl digitale als auch analoge Lösungen, um unterschiedlichste Bedürfnisse und Standortanforderungen zu erfüllen";
    BeschreibungZugangssystemeText = "Beschreibung Zugangssysteme";
    BeschreibungZugangssystemeDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine umfassende Auswahl an digitaler Zugangsysteme, die in die JUHUU UMP und JUHUU App integriert sind. Unsere Angebote umfassen Lösungen von verschiedenen Anbietern, um alle Ihre Bedürfnisse rund um sicheres und effizientes Fahrradparken zu erfüllen.";
  }
  

  return (
    <>
      <Helmet>
        <title>JUHUU Marketplace</title>
        <meta
          name="description"
          content="We are a company that was founded with the aim of creating a digital IoT app ecosystem without barriers. We all unite the common passion to create something new and to provide our customers an optimal system for their products."
        />
        <meta name="keywords" content="juhuu, iot, bikebox, marketplace" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="juhuu, iot, bikebox, marketplace" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="canonical" href="https://marketplace.juhuu.app/v1" />
      </Helmet>

      <section className="product-details">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="https://juhuu.app/">
                  <span>JUHUU</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span>Products</span>
              </li>
            </ol>
          </nav>
          <div className="Beschreibung mt-5 justified-text"></div>
          <div className="row d-flex my-3">
            <div className="mt-0 d-flex justify-content-center responsive-scrollspy">
              <a
                className="btn bg-dark text-white btn-lg px-5 mx-2 mb-3 responsive-scrollspy"
                href="#digital"
              >
                {DigitalText}
              </a>
              <a
                className="btn bg-dark text-white btn-lg px-5 mx-2 mb-3 responsive-scrollspy"
                href="#Analogue"
              >
                {AnalogueText}
              </a>
            </div>
            <nav className="sticky-top d-none d-xxl-block bg-white ">
              <ul className="nav nav-pills nav-fill nav-sideline product-nav ">
                <li className="nav-item ">
                  <a
                    className="btn bg-dark text-white btn-lg btn-block w-75"
                    href="#digital"
                  >
                    {DigitalText}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="btn bg-dark text-white btn-lg btn-block w-75"
                    href="#Analogue"
                  >
                    {AnalogueText}
                  </a>
                </li>
              </ul>
            </nav>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy-example p-3 rounded-2"
              tabIndex={0}
            >
              <div className="Digital mt-0 justified-text" id="digital">
                <h1>Digital</h1>
                <Productpagegrid /> 
                
              </div>
              <div className="Analogue pt-5 mt-5 justified-text" id="Analogue">
                <h1>Analogue</h1>
                <Productpagegridanalogue /> 
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};

export default ProductOverviewPage;
