import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState, Dispatch, SetStateAction, } from "react";

/**
 * You may want to hide the scrollbar on the body element
 * of your page while using this navigation.
 * 
 * You can accomplish this using the following css:
    .no-scrollbar::-webkit-scrollbar {
       display: none;
    }
  
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none; 
    }
 */
const Navbar = () => {
    return (
        <SideStaggerNavigation />
    );
};

// Total number of lines on the side of the page
const NUM_LINES = 30;
// Position key will place the title on the Nth
// line of the sidebar
const navItems = [
    { position: 1, title: "Home" },
    { position: 8, title: "Projects" },
    { position: 16, title: "Certifications" },
    { position: 22, title: "Technologies" },
    { position: 28, title: "Contact" },
];

const SideStaggerNavigation = () => {
    const [isHovered, setIsHovered] = useState(false);
    const mouseY = useMotionValue(Infinity);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <motion.nav
                onMouseMove={(e) => {
                    mouseY.set(e.clientY);
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    mouseY.set(Infinity);
                    setIsHovered(false);
                }}
                className="fixed right-0 hidden top-0 lg:flex h-screen flex-col items-end justify-between py-4 pl-8"
            >
                {Array.from(Array(NUM_LINES).keys()).map((i) => {
                    const linkContent = navItems.find((item) => item.position === i + 1);

                    return (
                        <LinkLine
                            title={linkContent?.title}
                            isHovered={isHovered}
                            mouseY={mouseY}
                            key={i}
                        />
                    );
                })}
            </motion.nav>
            {/* <div className="h-screen lg:hidden bg-gradient-to-br from-violet-600 to-indigo-600 grid place-content-center relative"> */}
            <div className="bg-neutral-950 lg:hidden">
                <div className="flex items-center justify-end  bg-transparent text-white">
                    <motion.button
                        whileHover={{ rotate: "180deg" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="text-3xl  text-white hover:text-indigo-500 transition-colors p-4 rounded-full"
                    >
                        <FiMenu />
                    </motion.button>
                </div>
                <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            {/* </div> */}
        </>
    );
};

const SPRING_OPTIONS = {
    mass: 1,
    stiffness: 200,
    damping: 15,
};

const LinkLine = ({
    mouseY,
    isHovered,
    title,
}: {
    mouseY: MotionValue;
    title: string | undefined;
    isHovered: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect();

        return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
    });

    // Styles for non-link lines
    const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
    const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

    // Styles for link lines
    const linkWidth = useSpring(25, SPRING_OPTIONS);

    useEffect(() => {
        if (isHovered) {
            linkWidth.set(150);
        } else {
            linkWidth.set(25);
        }
    }, [isHovered]);

    if (title) {
        return (
            <a href="#">
                <motion.div
                    ref={ref}
                    className="group relative bg-neutral-500 transition-colors hover:bg-indigo-300"
                    style={{ width: linkWidth, height: 2 }}
                >
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-neutral-500 transition-colors group-hover:text-indigo-300"
                            >
                                {title}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </a>
        );
    } else {
        return (
            <motion.div
                ref={ref}
                className="relative bg-neutral-500"
                style={{ width: lineWidth, height: 2 }}
            />
        );
    }
};


// Mobile
const Nav = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div className="relative overflow-hidden">
            <motion.nav
                className="fixed top-0 bottom-0 w-screen z-50 bg-slate-300"
                animate={isOpen ? "open" : "closed"}
                variants={navVariants}
                initial="closed"
            >
                <motion.button
                    className="text-3xl text-black hover:text-indigo-500 border-[1px] border-transparent hover:border-indigo-500 transition-colors p-4 rounded-full absolute top-8 right-8"
                    whileHover={{ rotate: "180deg" }}
                    whileDrag={{ rotate: "180deg" }}
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiX />
                </motion.button>
                <motion.div
                    className="flex flex-col gap-4 absolute bottom-8 left-8"
                    variants={navLinkVariants}
                >
                    <NavLink text="Home" />
                    <NavLink text="Projects" />
                    <NavLink text="Certifications" />
                    <NavLink text="Technologies" />
                    <NavLink text="Contact" />
                </motion.div>
            </motion.nav>
        </div>
    );
};

const NavLink = ({ text }: { text: string }) => {
    return (
        <motion.a
            className="inline-block z-50 text-neutral-950 w-fit font-black text-5xl hover:text-indigo-500 transition-colors"
            variants={navLinkVariants}
            transition={{
                type: "spring",
                damping: 3,
            }}
            whileHover={{
                y: -15,
                rotate: "-7.5deg",
            }}
            rel="nofollow"
            href="#"
        >
            {text}
        </motion.a>
    );
};


const navVariants = {
    open: {
        x: "0%",
        borderTopLeftRadius: "0vw",
        borderBottomLeftRadius: "0vw",
        opacity: 1,
    },
    closed: {
        x: "100%",
        borderTopLeftRadius: "50vw",
        borderBottomLeftRadius: "50vw",
        opacity: 0,
    },
};

const linkWrapperVariants = {
    open: {
        transition: {
            staggerChildren: 0.1,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const navLinkVariants = {
    open: { x: 0 },
    closed: { x: 25 },
};

export default Navbar;