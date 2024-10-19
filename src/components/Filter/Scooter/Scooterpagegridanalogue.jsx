//Scooterpagegrid.js

import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../TranslationContext';
import "../../../assets/css/style.css";

const Scooterpagegridanalogue = () => {
  const language = useLanguage();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [expandedText, setExpandedText] = useState({});
  const navigate = useNavigate();

  const handleBuyNow = (productId) => {
    // Redirect to product overview page with product ID and category type in the URL
    
     navigate(`/v1/products/Scooter/${productId}`); // For Scooterpagegrid.js
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };
  

  const toggleExpand = (index) => {
    setExpandedText((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Function to limit the number of words in text
  const limitWords = (text, limit) => {
    // Check if text is falsy (null, undefined, empty string, etc.)
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.juhuu.app/v1/products?categoryArray=scooter&technologyArray=analog', {
         
        });
        const data = await response.json();
        setProducts(data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };
  
    fetchData();
  }, []);

  // Render loader if loading
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  

  return (
    <div className="mt-5 product-section">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="cards col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="card col mx-0 h-100 d-flex flex-column">
              <div className="carousel-image card-image justify-content-center d-flex">
                <img src={product.bannerImageDark[0]} className="card-img-top" alt={product.name} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text flex-grow-1">
                  {expandedText[`${index}`] ?
                    product.previewText[language.language] :
                    limitWords(product.previewText[language.language], 15)}
                </p>
                <div className="mt-auto">
                  {!expandedText[`${index}`] &&
                    <a onClick={() => toggleExpand(`${index}`)} className="btn ">Read More</a>
                  }
                  {expandedText[`${index}`] &&
                    <a onClick={() => toggleExpand(`${index}`)} className="btn ">Read Less</a>
                  }
                  <button onClick={() => handleBuyNow(product.id)} className="btn container-fluid bg-dark mt-2 text-white">For More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scooterpagegridanalogue;
