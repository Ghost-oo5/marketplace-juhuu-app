//Bikepage.js

import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "../../LanguageSelector";
import React from "react";
import ContactForm from "../../ContactForm";
import Scooterpagegrid from "./Scooterpagegrid";
import ProductCarousel from "../../productPage";
import Scooterpagegridanalogue from "./Scooterpagegridanalogue";
import { Helmet } from "react-helmet"; // Import Helmet
import Mobileproductpage from "../../mobile_productpage";
import MobileAnalogueProductCarousel from "../../mobile_analogue";
import { useLanguage } from "../../TranslationContext";
import "../../../assets/css/style.css";

const Scooterpage = () => {
  const language = useLanguage();

  let DigitalText,
    AnalogueText,
    DigitalScooterText,
    DigitalScooterDescriptionText,
    AnalogueScooterText,
    AnalogueScooterDescriptionText,
    BeschreibungScooterText,
    BeschreibungScooterDescriptionText;

  if (language.language === "en") {
    DigitalText = "Digital";
    AnalogueText = "Analogue";
    BeschreibungScooterText = "Scooter Description";
    BeschreibungScooterDescriptionText =
      "At the JUHUU Marketplace, you will find a wide selection of scooter infrastructure products from various providers, including both digital and analog solutions to meet diverse needs and location requirements.    ";
    DigitalScooterText = "Digital Scooter";
    DigitalScooterDescriptionText =
      "At the JUHUU Marketplace, you will find a comprehensive selection of digital scooter infrastructure products integrated into the JUHUU UMP and JUHUU App. Our offerings include solutions from various providers to meet all your needs for secure and efficient bicycle parking.    ";
    AnalogueScooterText = "Analogue Scooter";
    AnalogueScooterDescriptionText =
      "Our analog scooter infrastructure products perfectly complement our digital solutions and are ideal for locations that require a combination of both. These robust and low-maintenance products provide a reliable and secure parking solution for all types of scooters. ";
  } else if (language.language === "de") {
    DigitalText = "Digital";
    AnalogueText = "Analog";
    BeschreibungScooterText = "Beschreibung Scooter";
    BeschreibungScooterDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine breite Auswahl an Scooterinfrastrukturprodukten von verschiedenen Anbietern, sowohl digitale als auch analoge Lösungen, um unterschiedlichste Bedürfnisse und Standortanforderungen zu erfüllen";
    DigitalScooterText = "Digital Scooter";
    DigitalScooterDescriptionText =
      "Auf dem JUHUU Marketplace finden Sie eine umfassende Auswahl an digitaler Scooterinfrastrukturprodukten, die in die JUHUU UMP und JUHUU App integriert sind. Unsere Angebote umfassen Lösungen von verschiedenen Anbietern, um alle Ihre Bedürfnisse rund um sicheres und effizientes Fahrradparken zu erfüllen. ";
    AnalogueScooterText = "Analog Scooter";
    AnalogueScooterDescriptionText =
      "Unsere analogen Scooterinfrastrukturprodukte ergänzen perfekt unsere digitalen Lösungen und sind ideal für Standorte geeignet, die eine Kombination aus beidem benötigen. Diese robusten und wartungsarmen Produkte bieten eine zuverlässige und sichere Parklösung für alle Scootertypen.";
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
          href="https://marketplace.juhuu.app/v1/products/scooter"
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
                <span>Scooter</span>
              </li>
            </ol>
          </nav>
          <div className="Beschreibung mt-5 justified-text">
            {/* <Test/> */}
            <h1>{BeschreibungScooterText}</h1>
            <p>{BeschreibungScooterDescriptionText}</p>
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
                <h1>{DigitalScooterText}</h1>
                <p>{DigitalScooterDescriptionText} </p>
                <Scooterpagegrid />
              </div>

              <div className="Analogue pt-5 mt-5 justified-text" id="Analogue">
                <h1>{AnalogueScooterText}</h1>
                <p>{AnalogueScooterDescriptionText} </p>

                <Scooterpagegridanalogue />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};

export default Scooterpage;
