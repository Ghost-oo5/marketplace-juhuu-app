import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from './TranslationContext';
import Offcanvas from 'react-bootstrap/Offcanvas';

import "../assets/css/style.css";

interface Product {
  id: string;
  // Add other product properties as needed
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
  const switchlanguage = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);

  const handleBike = () => {
    navigate(`/v1/products/Bike`);
    window.scrollTo(0, 0);
  };

  const handleScooter = () => {
    navigate(`/v1/products/Scooter`);
    window.scrollTo(0, 0);
  };

  const handleFilter = () => {
    navigate(`/filter`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.juhuu.app/v1/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOffcanvasItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setShowOffcanvas(false);
  };

  const isProductPage = products.some((product) => {
    return location.pathname === `/product/${product.id}`;
  });

  const [language, setLanguage] = useState<string>("de");

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  let AppText, ZugangssystemeText, BikeText, ScooterText, SonstigeText;

  if (switchlanguage.language === "en") {
    AppText = "App";
    ZugangssystemeText = "Access systems";
    BikeText = "Bike";
    ScooterText = "Scooter";
    SonstigeText = "Others";
  } else if (switchlanguage.language === "de") {
    AppText = "App";
    ZugangssystemeText = "Zugangssysteme";
    BikeText = "Bike";
    ScooterText = "Scooter";
    SonstigeText = "Sonstige";
  }

  return (
    <>
      <header className="d-flex fixed-top align-items-center justify-content-between px-4">
        <div className="brand-nav">
          <a href="/" className="brand">
            <img src="/assets/img/images/juhuu_logo.webp" alt="logo" />
          </a>
        </div>
        <div className="main-menu">
          <ul className="nav">
            <li className="nav-item">
              <Link
                to="https://juhuu.app/"
                className="nav-link Responsive-li"
              >
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-phone" />
                </span>{" "}
                {AppText}
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link Responsive-li" style={{ color: "#9ba2a9" }}>
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-lock" />
                </span>
                {ZugangssystemeText}
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/v1/products/bike"
                className="nav-link Responsive-li"
                onClick={handleBike}
                style={{
                  color:
                    location.pathname === "/v1/products/bike"
                      ? "#6e17fa"
                      : "inherit",
                }}
              >
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-bicycle"></i>
                </span>{" "}
                {BikeText}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/v1/products/scooter"
                className="nav-link Responsive-li"
                onClick={handleScooter}
                style={{
                  color:
                    location.pathname === "/v1/products/scooter"
                      ? "#6e17fa"
                      : "inherit",
                }}
              >
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-scooter"></i>
                </span>{" "}
                {ScooterText}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link Responsive-li"
              >
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-puzzle"></i>
                </span>{" "}
                {SonstigeText}
              </Link>
            </li>
          </ul>
        </div>

        <div className="main-menu full-main-menu">
          <ul className="nav">
            <li className="nav-item d-flex justify-content-center mt-3">
              <LanguageSelector onChangeLanguage={handleLanguageChange} />
            </li>

            <div className="hamburger">
              <li className="nav-item  d-flex justify-content-center">
                <a
                  className="nav-link"
                  onClick={() => setShowOffcanvas(true)}
                >
                  <span className="icon d-flex justify-content-center">
                    <i className="bi bi-list active"
                      style={{
                        color:
                          location.pathname === "/filter"
                            ? "#6e17fa"
                            : "inherit",
                      }} />
                  </span>{" "}
                  Menu
                </a>
              </li>
            </div>
            <li className="nav-item">
              <Link to="/filter" className="nav-link Responsive-li "
                style={{
                  color:
                    location.pathname === "/filter"
                      ? "#6e17fa"
                      : "inherit",
                }}
              >
                <span className="icon d-flex justify-content-center">
                  <i className="bi bi-funnel"></i>
                </span>{" "}
                Filter
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        style={{ backgroundColor: "#343a40" }}
      >
        <Offcanvas.Header style={{ backgroundColor: "#343a40", borderBottom: "1px solid #454d55" }}>
          <Offcanvas.Title style={{ color: "white" }}>Menu</Offcanvas.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowOffcanvas(false)} style={{ color: "white", filter: "invert(1)" }}></button>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: "white" }}>
          <ul className="nav flex-column">
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <Link
                to="https://juhuu.app/"
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="bi bi-phone me-3" /> App
              </Link>
            </li>
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <Link
              to=""
                className="nav-link"
                style={{ color: "#9ba2a9" }}
              >
                <i className="bi bi-lock me-3" /> Zugangssysteme
              </Link>
            </li>
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <Link
                to="/v1/products/Bike"
                className="nav-link"
                onClick={handleBike}
                style={{
                  color:
                    location.pathname === "/v1/products/Bike"
                      ? "#6e17fa"
                      : "white",
                }}
              >
                <i className="bi bi-bicycle me-3"></i> Bike
              </Link>
            </li>
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <Link
                to="/v1/products/Scooter" className="nav-link" onClick={handleScooter} style={{
                  color:
                    location.pathname === "/v1/products/Scooter"
                      ? "#6e17fa"
                      : "white",
                }}>
                <i className="bi bi-scooter me-3"></i> Scooter
              </Link>
            </li>
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <a className="nav-link" style={{ color: "white" }}>
                <i className="bi bi-puzzle me-3"></i> Sonstige
              </a>
            </li>
            <li className="nav-item off-canvas-nav-item" onClick={handleOffcanvasItemClick}>
              <Link
                to="/filter" className="nav-link" onClick={handleFilter} style={{
                  color:
                    location.pathname === "/filter"
                      ? "#6e17fa"
                      : "white",
                }}>
                <i className="bi bi-funnel me-3"></i> Filter
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
