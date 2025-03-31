import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

export default function ListSections(props) {
  const [isSticky, setIsSticky] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 130);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setListOpen(false);
      }
    };

    if (listOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listOpen]);


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 130; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setListOpen(false);
  };

  function toggleOpen() {
    setListOpen(!listOpen);
  }

  return (
    <div className={`fixed left-[115px] z-[4000] transition-all duration-300 ${isSticky ? 'top-[130px]' : 'top-[225px]'}`}>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={toggleOpen}
          className="border border-neutral-400 bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300"
        >
          <FontAwesomeIcon 
            icon={faList} 
            className="text-xl w-5 h-5" 
          />
        </button>

        {/* List dropdown */}
        {listOpen && (
          <div className="absolute  left-0 mt-2 w-42 bg-white rounded-[12px] shadow-lg overflow-hidden transition-all duration-300 transform origin-top border border-neutral-400">
            <ul className="py-1">
              {props.sectionsExistantes.map((section, index) => (
                <li key={index}  >
                  <button 
                    className="capitalize block w-full text-left px-4 py-2 text-md text-black cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() =>scrollToSection((props.projet.sections.find(sec => 
                        sec.type === section)
                      )._id)}
                  >
                    {index+1}. {section}
                  </button>
                </li>
              
              ))}
                {props.projet.references.length>0  && <li >
                <button
                  className="capitalize block w-full text-left px-4 py-2 text-md text-black cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() =>scrollToSection('section-references')}
                >
                 {props.sectionsExistantes.length+1}.  Références
                </button>
              </li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}