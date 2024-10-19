import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../assets/css/style.css";

import {
  BsBicycle,
  Bs0Circle,
  BsCarFront,
  BsScooter,
  BsBoat,
  BsMic,
  BsBatteryCharging,
  BsBoxArrowUp,
  BsPeople,
  BsDroplet,
  BsTools,
} from "react-icons/bs";
import { FaSailboat } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { MdSportsScore } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { FaTachographDigital } from "react-icons/fa6";
import { SiAnalogue } from "react-icons/si";
import { useLanguage } from "../TranslationContext";
import { Helmet } from "react-helmet";


const FilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = useLanguage();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedText, setExpandedText] = useState({});

  const toggleExpand = (index) => {
    setExpandedText((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const limitWords = (text, limit) => {
    if (!text) {
      return "";
    }
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const handleBuyNow = (productId) => {
    navigate(`/v1/products/${productId}`);
    window.scrollTo(0, 0);
  };


  const queryParams = new URLSearchParams(location.search);
  const [selectedFilters, setSelectedFilters] = useState({
    categoryArray: queryParams.getAll("categoryArray"),
    modalityArray: queryParams.getAll("modalityArray"),
    sectorArray: queryParams.getAll("sectorArray"),
    technologyArray: queryParams.getAll("technologyArray"),
  });

  
  const handleCheckboxChange = (filterType, filterValue) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: prevState[filterType].includes(filterValue)
        ? prevState[filterType].filter((value) => value !== filterValue)
        : [...prevState[filterType], filterValue],
    }));
  
    updateUrlWithFilters();
  };
  
  const updateUrlWithFilters = () => {
    const filterParams = Object.entries(selectedFilters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => `${key}=${value.join(",")}`)
      .join("&");
    navigate(`/filter?${filterParams}`);
  };
  
  useEffect(() => {
    const filterParams = Object.entries(selectedFilters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => `${key}=${value.join(",")}`)
      .join("&");
      
    fetchProducts(filterParams);
    navigate(`/filter?${filterParams}`);
    fetchProducts(filterParams);
  }, [selectedFilters]);

  
   

  const updateMetaTags = () => {
    const pageTitle = "JUHUU Marketplace"; // Change this to your desired page title
    
    const pageImageUrl = "/assets/img/images/juhuu_logo.webp"; // Change this to the URL of your desired page image

    const helmet = (
      <Helmet>
        <title>{pageTitle}</title>
        
        <meta property="og:title" content={pageTitle} />
        
        <meta property="og:image" content={pageImageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
       

      </Helmet>
    );

    const head = document.querySelector("head");
    head.innerHTML = helmet.props.children;
  };

  const handleApplyFilters = () => {
    const filterParams = Object.entries(selectedFilters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => `${key}=${value.join(",")}`)
      .join("&");
    fetchProducts(filterParams);
    navigate(`/filter?${filterParams}`);
    
  };

  useEffect(() => {
    handleApplyFilters(); // Run this function when the component mounts
  }, []); // Empty dependency array means it runs only once when mounted
    
  useEffect(() => {
    fetchProducts(location.search);
  }, [location.search]);
  

  const fetchProducts = async (filterParams = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.juhuu.app/v1/products?${filterParams}`
      );
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };


 

  const getIcon = (item) => {
    switch (item) {
      // Categories
      case "bike":
        return <BsBicycle className="mr-1 fs-3" />;
      case "car":
        return <BsCarFront className="mr-1 fs-3" />;
      case "scooter":
        return <BsScooter className="mr-1 fs-3" />;
      case "boat":
        return <FaSailboat className="mr-1 fs-3" />;
      case "moped":
        return <BsMic className="mr-1 fs-3" />;
      // Modalities
      case "charge":
        return <BsBatteryCharging className="mr-1 fs-3" />;
      case "store":
        return <BsBoxArrowUp className="mr-1 fs-3" />;
      case "share":
        return <BsPeople className="mr-1 fs-3" />;
      case "wash":
        return <BsDroplet className="mr-1 fs-3" />;
      case "repair":
        return <BsTools className="mr-1 fs-3" />;
      // Sectors (assuming you'll add icons for sectors as well)
      case "tourism":
        return <MdTour className="mr-1 fs-3" />;
      case "mobility":
        return <CiMobile3 className="mr-1 fs-3" />;
      case "sport":
        return <MdSportsScore className="mr-1 fs-3" />;
      // Technology (assuming you'll add icons for sectors as well)
      case "digital":
        return <FaTachographDigital className="mr-1 fs-3" />;
      case "analog":
        return <SiAnalogue className="mr-1 fs-3" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  
  return (
    <div className="mt-5 product-section px-3">
      <div className="container mt-2 mb-4 desktop-filters">
        {/* Filter options */}
        <h2 className="mb-5 d-flex rounded-3 p-2 justify-content-center text-white filter-heading">
          Filters
        </h2>
        <div className="row mb-5">
          {/* Category filter */}
          <div className="col d-flex flex-column">
            <h4>Category</h4>
            {["bike", "car", "scooter", "boat", "moped"].map((category) => (
              <button
                key={category}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 fs-5 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.categoryArray.includes(category)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("categoryArray", category)}
              >
                {getIcon(category)} {/* Render the Bootstrap icon */}
                {category}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Modality</h4>
            {["charge", "store", "share", "wash", "repair"].map((modality) => (
              <button
                key={modality}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 fs-5 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.modalityArray.includes(modality)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("modalityArray", modality)}
              >
                {getIcon(modality)} {/* Render the Bootstrap icon */}
                {modality}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Sector</h4>
            {["tourism", "mobility", "sport"].map((sector) => (
              <button
                key={sector}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 fs-5 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.sectorArray.includes(sector) ? "active" : ""
                }`}
                onClick={() => handleCheckboxChange("sectorArray", sector)}
              >
                {getIcon(sector)} {/* Render the Bootstrap icon */}
                {sector}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Technology</h4>
            {["digital", "analog"].map((technology) => (
              <button
                key={technology}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 fs-5 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.technologyArray.includes(technology)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCheckboxChange("technologyArray", technology)
                }
              >
                {getIcon(technology)} {/* Render the Bootstrap icon */}
                {/* Render the Bootstrap icon */}
                {technology}
              </button>
            ))}
          </div>
        </div>
        {/* Submit button */}
        <div className="text-center">
           {/* <button
          className="btn bg-dark text-white rounded-3 fs-3 apply-filter-btn"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button> */}
        </div>
      </div>
      <div className="container mt-2 mb-4 tablet-filters">
        {/* Filter options */}
        <h2 className="mb-4 d-flex rounded-3 p-2 justify-content-center text-white filter-heading">
          Filters
        </h2>
        <div className="row mb-5">
          {/* Category filter */}
          <div className="col d-flex flex-column">
            <h4>Category</h4>
            {["bike", "car", "scooter", "boat", "moped"].map((category) => (
              <button
                key={category}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center  filter-btn ${
                  selectedFilters.categoryArray.includes(category)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("categoryArray", category)}
              >
                {getIcon(category)} {/* Render the Bootstrap icon */}
                {category}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Modality</h4>
            {["charge", "store", "share", "wash", "repair"].map((modality) => (
              <button
                key={modality}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.modalityArray.includes(modality)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("modalityArray", modality)}
              >
                {getIcon(modality)} {/* Render the Bootstrap icon */}
                {modality}
              </button>
            ))}
          </div>

          
        </div>
        <div className="row mb-5">
        <div className="col d-flex flex-column">
            <h4>Sector</h4>
            {["tourism", "mobility", "sport"].map((sector) => (
              <button
                key={sector}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.sectorArray.includes(sector) ? "active" : ""
                }`}
                onClick={() => handleCheckboxChange("sectorArray", sector)}
              >
                {getIcon(sector)} {/* Render the Bootstrap icon */}
                {sector}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Technology</h4>
            {["digital", "analog"].map((technology) => (
              <button
                key={technology}
                className={`btn btn-light py-3 w-75 rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.technologyArray.includes(technology)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCheckboxChange("technologyArray", technology)
                }
              >
                {getIcon(technology)}
                {/* Render the Bootstrap icon */}
                {technology}
              </button>
            ))}
          </div>

        </div>
        {/* Submit button */}
        <div className="text-center">
        {/* <button
            className="btn bg-dark text-white rounded-3 fs-3 apply-filter-btn"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button> */}
        </div>
      </div>
      <div className="container mt-2 mb-4 mobile-filters">
        {/* Filter options */}
        <h2 className="mb-4 d-flex rounded-3 p-2 justify-content-center text-white filter-heading">
          Filters
        </h2>
        <div className="row mb-5">
          {/* Category filter */}
          <div className="col d-flex flex-column">
            <h4>Category</h4>
            {["bike", "car", "scooter", "boat", "moped"].map((category) => (
              <button
                key={category}
                className={`btn btn-light py-3  rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.categoryArray.includes(category)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("categoryArray", category)}
              >
                {getIcon(category)} {/* Render the Bootstrap icon */}
                {category}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Modality</h4>
            {["charge", "store", "share", "wash", "repair"].map((modality) => (
              <button
                key={modality}
                className={`btn btn-light py-3  rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.modalityArray.includes(modality)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCheckboxChange("modalityArray", modality)}
              >
                {getIcon(modality)} {/* Render the Bootstrap icon */}
                {modality}
              </button>
            ))}
          </div>

          
        </div>
        <div className="row mb-5">
        <div className="col d-flex flex-column">
            <h4>Sector</h4>
            {["tourism", "mobility", "sport"].map((sector) => (
              <button
                key={sector}
                className={`btn btn-light py-3  rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.sectorArray.includes(sector) ? "active" : ""
                }`}
                onClick={() => handleCheckboxChange("sectorArray", sector)}
              >
                {getIcon(sector)} {/* Render the Bootstrap icon */}
                {sector}
              </button>
            ))}
          </div>

          <div className="col d-flex flex-column">
            <h4>Technology</h4>
            {["digital", "analog"].map((technology) => (
              <button
                key={technology}
                className={`btn btn-light py-3  rounded-5 my-2 gap-2 d-flex justify-content-center align-items-center filter-btn ${
                  selectedFilters.technologyArray.includes(technology)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCheckboxChange("technologyArray", technology)
                }
              >
                {getIcon(technology)} {/* Render the Bootstrap icon */}
                {technology}
              </button>
            ))}
          </div>
        </div>
        {/* Submit button */}
        <div className="text-center">
        {/* <button
          className="btn bg-dark text-white rounded-3 fs-3 apply-filter-btn"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button> */}
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Map through products and render each product */}
          {products.map((product, index) => (
            <div
              key={index}
              className="cards col-lg-4 col-md-6 col-sm-6 col-12"
            >
              <div className="card col mx-0 h-100 d-flex flex-column">
                <div className="carousel-image card-image justify-content-center d-flex">
                  <img
                    src={product.bannerImageDark[0]}
                    className="card-img-top"
                    alt={product.name}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text flex-grow-1">
                    {expandedText[`${index}`]
                      ? product.previewText[language.language]
                      : limitWords(product.previewText[language.language], 15)}
                  </p>
                  <div className="mt-auto">
                    {!expandedText[`${index}`] && (
                      <a
                        onClick={() => toggleExpand(`${index}`)}
                        className="btn "
                      >
                        Read More
                      </a>
                    )}
                    {expandedText[`${index}`] && (
                      <a
                        onClick={() => toggleExpand(`${index}`)}
                        className="btn "
                      >
                        Read Less
                      </a>
                    )}
                    <button
                      onClick={() => handleBuyNow(product.id)}
                      className="btn container-fluid bg-dark mt-2 text-white"
                    >
                      For More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
