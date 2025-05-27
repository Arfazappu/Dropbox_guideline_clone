"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Card from "./Card";
import {colors, cardContents} from "../cardData"

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(() => {
    const cards = cardsRef.current;

    const transforms = [
      { x: "-100vw", y: "-100vh" },
      { y: "-100vh" },
      { x: "50vw", y: "-10vh" },
      { x: "100vw", y: "-100vh" },
      { x: "-50vw", y: "10vh" },
      {},
      { x: "100vw", y: "100vh" },
      { x: "-100vw", y: "100vh" },
      { y: "100vh" },
    ];

    cards.forEach((card, i) => {
      if (card) {
        if (i !== 5) {
          gsap.set(card, transforms[i]);
        } else {
          gsap.set(card, {
            width: "40vw",
            height: "90vh",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            position: "absolute",
            zIndex: 50,
            background: "white",
            border: "1.5px solid #bfd8ff",
          });
        }
      }
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress),
      snap: {
        snapTo: (progress) => {
          if (progress > 0 && progress < 0.05) return 0.15;
          if (progress > 0.4) return 1;
          return progress;
        },
        duration: { min: 0.1, max: 0.3 },
        ease: "power1.inOut",
      },
      animation: gsap
        .timeline()
        .to(cards[5], {
          width: "38.5vw",
          height: "86vh",
          background: "#0062fe",
          border: "none",
          duration: 0.05,
          ease: "power3.out",
        }, 0)
        .to(cards[5], {
          width: "38.5vw",
          height: "86vh",
          duration: 0.1,
        }, 0.05)
        .to(cards[5], {
          width: "105px",
          height: "105px",
          duration: 0.4,
          ease: "power4.out",
        }, 0.2)
        .to(cards.filter((_, i) => i !== 5), {
          x: "0vw",
          y: "0vh",
          ease: "power3.out",
          duration: 0.5,
        }, 0.1),
    });
  }, { scope: containerRef });

  return (
    <div className="h-[200vh] w-full bg-white font-family-montserrat scroll-smooth">
      <div ref={containerRef} className="sticky top-0 h-screen w-full p-2.5 overflow-hidden">
        <div className="grid grid-cols-11 grid-rows-5 gap-2.5 h-full w-full">
          {Array.from({ length: 9 }, (_, index) => {
            const gridClassMap = [
              "col-span-2 row-span-3 rounded-tl-lg",
              "col-span-4 row-span-2",
              "col-span-3 row-span-3",
              "col-span-2 row-span-2 rounded-tr-lg",
              "col-span-3 row-span-3",
              "col-span-1 row-span-1",
              "col-span-2 row-span-3 rounded-br-lg",
              "col-span-2 row-span-2 rounded-bl-lg",
              "col-span-4 row-span-2",
            ];

            return (
              <Card
                key={index}
                ref={el => { cardsRef.current[index] = el!; }}
                title={cardContents[index]?.title}
                colorClass={cardContents[index]?.color}
                initialImage={cardContents[index]?.initialImage}
                hoverImage={cardContents[index]?.hoverImage}
                imagePosition={cardContents[index]?.imagePosition}
                bgColor={colors[index]}
                extraClasses={gridClassMap[index]}
                scrollProgress={index === 5 ? scrollProgress : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
