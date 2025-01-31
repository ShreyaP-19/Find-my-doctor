import React from 'react'
import './homeFooter.css'
import findDoc from "../assets/findDoc.png"

function HomeFooter() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Enable smooth scrolling
    });
  };

  return (
    <div>
        <div style={{height:"50px"}}></div>
      <footer>
              <div className="footpanel1">
                <a onClick={scrollToTop} className='back-to-top'>Back to top</a>
              </div>
              <div className="footpanel3">
                <img id="findDoc" src={findDoc} alt=""  />
              </div>
              <div className="footpanel4">
                  <div className="copy">
                      <a>© 2025-2030, Find My Dr., Inc. or its affiliates</a>
                  </div>
              </div>
          </footer>
    </div>
  )
}

export default HomeFooter
