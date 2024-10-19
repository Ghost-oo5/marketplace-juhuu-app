import React, { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from './TranslationContext';
import "../assets/css/style.css";

interface LanguageText {
  placeholder: string;
  declaration: string;
  dataProtection: string;
  processingAgreement: string;
  subscribe: string;
}

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const language = useLanguage();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      setErrorMessage("Please agree to the privacy policy.");
      return;
    }

    try {
      await emailjs.sendForm(
        "service_sdrpbke",
        "template_newslettersign",
        e.currentTarget,
        "u2A2El51hkznvTwCJ"
      );
      setSuccessMessage("You have successfully subscribed to the newsletter.!");
      setEmail("");
      setIsChecked(false);
      setErrorMessage("");
      toast.success("You have successfully subscribed to the newsletter.!");
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  const renderLanguageSpecificText = (): LanguageText => {
    if (language.language === "en") {
      return {
        placeholder: "Your email address",
        declaration: "By submitting the registration, I declare myself in accordance with the",
        dataProtection: "Data protection",
        processingAgreement: "I agree to the processing of my data",
        subscribe: "Subscribe to the newsletter:"
      };
    } else if (language.language === "de") {
      return {
        placeholder: "Ihre Email Adresse",
        declaration: "Mit dem Absenden der Anmeldung erkläre ich mich entsprechend der",
        dataProtection: "Datenschutzerklärung",
        processingAgreement: "mit der Verarbeitung meiner Daten einverstanden",
        subscribe: "Zum Newsletter anmelden:"
      };
    }

    // Default return value if language is neither 'en' nor 'de'
    return {
      placeholder: "",
      declaration: "",
      dataProtection: "",
      processingAgreement: "",
      subscribe: ""
    };
  };

  const {
    placeholder,
    declaration,
    dataProtection,
    processingAgreement,
    subscribe
  } = renderLanguageSpecificText();

  return (
    <section className="newsletter-section px-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="text-content" style={{ fontSize: "24px", color: "white" }}>
              <h2>
                <i className="bi bi-newspaper" /> {subscribe}
              </h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="action-btn">
              <form onSubmit={handleSubmit}>
                <div className="line d-flex align-items-center justify-content-between mb-2">
                  <input
                    className="email form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    required
                    style={{ width: "100%" }} // Adjust the width as needed
                  />
                  <button className="btn btn-link bg-white text-dark" type="submit" style={{ marginLeft: "10px" }}>
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
                <div className="line d-flex align-items-center">
                  <div className="privacy-checkbox">
                    <input
                      className="checkbox"
                      type="checkbox"
                      id="privacyPolicy"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      required
                    />
                  </div>
                  <label htmlFor="privacyPolicy" className="privacy small" style={{ color: "white", marginLeft: "10px" }}>
                    {declaration}{" "}
                    <a
                      style={{ color: "white", textDecoration: "underline" }}
                      href="https://juhuu-bikebox.at/en/legal"
                    >
                      {dataProtection}
                    </a>{" "}
                    {processingAgreement}.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
