import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './TranslationContext';

// Define the product type based on the data structure
interface Product {
  id: string;
  name: string;
  bannerImageDark: string[];
  previewText: { [key: string]: string }; // Object with language keys
}

const AnalogueProductCarousel: React.FC = () => {
  const language = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedText, setExpandedText] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.juhuu.app/v1/products/');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBuyNow = (product: Product) => {
    navigate('/product', { state: { product } });
  };

  const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunkedArr: T[][] = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }
    return chunkedArr;
  };

  const chunkedProducts = chunkArray(products, 3);

  const toggleExpand = (index: string) => {
    setExpandedText((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const limitWords = (text: string, limit: number): string => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div id="carouselExampleIndicators2" className="carousel slide mt-5 Carousel-Desktop container" data-bs-interval="false">
      <div className="carousel-inner">
        {chunkedProducts.map((chunk, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="row justify-content-center carousel-product">
              {chunk.map((product, productIndex) => (
                <div key={productIndex} className="col-lg-4 col-md-6">
                  <div className="card col mx-1 h-100 d-flex flex-column">
                    <div className="carousel-image">
                      <img src={product.bannerImageDark[0]} className="card-img-top" alt={product.name} />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text flex-grow-1">
                        {expandedText[`${index}-${productIndex}`]
                          ? product.previewText[language.language]
                          : limitWords(product.previewText[language.language], 15)}
                      </p>
                      <div className="mt-auto">
                        {!expandedText[`${index}-${productIndex}`] && (
                          <a onClick={() => toggleExpand(`${index}-${productIndex}`)} className="btn ">
                            Read More
                          </a>
                        )}
                        {expandedText[`${index}-${productIndex}`] && (
                          <a onClick={() => toggleExpand(`${index}-${productIndex}`)} className="btn ">
                            Read Less
                          </a>
                        )}
                        <a
                          className="btn container-fluid bg-dark mt-2 text-white"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators2"
        data-bs-slide="prev"
      >
        <span className="bi bi-arrow-left-circle-fill text-black fs-1 rounded-5" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators2"
        data-bs-slide="next"
      >
        <span className="bi bi-arrow-right-circle-fill text-black fs-1 rounded-5" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default AnalogueProductCarousel;
