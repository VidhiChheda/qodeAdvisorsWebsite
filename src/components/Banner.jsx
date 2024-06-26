import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/bannImage.png";
import { BackgroundSVG } from "./ui/Background-SVG";
import Container from "./container/Container";

const Banner = () => {
  // ... previous state and useEffect code ...
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data",
    "objective and emotion-free",
    "carried out by Qode",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  return (
    <div className="relative rounded-b-[3rem] min-h-screen graphik-font-regular flex justify-center overflow-hidden py-8 md:py-16">
      <Container>
        <div className="mx-auto relative z-10">
          <div className="flex flex-col-reverse items-center md:items-start">
            <div className="w-full text-center md:text-left mb-8 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              >
                The best investments are <br className="hidden md:inline" />{" "}
                <span className="text-primary-dark px-2 rounded">
                  <span className="">{currentText}</span>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-dark mb-6 md:mb-10"
              >
                We're an investment firm leveraging quantitative models to drive
                informed and strategic investment decisions.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-dark text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-2xl hover:bg-[#696969] transition duration-300 text-sm sm:text-base md:text-lg"
              >
                Get Started
              </motion.button>
            </div>
            <div className="w-full flex justify-center items-center mx-auto mb-8 md:mb-0">
              <img
                src={bannerImage}
                alt="Data-driven investments"
                className="mx-auto my-auto w-full h-auto max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
