import React from "react";
import { useLanguage } from './TranslationContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import americanFlagImg from "./language-img/american-flag.png";
import germanFlagImg from "./language-img/germany-flag.png";

// Define types for props
interface LanguageSelectorProps {
  onChangeLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChangeLanguage }) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    onChangeLanguage(selectedLanguage);
  };

  return (
    <DropdownButton
      title={language === "en" ? (
        <>
          <img src={americanFlagImg} alt="American Flag" className="language-img" style={{ height: '30px', marginRight: '5px' }} />
        </>
      ) : (
        <>
          <img src={germanFlagImg} alt="German Flag" className="language-img" style={{ height: '30px', marginRight: '5px' }} />
        </>
      )}
      className=""
      style={{ marginRight: '20px' }}
    >
      <Dropdown.Item
        onClick={() => handleLanguageChange("en")}
        eventKey="en"
      >
        <img src={americanFlagImg} alt="American Flag" className="language-img" style={{ height: '30px', marginRight: '5px' }} /> English
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleLanguageChange("de")}
        eventKey="de"
      >
        <img src={germanFlagImg} alt="German Flag" className="language-img" style={{ height: '30px', marginRight: '5px' }} /> German
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSelector;
