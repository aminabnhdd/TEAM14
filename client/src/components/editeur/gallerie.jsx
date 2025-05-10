
// gallery to display the images inserted in a section
// used the lightbox library

import { useState } from "react";
import "../../componentsStyles/editeur/gallerie.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Icon } from "@iconify/react";

import { useNavigate } from "react-router-dom";

const Gallerie = ({ slides,isExpert =true }) => {
  const [index, setIndex] = useState(-1);
  const navigate = useNavigate();
  return (
    <div className="gallerie-wrapper">
      <div className="gallerie-container">
        {slides.map((slide, i) => (
          <div
            key={`img-${i}`}
            className="gallerie-image"
            onClick={() => setIndex(i)}
          > {isExpert &&
            <button
              className="annotate-icon-button"
              onClick={(e) => {
                e.stopPropagation();

                navigate("/ai", { state: { src: slide.src } });
              }}
            >
              <Icon icon="mingcute:pic-ai-line" width="24" height="24" />
            </button>}
            <img
              src={slide.src}
              alt={`Image ${i + 1}`}
              className="gallerie-img"
              loading="lazy"
              decoding="async"
            />
            <div className="gallerie-overlay"></div>
          </div>
        ))}
      </div>

        {/* full screen display that allow zoom and download */}
      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          descriptionTextAlign: "center",
          description: ({ index }) => `${index + 1} / ${slides.length}`,
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides.map((slide, i) => ({
          ...slide,
          src: slide.src,
          title: `${i + 1} / ${slides.length}`,
        }))}
        carousel={{
          preload: 2, // Only preload adjacent images
        }}
        zoom={{
          maxZoomPixelRatio: 2,
          scrollToZoom: true,
        }}
      />
    </div>
  );
};

export default Gallerie;
