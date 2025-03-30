import { useState, useMemo, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import '../../componentsStyles/editeur/gallerie.css';

const Gallerie = ({ slides }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  
  // Process slides with proper image URLs and download support
  const processedSlides = useMemo(() => {
    return slides.map((slide, index) => ({
      src: typeof slide === 'string' ? slide : slide.src,
      download: typeof slide === 'string' ? slide : slide.src,
      title: `${index + 1} / ${slides.length}`,
      alt: typeof slide === 'object' ? slide.alt : `Image ${index + 1}`
    }));
  }, [slides]);

  const handleThumbnailClick = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  return (
    <div className="gallerie-wrapper">
      {/* Thumbnail Grid */}
      <div className="gallerie-container">
        {processedSlides.map((slide, index) => (
          <div 
            key={`thumb-${index}`} 
            className="gallerie-image"
            onClick={() => handleThumbnailClick(index)}
          > 
            <img 
              src={slide.src} 
              alt={slide.alt}
              className="gallerie-img"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'placeholder-image.jpg';
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={handleCloseLightbox}
        slides={processedSlides}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          scrollToZoom: true
        }}
        render={{
          slide: ({ slide, rect }) => (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000'
            }}>
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'placeholder-image.jpg';
                }}
              />
            </div>
          )
        }}
        carousel={{ preload: 2 }}
      />
    </div>
  );
};

export default Gallerie;