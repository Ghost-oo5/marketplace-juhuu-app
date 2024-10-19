import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './TranslationContext';

// Define types for the product
interface Product {
  id: string;
  name: string;
  bannerImageDark: string[];
  previewText: {
    [key: string]: string;
  };
}

// Define types for the state
interface ExpandedTextState {
  [key: string]: boolean;
}

const MobileAnalogueProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedText, setExpandedText] = useState<ExpandedTextState>({});
  const { language } = useLanguage(); // Ensure language is correctly typed
  const navigate = useNavigate();

  const handleBuyNow = (productId: string) => {
    // Redirect to product overview page with product ID in the URL
    navigate(`/v1/products/${productId}`);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const toggleExpand = (index: string) => {
    setExpandedText(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Function to limit the number of words in text
  const limitWords = (text: string, limit: number): string => {
    // Check if text is falsy (null, undefined, empty string, etc.)
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.juhuu.app/v1/products/');
        const data: Product[] = await response.json();
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

  const chunkArray = (array: Product[], size: number): Product[][] => {
    const chunkedArr: Product[][] = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }
    return chunkedArr;
  };

  const chunkedProducts = chunkArray(products, 1);

  return (
    <div id="mobile_analogues" className="carousel slide mt-5 Carousel-responsive container" data-bs-interval="false">
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
                        {expandedText[`${index}-${productIndex}`] ?
                          product.previewText[language] :
                          limitWords(product.previewText[language], 15)}
                      </p>
                      <div className="mt-auto">
                        {!expandedText[`${index}-${productIndex}`] &&
                          <a onClick={() => toggleExpand(`${index}-${productIndex}`)} className="btn ">Read More</a>
                        }
                        {expandedText[`${index}-${productIndex}`] &&
                          <a onClick={() => toggleExpand(`${index}-${productIndex}`)} className="btn ">Read Less</a>
                        }
                        <a className="btn container-fluid bg-dark mt-2 text-white" onClick={() => handleBuyNow(product.id)}>Buy Now</a>
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
        className="carousel-control-prev carousel-control-prev-responsive"
        type="button"
        data-bs-target="#mobile_analogues"
        data-bs-slide="prev"
      >
        <span className="bi bi-arrow-left-circle-fill text-black fs-1 rounded-5" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next carousel-control-next-responsive"
        type="button"
        data-bs-target="#mobile_analogues"
        data-bs-slide="next"
      >
        <span className="bi bi-arrow-right-circle-fill text-black fs-1 rounded-5" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MobileAnalogueProductCarousel;
