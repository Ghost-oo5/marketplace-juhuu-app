import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from './TranslationContext';

// Define the type for the language context
interface LanguageContext {
  language: string;
}

const Footer: React.FC = () => {
  const location = useLocation();
  const language = useLanguage() as LanguageContext;
  
  // Define variables for text in different languages
  let communityText: string, importantText: string, partnerText: string, conditionsText: string, dataProtectionText: string, imprintText: string, apkDownloadText: string;

  if (language.language === "en") {
    communityText = "Become part of the community!";
    importantText = "IMPORTANT";
    partnerText = "PARTNER FROM";
    conditionsText = "Conditions";
    dataProtectionText = "Data protection";
    imprintText = "Imprint";
    apkDownloadText = "Download APK";
  } else if (language.language === "de") {
    communityText = "Werde Teil der Community!";
    importantText = "WICHTIGES";
    partnerText = "PARTNER VON";
    conditionsText = "AGB";
    dataProtectionText = "Datenschutz";
    imprintText = "Impressum";
    apkDownloadText = "APK herunterladen";
  } else {
    communityText = "";
    importantText = "";
    partnerText = "";
    conditionsText = "";
    dataProtectionText = "";
    imprintText = "";
    apkDownloadText = "";
  }

  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="containerfooter container-fluid p-0">
      <div className="container-fluid p-0">
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-black"
          style={{ backgroundColor: "#f3e8fa" }}
        >
          <section className="container">
            <div className="container text-center text-md-start mt-0 pt-5">
              {/* Grid row */}
              <div className="row mt-5">
                {/* Grid column */}
                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-1">
                  {/* Content */}
                  <div className="logo2 text-left">
                    <a href="./index.html">
                      <img
                        src="/assets/img/images/juhuu_logo.webp"
                        alt="Logo"
                        style={{ height: 50, width: "auto" }}
                      />
                    </a>
                  </div>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p id="home-footer-p">{communityText}</p>
                  <div>
                    <a
                      href="https://www.facebook.com/people/JUHUU-BikeBox/100066980422418/"
                      className="text-black me-4"
                      aria-label="Over facebook page"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCvnF_0V1OPodUzXXk1Vu-5w"
                      className="text-black me-4"
                      aria-label="Over youtube page"
                    >
                      <i className="fab fa-youtube" />
                    </a>
                    <a
                      href="https://www.instagram.com/juhuu.app/"
                      className="text-black me-4"
                      aria-label="Over instagram page"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/juhuu/?originalSubdomain=at"
                      className="text-black me-4"
                      aria-label="Over Linkedin page"
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                  </div>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-1">
                  {/* Links */}
                  <h2
                    className="text-uppercase fw-bold"
                    style={{ fontSize: 15 }}
                    id="home-footer-h2"
                  >
                    JUHUU BikeBox GmbH
                  </h2>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <a
                    href="tel:+436609919009"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>
                      <i className="fas fa-phone mr-3" />{" "}
                      +43&nbsp;660&nbsp;9919&nbsp;009
                    </p>
                  </a>
                  <a
                    href="mailto:office@juhuu.app"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>
                      <i className="fas fa-envelope mr-3" /> office@juhuu.app
                    </p>
                  </a>
                  <a
                    href="https://www.google.at/maps/place/Treustra%C3%9Fe+22-24,+1200+Wien,+%C3%96sterreich/@48.2286409,16.3668449,17z/data=!3m1!4b1!4m6!3m5!1s0x476d07b45e9087e1:0x5bde630233712e59!8m2!3d48.2286409!4d16.3668449!16s%2Fg%2F11c5dqbbrw?hl=de&entry=ttu"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <i className="fas fa-home mr-3" />
                    Treustraße 22-24, 1200
                    <p>Wien Austria</p>
                  </a>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-2">
                  {/* Links */}
                  <h2
                    className="text-uppercase fw-bold"
                    style={{ fontSize: 15 }}
                    id="home-footer-h2_2"
                  >
                    {importantText}
                  </h2>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <a
                    href="https://docs.juhuu.app/agb"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p id="home-footer-p_1">
                      <i className="text-black" /> {conditionsText}
                    </p>
                  </a>
                  <a
                    href="https://juhuu-bikebox.at/en/legal"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p id="home-footer-p_2">
                      <i className="text-black" /> {dataProtectionText}
                    </p>
                  </a>
                  <a
                    href="https://juhuu-bikebox.at/en/legal"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p id="home-footer-p_3">
                      <i className="text-black" /> {imprintText}
                    </p>
                  </a>
                  <a
                    href="https://juhuu-bikebox.at/en/legal"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p id="home-footer-p_4">
                      <i className="text-black" /> Credits
                    </p>
                  </a>
                </div>
                <div className="col-md-5 col-lg-2 col-xl-2 mx-auto mb-2">
                  <h2
                    className="text-uppercase fw-bold"
                    style={{ fontSize: 15 }}
                    id="home-footer-h2_3"
                  >
                    Download
                  </h2>
                  <hr
                    className="mt-0 d-inline-block mx-auto"
                    style={{ width: 50, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="text-black" />
                    <a href="https://play.google.com/store/apps/details?id=com.juhuu_bikebox.juhuu">
                      <img
                        src="/assets/img/images/google_play_download.webp"
                        alt="google_play_download"
                        className="googleplay"
                        style={{ width: 120, height: "auto" }}
                      />
                    </a>
                  </p>
                  <p>
                    <i className="text-black" />
                    <a href="https://apps.apple.com/at/app/juhuu-bikebox/id1603108125">
                      <img
                        src="/assets/img/images/app_store_download.webp"
                        alt="app_store_download"
                        className="appstore"
                        style={{ width: 120, height: "auto" }}
                      />
                    </a>
                  </p>
                  <p className="text-nowrap" id="home-footer-p_5">
                    <a href="https://docs.juhuu.app/apk" className="text-black">
                      {apkDownloadText}
                    </a>
                  </p>
                </div>
                {/* Grid column for Partner von section */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
                  <h2
                    className="text-uppercase fw-bold footerheading"
                    style={{ fontSize: 15 }}
                    id="home-footer-h2_4"
                  >
                    {partnerText}
                  </h2>
                  <hr
                    className="mt-0 d-inline-block mx-auto"
                    style={{ width: 50, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="text-black" />
                    <a href="https://www.a1.net/">
                      <img
                        src="/assets/img/images/a1.webp"
                        alt="a1"
                        className="a1"
                        style={{ width: 120, height: "auto" }}
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div
                className="text-left p-3 pb-4 footer"
                style={{ backgroundColor: "#f3e8fa" }}
              >
                © <span id="copyright-year">{currentYear}</span> Copyright: JUHUU Bikebox
                GmbH
                <p className="text-black">
                  Apple, the Apple logo, iPhone, and iPad are trademarks of Apple
                  Inc., registered in the U.S and other countries. App Store is a
                  service mark of Apple Inc. Google Play and the Google Play logo
                  are trademarks of Google LLC. All other trademarks are the
                  property of their respective owners.
                </p>
              </div>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
