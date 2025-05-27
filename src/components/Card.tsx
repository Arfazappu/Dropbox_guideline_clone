import React, {
  useEffect,
  useRef,
  useState,
  ForwardedRef,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CardProps {
  title: string;
  colorClass?: string;
  initialImage?: string;
  hoverImage?: string;
  imagePosition?: string;
  bgColor: string;
  extraClasses?: string;
  scrollProgress?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      colorClass,
      initialImage,
      hoverImage,
      imagePosition = "",
      bgColor,
      extraClasses = "",
      scrollProgress,
    }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const centerCardRef = useRef<HTMLDivElement>(null);

    useGSAP(
      () => {
        if (scrollProgress !== undefined && scrollProgress === 0) {
          const tl = gsap.timeline();

          tl.fromTo(
            "#dropbox-logo path",
            {
              strokeDasharray: 100,
              strokeDashoffset: 100,
              stroke: "#0062fe",
              fill: "none",
              opacity: 0,
            },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
              onComplete: () => {
                gsap.set("#dropbox-logo path", {
                  stroke: "none",
                  fill: "#0062fe",
                });
              },
            }
          );

          tl.to("#logo-wrapper", {
            bottom: 20,
            left: 20,
            width: "60px",
            height: "60px",
            position: "absolute",
            ease: "power2.inOut",
          });

          tl.fromTo(
            ".center-text",
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1.2,
              ease: "power1.inOut",
            },
            "-=0.5"
          );
        }
      },
      { scope: centerCardRef }
    );

    useEffect(() => {
      if (scrollProgress !== undefined) {
        if (scrollProgress > 0) {
          gsap.to("#dropbox-logo path", {
            fill: "white",
            stroke: "none",
            duration: 0.1,
            ease: "power1.inOut",
          });

          gsap.to(".svg-chevron", {
            opacity: 0,
          });
        } else if (scrollProgress === 0) {
          gsap.to("#dropbox-logo path", {
            fill: "none",
            stroke: "#0062fe",
            duration: 0.1,
            ease: "power1.inOut",
          });
        }
      }
    }, [scrollProgress]);

    return (
      <div
        ref={ref}
        className={`text-white ${extraClasses}`}
        style={{ backgroundColor: bgColor }}
      >
        <div
          className={`flex relative flex-col h-full w-full p-4 transition-[hover 0.5s ease-linear] ${colorClass} ${
            title !== "" ? "hover:bg-[#1a1918] cursor-pointer" : ""
          } hover:text-white transition-colors duration-500 ease-linear`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {scrollProgress !== undefined ? (
            <div ref={centerCardRef}>
              <div className="z-10 relative text-[28px] font-semibold transition-all duration-500 ease-linear">
                {scrollProgress == 0 ? (
                  <p className="center-text text-4xl font-bold text-balance text-[#0062fe]">
                    At Dropbox, our Brand Guideline help us infuse everything we
                    make with identity.
                  </p>
                ) : scrollProgress > 0 && scrollProgress < 0.33 ? (
                  <p className="text-3xl font-bold text-balance text-white">
                    From icons to illustration, logos to language, this
                    collection is the foundation for how Dropbox looks, feels,
                    and sounds like Dropbox.
                  </p>
                ) : null}
              </div>
              <div
                id="logo-wrapper"
                className="absolute bottom-40 left-40 w-[200px] h-[200px]"
              >
                <svg
                  id="dropbox-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42.4 39.5"
                  width="100%"
                  height="100%"
                >
                  <path
                    fill={scrollProgress > 0 ? "white" : "#0062fe"}
                    d="M10.6 1.7L0 8.5l10.6 6.7 10.6-6.7zm21.2 0L21.2 8.5l10.6 6.7 10.6-6.7zM0 22l10.6 6.8L21.2 22l-10.6-6.8zm31.8-6.8L21.2 22l10.6 6.8L42.4 22zM10.6 31l10.6 6.8L31.8 31l-10.6-6.7z"
                  />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0062fe"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="center-text svg-chevron lucide lucide-chevrons-down-icon lucide-chevrons-down absolute bottom-5 right-5 animate-bounce"
              >
                <path d="m7 6 5 5 5-5" />
                <path d="m7 13 5 5 5-5" />
              </svg>
            </div>
          ) : (
            <>
              <h2 className="z-10 relative text-[28px] font-semibold ">
                {title}
              </h2>
              {initialImage && (
                <img
                  src={isHovered && hoverImage ? hoverImage : initialImage}
                  alt={title}
                  className={`absolute ${imagePosition}`}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
