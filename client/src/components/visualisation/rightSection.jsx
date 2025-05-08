import Presentation from "./presentation";
import Auteurs from "./auteurs";
import { useEffect, useRef, useState } from "react";

export default function RightSection(props) {
  const stickyBoxRef = useRef(null);
  const [height, setHeight] = useState(0);
  const resizeObserverRef = useRef(null);

  // Function to update height
  const updateHeight = () => {
    if (stickyBoxRef.current) {
      const newHeight = stickyBoxRef.current.offsetHeight + 16;
      
      setHeight(newHeight);
    }
  };

  // Setup ResizeObserver and initial height
  useEffect(() => {
    const stickyBox = stickyBoxRef.current;
    if (!stickyBox) return;

    // Initialize ResizeObserver
    resizeObserverRef.current = new ResizeObserver(() => {
      
      updateHeight();
    });

    resizeObserverRef.current.observe(stickyBox);
    updateHeight(); // Initial measurement

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(stickyBox);
      }
    };
  }, []);

  // Update height when content-changing props update
  useEffect(() => {
   
    updateHeight();
  }, [props.collaborateurs, props.projet]); // Add other content-dependent props

  // Handle scroll behavior
  useEffect(() => {
    const stickyBox = stickyBoxRef.current;
    const bottomMarker = document.getElementById("bottom-marker");
    if (!stickyBox || !bottomMarker) return;

    const handleScroll = () => {
      const markerRect = bottomMarker.getBoundingClientRect();
      const shouldBeSticky = (markerRect.top <= height && height>window.innerHeight);

      stickyBox.classList.toggle("sticky", shouldBeSticky);
      stickyBox.classList.toggle("top-0", shouldBeSticky);
      stickyBox.style.top = shouldBeSticky ? `calc(100vh - ${height}px)` : '';
      
      
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [height]);

  return (
    <div 
      ref={stickyBoxRef}
      id="sticky-box" 
      className="border border-neutral-400 ml-6 w-[33%] rounded-[10px] h-full p-7"
    >
      <Presentation isChef={props.isChef} projet={props.projet} />
      {(props.isExpert || props.isAdmin) && (
        <Auteurs
          isChef={props.isChef}
          projet={props.projet}
          setProjet={props.setProjet}
          chef={props.chef}
          collaborateurs={props.collaborateurs}
          setCollaborateurs={props.setCollaborateurs}
          isAdmin={props.isAdmin}
          showPopup={props.showPopup}
          setShowPopup={props.setShowPopup}
          utilisateur={props.utilisateur}
        />
      )}
      <div id="bottom-marker"></div>
    </div>
  );
}