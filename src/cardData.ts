
export const colors = [
  "#273850",
  "#FAD24B",
  "#3cd3ed",
  "#f9551d",
  "#ff8d19",
  "#0062fe",
  "#c7aff0",
  "#b4dd19",
  "#8a2056",
];

export interface CardContent {
  title: string;
  color?: string;
  initialImage?: string;
  hoverImage?: string;
  imagePosition?: string;
}

export const cardContents: CardContent[] = [
  {
    title: "Framework",
    color: "text-[#b6c9e0]",
    initialImage: "/images/img1.png",
    hoverImage: "/images/imgh1.png",
    imagePosition: "bottom-4 left-0",
  },
  {
    title: "Voice & Tone",
    color: "text-[#6D4300]",
    initialImage: "/images/img2.png",
    hoverImage: "/images/imgh2.png",
    imagePosition: "bottom-0 left-0",
  },
  {
    title: "Logo",
    color: "text-[#025367]",
    initialImage: "/images/img3.png",
    hoverImage: "/images/imgh3.png",
    imagePosition: "bottom-2 right-2 w-28",
  },
  {
    title: "Typography",
    color: "text-[#60050D]",
    initialImage: "/images/img4.png",
    hoverImage: "/images/imgh4.png",
    imagePosition: "bottom-4 right-0 w-36",
  },
  {
    title: "Color",
    color: "text-[#6D3105]",
    initialImage: "/images/img6.png",
    hoverImage: "/images/imgh6.png",
    imagePosition: "bottom-4 right-0 w-36",
  },
  {
    title: "",
  },
  {
    title: "Motion",
    color: "text-[#702D6A]",
    initialImage: "/images/img8.png",
    hoverImage: "/images/imgh8.png",
    imagePosition: "bottom-4 right-0",
  },
  {
    title: "Icongraphy",
    color: "text-[#1E5D32]",
    initialImage: "/images/img5.png",
    hoverImage: "/images/imgh5.png",
    imagePosition: "bottom-2 left-0 w-28",
  },
  {
    title: "Imagery",
    color: "text-[#FCACA4]",
    initialImage: "/images/img7.png",
    hoverImage: "/images/imgh7.png",
    imagePosition: "bottom-4 right-4 w-36",
  },
];