export type Service = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  /** Optional looping reel, e.g. `/videos/services/events.mp4` */
  video?: string;
  span: string;
  titleClass: string;
};

export const services: Service[] = [
  {
    slug: "event-coverage",
    index: "01",
    title: "Single & Multi-Camera Event Coverage",
    tag: "Live capture",
    description:
      "Launches, galas, and branded nights — intimate single-cam or full multi-cam scale, cut to the energy in the room.",
    // Your uploaded concert confetti photograph
    image: "/images/confetti.png", 
    video: "https://pexels.com",
    span: "md:col-span-2 min-h-[22rem] md:min-h-0",
    titleClass: "text-3xl md:text-5xl max-w-xl",
  },
  {
    slug: "corporate-conference",
    index: "02",
    title: "Corporate & Conference Video Production",
    tag: "Stage & recut",
    description:
      "Keynotes, panels, and highlight films that hold the room — then travel cleanly after the lights go down.",
    // Your uploaded audience conference photograph
    image: "/images/audience.png", 
    video: "https://pexels.com",
    span: "md:col-span-1 md:row-span-2 min-h-[28rem] md:min-h-0",
    titleClass: "text-3xl md:text-4xl max-w-sm",
  },
  {
    slug: "animation",
    index: "03",
    title: "Animation & Motion Design",
    tag: "Motion",
    description:
      "Titles, explainers, and graphic packages that live inside the picture — not pasted on top of it.",
    // Your uploaded retro hardware photograph
    image: "/images/retro-hardware.png", 
    video: "https://pexels.com",
    span: "md:col-span-1 min-h-[20rem] md:min-h-0",
    titleClass: "text-2xl md:text-3xl max-w-xs",
  },
  {
    slug: "creative-post",
    index: "04",
    title: "Creative Direction & Post-Production",
    tag: "Finish",
    description:
      "Look development, edit, colour, and sound — one through-line from first frame to delivery.",
    // Your uploaded timeline video editing photograph
    image: "/images/timeline.png", 
    video: "https://pexels.com",
    span: "md:col-span-1 min-h-[20rem] md:min-h-0",
    titleClass: "text-2xl md:text-3xl max-w-xs",
  },
];
