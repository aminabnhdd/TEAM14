import { useState, useEffect, useRef } from "react";

import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import casbah from './casbah.jpg';

export default function AI() {
    const [crop, setCrop] = useState({ unit: '%', x: 25, y: 25, width: 50, height: 50 });
    const [completedCrop, setCompletedCrop] = useState(null);
  return (
    <>
      <div className="flex relative max-w-full ">
        <SideNav className="" />
        <div className="flex-1 w-full bg-white main-content">
          <SearchBar />
          <main>
            <div className="mt-5 bg w-[86%] mx-auto mb-10">
              <div className="flex justify-between align-items mb-5"></div>
              <h1 className="titles text-black">
                Annoter Illustration avec IA
              </h1>
              <div className="flex justify-between">
                {/* Left Section */}
                <div className="overflow-hidden h-[100px]px-10 py-7.5 border border-neutral-300 rounded-[12px] w-[70%]">

                  <div className="rounded-[12px]">
                    <ReactCrop
                      crop={crop}
                      onChange={setCrop}
                      onComplete={setCompletedCrop}
                      minWidth={100}
                      minHeight={100}
                    >
                      <img
                        src={casbah}
                        alt="Uploaded preview"
                        className=" max-w-[50%] max-h-[20%]"
                      />
                    </ReactCrop>
                    </div>
                  

                  <div className="flex justify-end w-full">
                   
                  </div>
                </div>
                {/* Right Section */}
                <div className="w-[28%] overflow-y-auto">
                  <h1> here annot </h1>
                  {/*
                  <Annotations annotations={annotations} />*/}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
