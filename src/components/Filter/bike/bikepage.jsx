//Bikepage.js

import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "../../LanguageSelector";
import React from "react";
import ContactForm from "../../ContactForm";
import Bikepagegrid from "./bikepagegrid";
import ProductCarousel from "../../productPage";
import Bikepagegridanalogue from "./bikepagegridanalogue";
import { Helmet } from "react-helmet"; // Import Helmet
import Mobileproductpage from "../../mobile_productpage";
import MobileAnalogueProductCarousel from "../../mobile_analogue";
import { useLanguage } from "../../TranslationContext";
import "../../../assets/css/style.css";

const Bikepage = () => {
  const language = useLanguage();

  let DigitalText,
    AnalogueText,
    BeschreibungFahrradText,
    BeschreibungFahrradDescriptionText,
    DigitalFahrradText,
    DigitalFahrradDescriptionText,
    AnalogueFahrradText,
    AnalogueFahrradDescriptionText;

  if (language.language === "en") {
    DigitalText = "Digital";
    AnalogueText = "Analogue";
    BeschreibungFahrradText = "Bicycle Description";
    BeschreibungFahrradDescriptionText =
      "At the JUHUU Marketplace, you will find a wide selection of bicycle infrastructure products from various providers, including both digital and analog solutions to meet diverse needs and location requirements. ";
    DigitalFahrradText = "Digital Bicycle";
    DigitalFahrradDescriptionText =
      "At the JUHUU Marketplace, you will find a comprehensive selection of digital bicycle infrastructure products integrated into the JUHUU UMP and JUHUU App. Our offerings include solutions from various providers to meet all your needs for secure and efficient bicycle parking.    ";
    AnalogueFahrradText = "Analogue Bicycle";
    AnalogueFahrradDescriptionText =
      "Our analog bicycle infrastructure products perfectly complement our digital solutions and are ideal for locations that require a combination of both. These robust and low-maintenance products provide a reliable and secure parking solution for all types of bicycles.    ";
  } else if (language.language === "de") {
    DigitalText = "Digital";
    AnalogueText = "Analog";
    BeschreibungFahrradText = "Beschreibung Fahrrad";
    BeschreibungFahrradDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine breite Auswahl an Fahrradinfrastrukturprodukten von verschiedenen Anbietern, sowohl digitale als auch analoge Lösungen, um unterschiedlichste Bedürfnisse und Standortanforderungen zu erfüllen";
    DigitalFahrradText = "Digital Fahrrad";
    DigitalFahrradDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine umfassende Auswahl an digitaler Fahrradinfrastrukturprodukten, die in die JUHUU UMP und JUHUU App integriert sind. Unsere Angebote umfassen Lösungen von verschiedenen Anbietern, um alle Ihre Bedürfnisse rund um sicheres und effizientes Fahrradparken zu erfüllen. ";
    AnalogueFahrradText = "Analog Bicycle";
    AnalogueFahrradDescriptionText =
      "Unsere analogen Fahrradinfrastrukturprodukte ergänzen perfekt unsere digitalen Lösungen und sind ideal für Standorte geeignet, die eine Kombination aus beidem benötigen. Diese robusten und wartungsarmen Produkte bieten eine zuverlässige und sichere Parklösung für alle Fahrradtypen. ";
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
        <link
          rel="canonical"
          href="https://marketplace.juhuu.app/v1/products/bike"
        />
      </Helmet>

      <section className="product-details">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="https://juhuu.app/">
                  <span>Juhuu</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span>Bike</span>
              </li>
            </ol>
          </nav>
          <div className="Beschreibung mt-5 justified-text">
            {/* <Test/> */}
            <h1>{BeschreibungFahrradText}</h1>
            <p>{BeschreibungFahrradDescriptionText}</p>
          </div>
          <div className=" row d-flex my-3">
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
                <h1>{DigitalFahrradText}</h1>
                <p>{DigitalFahrradDescriptionText}</p>
                <Bikepagegrid />
              </div>

              <div className="Analogue pt-5 mt-5 justified-text" id="Analogue">
                <h1>{AnalogueFahrradText}</h1>
                <p>{AnalogueFahrradDescriptionText}</p>

                <Bikepagegridanalogue />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};

export default Bikepage;
