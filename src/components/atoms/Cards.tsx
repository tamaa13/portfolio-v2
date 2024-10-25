import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";

type ListOrderItem = "front" | "middle" | "back";

const Cards = () => {
  const dragProgress = useMotionValue(0);
  const [order, setOrder] = useState<ListOrderItem[]>([
    "front",
    "middle",
    "back",
  ]);

  const handleDragEnd = () => {
    const x = dragProgress.get();
    if (x <= -50) {
      const orderCopy = [...order];
      orderCopy.unshift(orderCopy.pop() as ListOrderItem);
      setOrder(orderCopy);
    }
  };

  useEffect(() => {
    const FIVE_SECONDS = 5000;

    // Automatically shuffle the list every 5 seconds, so long
    // as it isn't being dragged
    const intervalRef = setInterval(() => {
      const x = dragProgress.get();
      if (x === 0) {
        setOrder((pv) => {
          const orderCopy = [...pv];
          orderCopy.unshift(orderCopy.pop() as ListOrderItem);
          return orderCopy;
        });
      }
    }, FIVE_SECONDS);

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <div className="grid place-content-center overflow-hidden px-8 py-24 text-slate-50">
      <motion.div
        whileTap={{ scale: 0.985 }}
        className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]"
      >
        <Card
          testimonial="As a Web3 Fullstack Engineer, I contributed to the development of Tokenomy, IDRX, and Nusa, focusing on integrating token swap features, staking, bridging across EVM and Solana networks, as well as managing data and indexing systems to enhance the efficiency of blockchain ecosystems.."
          author="Indodax (August 2024 – Present)"
          handleDragEnd={handleDragEnd}
          dragProgress={dragProgress}
          position={order[0]}
          role="Fullstack dApps Engineer"
        />
        <Card
          testimonial="I handle mobile projects using C# and Xamarin."
          author="iSeller Commerce (June 2024 – August 2024)"
          handleDragEnd={handleDragEnd}
          dragProgress={dragProgress}
          position={order[1]}
          role="Mobile Engineer"
        />
        <Card
          testimonial="I am currently engaged in the development of the company profile website for PT Ihsan
                    Solusi. Additionally, I am actively involved in projects centered around Islamic banking as a
                    full-stack developer, utilizing Next.js, PostgreSQL, and TypeScript."
          author="PT Ihsan Solusi Informatika (October 2023 – December 2023)"
          handleDragEnd={handleDragEnd}
          dragProgress={dragProgress}
          position={order[2]}
          role="Fullstack Developer"
        />
        {/* <Card
          testimonial="During my tenure as a freelance Fullstack Developer, I specialized in front-end and back-end
                    technologies to create a wide range of websites, including company profiles and content
                    management systems (CMS)."
          author="Freelance (August 2022 – Present)"
          handleDragEnd={handleDragEnd}
          dragProgress={dragProgress}
          position={order[2]}
          role="Fullstack Developer"
        /> */}
      </motion.div>
    </div>
  );
};

interface CardProps {
  handleDragEnd: Function;
  dragProgress: MotionValue<number>;
  testimonial: string;
  position: ListOrderItem;
  author: string;
  role: string;
}

const Card = ({
  handleDragEnd,
  dragProgress,
  testimonial,
  position,
  author,
  role,
}: CardProps) => {
  const [dragging, setDragging] = useState(false);

  const dragX = useMotionValue(0);

  useMotionValueEvent(dragX, "change", (latest) => {
    // When component first mounts, dragX will be a percentage
    // due to us setting the initial X value in the animate prop.
    if (typeof latest === "number" && dragging) {
      dragProgress.set(latest);
    } else {
      // Default back to 0 so that setInterval can continue
      dragProgress.set(0);
    }
  });

  const onDragStart = () => setDragging(true);

  const onDragEnd = () => {
    setDragging(false);
    handleDragEnd();
  };

  const x = position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
  const rotateZ =
    position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
        x: dragX,
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <span className="text-center text-lg font-bold text-neutral-950">
        {author}
      </span>
      <span className="text-center text-lg italic text-white">
        &quot;{testimonial}&quot;
      </span>
      <span className="text-center text-sm font-medium text-neutral-950">
        {role}
      </span>
    </motion.div>
  );
};

export default Cards;
