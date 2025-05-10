

// gallery to display the images inserted in a section, whith a delete button for each image, and an add buton
// used the lightbox library

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
import DeleteGallerie from './deleteGallerie';

const GallerieEditable = ({ slides, setSlides, section }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <div className="gallerie-wrapper">
      <div className="gallerie-container">
        <AddImage images={slides} setImages={setSlides} section={section} />
        
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="gallerie-image"
            onClick={() => setLightboxIndex(index)}
          >
            <img 
              src={slide.src} 
              alt={`Image ${index + 1}`}
              className="gallerie-img"
            />
            <div className="">
              {/*button to delete an image from the gallerie */}
              <DeleteGallerie 
                slides={slides} 
                setSlides={setSlides} 
                section={section}
                index={index}  // Pass the current index to delete
              />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        caption={{
          descriptionTextAlign: 'center',
          description: ({ index }) => `${index + 1} / ${slides.length}`
        }}
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={slides.map((slide, index) => ({
          ...slide,
          description: `${index + 1} / ${slides.length}`
        }))}
      />
    </div>
  );
};

export default GallerieEditable;