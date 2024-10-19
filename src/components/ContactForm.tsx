import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "./TranslationContext";
import "../assets/css/style.css";
import { Linkedin, Instagram } from "react-bootstrap-icons"; // Import Bootstrap icons
import Form from "react-bootstrap/Form";

interface Product {
  id: string;
  name: string;
}

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  firma: string;
  message: string;
  selectedOptions: string[];
}

interface FormErrors {
  vorname?: string;
  nachname?: string;
  email?: string;
  firma?: string;
  message?: string;
  selectedOptions: string[];
}

const ContactForm: React.FC = () => {
  const language = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    firma: "",
    message: "",
    selectedOptions: [],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    selectedOptions: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [labels, setLabels] = useState({
    contactLabel: "Contact Us",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    businessLabel: "Business Name",
    agreementText: "I agree to the terms and conditions.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    instagramLabel: "Instagram",
    chooseProduct: "Choose Product",
    messageLabel: "Message",
    submitButton: "Submit",
    // Add any other labels you need
  });

  useEffect(() => {
    if (language.language === "en") {
      setLabels({
        contactLabel: "Contact",
        firstNameLabel: "First name",
        lastNameLabel: "Last name",
        businessLabel: "Business",
        agreementText:
          "I agree that my details will be collected and processed to answer my query. Further information can be found in the data protection declaration.",
        emailLabel: "E-mail",
        phoneLabel: "Phone Number",
        linkedinLabel: "@juhuu",
        instagramLabel: "@juhuu_app",
        chooseProduct: "Choose Product",
        messageLabel: "Message",
        submitButton: "Submit",
      });
    } else if (language.language === "de") {
      setLabels({
        contactLabel: "Kontakt",
        firstNameLabel: "Vorname",
        lastNameLabel: "Nachname",
        businessLabel: "Firma",
        agreementText:
          "Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage erhoben und verarbeitet werden. Weitere Informationen finden Sie in der Datenschutzerklärung.",
        emailLabel: "E-mail",
        phoneLabel: "+436609919009",
        linkedinLabel: "@juhuu",
        instagramLabel: "@juhuu_app",
        chooseProduct: "Produkt wählen",
        messageLabel: "Nachricht",
        submitButton: "ABSENDEN",
      });
    }
  }, [language.language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.juhuu.app/v1/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the ReCAPTCHA response
    const recaptchaResponse = await captchaRef.current?.executeAsync();
    if (!recaptchaResponse) {
      setErrorMessage("Please verify that you are human.");
      return;
    }

    // Validate form data
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        // Send emails using emailjs
        await emailjs.sendForm(
          "test_service_id", // replace with your service ID
          "template_icbiouh", // replace with your template ID
          e.target as HTMLFormElement,
          "pFiM-j2klEe5Ra2qr" // replace with your public key
        );

        await emailjs.sendForm(
          "service_sdrpbke", // replace with your service ID
          "template_0bxinnz", // replace with your template ID
          e.target as HTMLFormElement,
          "u2A2El51hkznvTwCJ" // replace with your public key
        );

        // Reset form data and ReCAPTCHA
        setFormData({
          vorname: "",
          nachname: "",
          email: "",
          firma: "",
          message: "",
          selectedOptions: [],
        });
        captchaRef.current?.reset();
        setSuccessMessage("Your email was sent successfully!");
        setErrorMessage("");
        toast.success("Your email was sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
        setErrorMessage("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: FormData): FormErrors => {
    let errors: FormErrors = { selectedOptions: [] };
    if (!data.vorname.trim()) {
      errors.vorname = "First name is required";
    }
    if (!data.nachname.trim()) {
      errors.nachname = "Last name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.firma.trim()) {
      errors.firma = "Business name is required";
    }
    if (!data.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  return (
    <section className="ftco-section pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center my-5">
            <h1
              className="heading-section display-1"
              style={{ fontWeight: "bolder" }}
            >
              {labels.contactLabel}
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              {/* Contact Information Section */}
              <div className="row mb-1">
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="">
                      <a
                        href="mailto:office@juhuu.app"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <span
                          className="fa fa-envelope fa-3x"
                          style={{ marginBottom: 10 }}
                        />
                      </a>
                    </div>
                    <a
                      href="mailto:office@juhuu.app"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="text">
                        <p>office@juhuu.app</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="">
                      <a
                        href="tel:+436609919009"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <span
                          className="fa fa-phone fa-3x"
                          style={{ marginBottom: 10 }}
                        />
                      </a>
                    </div>
                    <div className="text">
                      <a
                        href="tel:+436609919009"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p>+43&nbsp;660&nbsp;9919&nbsp;009</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="">
                      <a
                        href="https://www.linkedin.com/company/juhuu-app/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Linkedin
                          size={50}
                          style={{ marginBottom: 10, color: "black" }}
                        />
                      </a>
                    </div>
                    <a
                      href="https://www.linkedin.com/company/juhuu-app/"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="text">
                        <p>{labels.linkedinLabel}</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="">
                      <a
                        href="https://www.instagram.com/juhuu_app"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Instagram
                          size={50}
                          style={{ marginBottom: 10, color: "black" }}
                        />
                      </a>
                    </div>
                    <a
                      href="https://www.instagram.com/juhuu_app"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="text">
                        <p>{labels.instagramLabel}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form and Image Section */}
              <div className="row no-gutters">
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                    {/* Error and Success Messages */}
                    <div id="form-message-warning" className="mb-4">
                      {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <div id="form-message-success" className="mb-4">
                      {successMessage && (
                        <p>Your message was sent, thank you!</p>
                      )}
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row">
                        {/* First Name */}
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="vorname"
                              id="get-in-touch-sec3-h1_h1"
                            >
                              {labels.firstNameLabel}
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                formErrors.vorname ? "is-invalid" : ""
                              }`}
                              name="vorname"
                              id="vorname"
                              placeholder={labels.firstNameLabel}
                              value={formData.vorname}
                              onChange={handleChange}
                            />
                            {formErrors.vorname && (
                              <div className="invalid-feedback">
                                {formErrors.vorname}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="col-md-6 mb-1">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="nachname"
                              id="get-in-touch-sec3-h1_h2"
                            >
                              {labels.lastNameLabel}
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                formErrors.nachname ? "is-invalid" : ""
                              }`}
                              name="nachname"
                              id="nachname"
                              placeholder={labels.lastNameLabel}
                              value={formData.nachname}
                              onChange={handleChange}
                            />
                            {formErrors.nachname && (
                              <div className="invalid-feedback">
                                {formErrors.nachname}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-1">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="email"
                              id="get-in-touch-sec3-h1_h4"
                            >
                              {labels.emailLabel}
                            </label>
                            <input
                              type="email"
                              className={`form-control ${
                                formErrors.email ? "is-invalid" : ""
                              }`}
                              name="email"
                              id="email"
                              placeholder={labels.emailLabel}
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {formErrors.email && (
                              <div className="invalid-feedback">
                                {formErrors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Business Name */}
                        <div className="col-md-6 mb-1">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="firma"
                              id="get-in-touch-sec3-h1_h4"
                            >
                              {labels.businessLabel}
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                formErrors.firma ? "is-invalid" : ""
                              }`}
                              name="firma"
                              id="firma"
                              placeholder={labels.businessLabel}
                              value={formData.firma}
                              onChange={handleChange}
                            />
                            {formErrors.firma && (
                              <div className="invalid-feedback">
                                {formErrors.firma}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Products Select */}
                        <div className="col-md-12 mb-1">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="selectedOptions"
                            >
                              {labels.chooseProduct}
                            </label>
                            <Form.Select
                              aria-label="Product Select"
                              name="selectedOptions"
                              id="selectedOptions"
                              value={
                                formData.selectedOptions.length
                                  ? formData.selectedOptions[0]
                                  : ""
                              }
                              onChange={handleChange}
                            >
                              <option value="" disabled>
                                {labels.chooseProduct}
                              </option>
                              {products.map((product) => (
                                <option key={product.id} value={product.name}>
                                  {product.name}
                                </option>
                              ))}
                            </Form.Select>
                            {formErrors.selectedOptions && (
                              <div className="invalid-feedback">
                                {formErrors.selectedOptions}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="col-md-12 mb-1">
                          <div className="form-group mb-3">
                            <label
                              className="label fw-bold fs-5 mb-1"
                              htmlFor="message"
                              id="get-in-touch-sec3-h1_h5"
                            >
                              {labels.messageLabel}
                            </label>
                            <textarea
                              name="message"
                              className={`form-control ${
                                formErrors.message ? "is-invalid" : ""
                              }`}
                              id="message"
                              cols={30}
                              rows={4}
                              placeholder={labels.messageLabel}
                              value={formData.message}
                              onChange={handleChange}
                            />
                            {formErrors.message && (
                              <div className="invalid-feedback">
                                {formErrors.message}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* ReCAPTCHA */}
                        <div className="col-md-12">
                          <ReCAPTCHA
                            ref={captchaRef}
                            sitekey={
                              process.env.REACT_APP_RECAPTCHA_SITE_KEY || "6LfUS2YqAAAAAKgV9_UqNzGEb5KbVlTHsi-e0VXu"
                            }
                            size="invisible"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="col-md-12">
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-submit text-white fw-bold mt-2 mb-2"
                              style={{ backgroundColor: "#7017ff" }}
                              // onClick="sendMail()"
                            >
                              {labels.submitButton}
                            </button>
                            <div className="submitting" />
                          </div>
                        </div>

                        {/* Agreement Text */}
                        <div className="col-md-12">
                          <p id="get-in-touch-sec3-p_p2">
                            {labels.agreementText}
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Image Section */}
                <div className="col-md-5 d-flex align-items-stretch form-img">
                  <div
                    className="info-wrap w-100 p-5 img"
                    style={{
                      backgroundImage: "url(/assets/img/images/logo.jpg)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
