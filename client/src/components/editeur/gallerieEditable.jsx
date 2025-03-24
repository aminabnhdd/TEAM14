import { useState } from 'react';
import '../../componentsStyles/editeur/gallerie.css';
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
import AddImage from './addImage';
const GallerieEditable = ({slides, setSlides,section}) => {
  const [index, setIndex] = useState(-1);
  const totalImages = 10; // Update this to match your actual number of images

  


  return (
    <div className="gallerie-wrapper">
      <div className="gallerie-container">
        <AddImage images={slides} setImages={setSlides} section={section} />
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="gallerie-image"
            onClick={() => setIndex(index)}
          > 
            <img 
              src={slide.src} 
              alt={`Image ${index + 1}`}
              className="gallerie-img"
            />
            <div className="gallerie-overlay">
              
            </div>
          </div>
        ))}
      </div>

      <Lightbox

        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'center',
          description: ({ index }) => `${index + 1} / ${slides.length}`
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides.map((slide, index) => ({
          ...slide,
          title: `${index + 1} / ${slides.length}`
        }))}
      />
    </div>
  );
};

export default GallerieEditable;