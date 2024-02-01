import { motion } from "framer-motion";

const ButtonDownload = () => {
    return (
        <div className="grid min-h-[200px] place-content-center bg-transparent p-4">
            <WetPaintButton />
        </div>
    );
};

const WetPaintButton = () => {
    const download = () => {
        const link = document.createElement("a");
        link.href = "https://drive.usercontent.google.com/u/0/uc?id=1JeAgkUFdJhYYqjXPNjeqD7kW3yvF2T9k&export=download";
        link.download = "https://drive.usercontent.google.com/u/0/uc?id=1JeAgkUFdJhYYqjXPNjeqD7kW3yvF2T9k&export=download";
        link.click();
    }
    return (
        <button onClick={download} className="group relative rounded bg-indigo-600 px-4 py-2.5 font-semibold hover:cursor-pointer text-white transition-colors hover:bg-indigo-700">
            Download CV
            <Drip left="10%" height={24} delay={0.5} />
            <Drip left="30%" height={20} delay={3} />
            <Drip left="57%" height={10} delay={4.25} />
            <Drip left="85%" height={16} delay={1.5} />
        </button>
    );
};

interface DripProps {
    left: string;
    height: number;
    delay: number;
}

const Drip = ({ left, height, delay }: DripProps) => {
    return (
        <motion.div
            className="absolute top-[99%] origin-top"
            style={{
                left,
            }}
            initial={{ scaleY: 0.75 }}
            animate={{ scaleY: [0.75, 1, 0.75] }}
            transition={{
                duration: 2,
                times: [0, 0.25, 1],
                delay,
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 2,
            }}
        >
            <div
                style={{ height }}
                className="w-2 rounded-b-full bg-indigo-600 transition-colors group-hover:bg-indigo-700"
            />
            <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-full top-0"
            >
                <g clipPath="url(#clip0_1077_28)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
                        className="fill-indigo-600 transition-colors group-hover:fill-indigobg-indigo-700"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
                        className="fill-indigp-600 transition-colors group-hover:fill-indigobg-indigo-700"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1077_28">
                        <rect width="6" height="6" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-full top-0 rotate-90"
            >
                <g clipPath="url(#clip0_1077_28)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
                        className="fill-indigo-600 transition-colors group-hover:fill-indigobg-indigo-700"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
                        className="fill-indigo-600 transition-colors group-hover:fill-indigobg-indigo-700"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1077_28">
                        <rect width="6" height="6" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <motion.div
                initial={{ y: -8, opacity: 1 }}
                animate={{ y: [-8, 50], opacity: [1, 0] }}
                transition={{
                    duration: 2,
                    times: [0, 1],
                    delay,
                    ease: "easeIn",
                    repeat: Infinity,
                    repeatDelay: 2,
                }}
                className="absolute top-full h-2 w-2 rounded-full bg-indigo-600 transition-colors group-hover:bg-indigo-700"
            />
        </motion.div>
    );
};

export default ButtonDownload;