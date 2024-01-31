import { motion, useInView } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import { TextScreen } from "../atoms/TextScreen";

const WorkExperience = () => {
    return (
        <>
            <TextScreen />
            <SwapColumnFeatures />
        </>
    );
};

const SwapColumnFeatures = () => {
    const [featureInView, setFeatureInView] = useState<FeatureType>(features[0]);

    return (
        <section className="relative mx-auto max-w-7xl">
            <SlidingFeatureDisplay featureInView={featureInView} />

            {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
            <div className="-mt-[100vh] hidden md:block" />

            {features.map((s) => (
                <Content
                    key={s.id}
                    featureInView={s}
                    setFeatureInView={setFeatureInView}
                    {...s}
                />
            ))}
        </section>
    );
};

const SlidingFeatureDisplay = ({
    featureInView,
}: {
    featureInView: FeatureType;
}) => {
    return (
        <div
            style={{
                justifyContent:
                    featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
            }}
            className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
        >
            <motion.div
                layout
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                }}
                className="h-fit w-3/5 rounded-xl p-8"
            >
                <ExampleFeature featureInView={featureInView} />
            </motion.div>
        </div>
    );
};

const Content = ({
    setFeatureInView,
    featureInView,
}: {
    setFeatureInView: Dispatch<SetStateAction<FeatureType>>;
    featureInView: FeatureType;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-150px",
    });

    useEffect(() => {
        if (isInView) {
            setFeatureInView(featureInView);
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            className="relative z-0 flex h-fit md:h-screen"
            style={{
                justifyContent:
                    featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
            }}
        >
            <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white">
                        {featureInView.callout}
                    </span>
                    <p className="my-3 text-5xl font-bold">{featureInView.title}</p>
                    <p className="text-slate-600">{featureInView.stack}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-8 block md:hidden"
                >
                    <ExampleFeature featureInView={featureInView} />
                </motion.div>
            </div>
        </section>
    );
};

const ExampleFeature = ({ featureInView }: { featureInView: FeatureType }) => {
    return (
        <div className="relative h-[480px] w-full rounded-xl bg-slate-800 shadow-xl">
            <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="p-2">
                <p className="font-mono text-sm text-slate-200">
                    <span className="text-green-300">~</span> Let me explains what{" "}
                    <span className="inline-block rounded bg-indigo-600 px-1 font-semibold">
                        "{featureInView.title}"
                    </span>{" "}
                    means.
                </p>
                <p className="font-mono mt-5 text-sm text-white">{featureInView.descriptions}</p>
            </div>

        </div>
    );
};

export default WorkExperience;

type FeatureType = {
    id: number;
    callout: string;
    title: string;
    stack: string;
    descriptions: string;
    contentPosition: "l" | "r";
    Icon: IconType;
};

const features: FeatureType[] = [
    {
        id: 1,
        callout: "October 2023",
        title: "Metavulus",
        stack:
            "Tech stack: NextJS, Typescript, Zustand, 3rd Party CMS Srapi, TailwindCSS, Framer Motion, ExpressJS, MongoDB, Google Cloud Storage, JWT, Socket.io, Redis, React Query, AWS Ec2, MongoDB Atlas",
        contentPosition: "r",
        descriptions: "Metavulus is a forex-based web application, comprising a primary landing page and a subdomain dedicated to the main application. The main domain serves as a landing page, featuring articles related to forex, while the subdomain hosts the core application. This application offers a range of features, including a community platform where users can interact with each other. Additionally, it provides an e-learning module that enables users to enhance their understanding of forex through video modules and PDF materials. The comprehensive platform of Metavulus aims to provide users with a holistic experience, combining informational resources with interactive elements and educational tools within the realm of forex trading.",
        Icon: FiEye,
    },
    {
        id: 2,
        callout: "July 2023",
        title: "FastWheels 007",
        stack:
            "Tech stack: React Native, React Native Paper, Expo, Zustand, 3rd Party API Nodemailer, 3rd Party, API Google, 3rd Party API Midtrans, TalkJS, ExpressJS, PostgreSQL, Sequelize, GeoLib, Jest, JWT, Firebase, EJS, AWS Ec2",
        contentPosition: "l",
        descriptions: "A mobile-based application, this app is designed to address a common issue experienced by many people while with their four-wheeled vehicles. This application offers a solution by providing emergency repair services that can be ordered through the app.",
        Icon: FiSearch,
    },
    {
        id: 3,
        callout: "June 2023",
        title: "Pull & Patrick",
        stack:
            "Tech stack: React JS, React Native, Apollo server, GraphQL, MongoDB, PostgreSQL, Redis, Express JS, Docker",
        contentPosition: "r",
        descriptions: "A web and mobile app based online clothing store that that offer a lot convenience.",
        Icon: FiPlay,
    },
    {
        id: 4,
        callout: "May 2023",
        title: "Mengaji",
        stack:
            "Tech stack: Vue, ExpressJS, PostgreSQL, Pinia, 3rd party API ChatGPT, 3rd party API Al-Quran",
        contentPosition: "l",
        descriptions: "A web based reading and listening Al-Quran.",
        Icon: FiSearch,
    },
    {
        id: 5,
        callout: "April 2023",
        title: "Pengen Kerja",
        stack:
            "Tech stack: React JS, 3rd party API for server-side",
        contentPosition: "r",
        descriptions: "A web based job portal.",
        Icon: FiPlay,
    },
];