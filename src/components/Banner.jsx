import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/newBanner1.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Banner = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 200; // Typing speed in milliseconds
  const deletingSpeed = 90; // Deleting speed in milliseconds
  const delayBetweenTexts = 1000; // Delay between texts in milliseconds
  const textArray = [
    "driven by data",
    "objective and emotion free",
    "carried out by Qode",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      // Typing effect
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, wait and then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      // Deleting effect
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to the next text
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  return (
    <div
      className="flex flex-col md:flex-row items-center graphik-font-regular h-screen justify-center text-right px-4 md:px-10 py-10"
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100%, 100%",
        backgroundPosition: "center",
        backgroundColor: `rgba(255, 255, 255, 0.9)`, // Adjust the opacity here
        backgroundBlendMode: "overlay", // Add this line to blend the background color with the image
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full md:w-2/3 md:px-20 mb-8 md:mb-0">
        <h1 className="text-3xl text-[#171E27] md:text-5xl  font-black graphik-font-semibold">
          The best investments are <br /> {"{"}
          <span className="text-red-500 italic">{currentText}</span>
          {"}"}
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 font-medium mt-4 md:mt-10">
          We're an investment firm leveraging quantitative models to drive
          informed and strategic investment decisions.
        </p>
        <div className="mt-8 text-right  flex justify-end">
          <div
            className="h-full w-full bg-red-500 max-w-3xl p-10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
"
          >
            <p className="text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              viverra consequat magna, id malesuada nisi malesuada at.Lorem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
