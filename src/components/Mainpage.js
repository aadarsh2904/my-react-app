import React, { useState, useEffect, useRef } from 'react';
import cloudImage from './cloud.png';
import Xarrow from 'react-xarrows';
import './Mainpage.css';
import crossImage from './cross.jpg'; // Import the cross image

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen size is mobile initially
  const containerRef = useRef(null);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Three-line button */}
      <button className="menu-btn" onClick={handleMenuClick}>
        &#8801;
      </button>

      {/* Cross button to close */}
      {open && (
        <button className={`close-btn ${isMobile && 'mobile-hover'}`} onClick={handleCloseClick}>
          <img src={crossImage} alt="Close" style={{ position: 'absolute', top: '10px', right: '10px', width: '50px', zIndex: 10 }} />
        </button>
      )}

      {/* Conditionally render the container with transition */}
      <div
        className="container"
        style={{
          transform: open ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.5s ease-in-out',
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: 'white',
          zIndex: 5,
        }}
        ref={containerRef}
      >
        {/* Render cloud image with text overlay only for non-mobile or when sidebar is closed */}
        {(!isMobile || !open) && (
          <div className="cloud-container">
            <img src={cloudImage} alt="Cloud" className="cloud-image" id="cloud-image" />
            <div className="cloud-text" id="cloud-text">
              <p>Let's us know</p>
              <p>where you want to go</p>
            </div>
          </div>
        )}

        {/* Render sidebar for mobile */}
        {isMobile && open && (
           <div className="sidebar-mobile">
           <a href="#your-link">
             <div className="sidebar-item">Change Theme</div>
           </a>
           <a href="#your-link">
             <div className="sidebar-item">Search and Comment on your Friends</div>
           </a>
           <a href="#your-link">
             <div className="sidebar-item">Your Profile</div>
           </a>
           <a href="#your-link">
             <div className="sidebar-item">More Links</div>
           </a>
         </div>
        )}

        {/* Render divs for laptop */}
        {!isMobile && (
          <div className="arrow-container">
            <div className="hello top-left" id="top-left">
              <a href="#your-link">
                <div>Change Theme</div>
              </a>
            </div>
            <div className="hello bottom-left" id="bottom-left">
              <a href="#your-link">
                <div>Search and comment on your friends</div>
              </a>
            </div>
            <div className="hello top-right" id="top-right">
              <a href="#your-link">
                <div>Your Profile</div>
              </a>
            </div>
            <div className="hello bottom-right" id="bottom-right">
              <a href="#your-link">
                <div>More Links</div>
              </a>
            </div>
          </div>
        )}

        {/* Xarrows */}
        {!isMobile && (
          <>
            <Xarrow
              start="cloud-text" // ID of the cloud text element
              end="top-left" // ID of the top-left div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-text" // ID of the cloud text element
              end="bottom-left" // ID of the bottom-left div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-text" // ID of the cloud text element
              end="top-right" // ID of the top-right div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.3}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-text" // ID of the cloud text element
              end="bottom-right" // ID of the bottom-right div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
