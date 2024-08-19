import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import video_demo from "@src/assets/video/video_demo.mp4";
import introduction_video from "@src/assets/video/introduction.mp4";

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contentArr = [
  {
    title: "Did You Know? 👀",
    description:
      "Our AI can transform your document into a video in over 20 languages!",
  },
  {
    title: "Introduce Doctranslate 🎥",
    description:
      "Multilingual, high-quality video presentations at your fingertips.",
    videoSrc: introduction_video,
  },
  {
    title: "Pro Tip 😎",
    description:
      "Customize your video with our easy-to-use templates for a professional finish.",
  },
  {
    title: "Video Demo 🎥",
    description: `Multilingual, high-quality video at your fingertips.`,
    videoSrc: video_demo,
  },
  {
    title: "Fun Fact 🤯",
    description:
      "Adding visuals to your presentations can increase viewer retention by up to 80%.",
  },
  {
    title: "Be Patient 🤗",
    description: "Your video is being tailored with precision. Hang tight!",
  },
  {
    title: "Behind the Magic 😉",
    description:
      "We're synchronizing voiceovers with visuals to ensure a seamless experience.",
  },
];

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  const [contentArray, setContentArray] = useState(contentArr);
  const [contentIndex, setContentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (contentArray[contentIndex].videoSrc) {
      // If the content is a video, wait for the video to finish before moving on
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error("Video playback failed:", error);
        });
        videoRef.current.addEventListener("ended", handleVideoEnd);
      }
    } else {
      // If the content is not a video, switch content every 8 seconds
      interval = setInterval(() => {
        setContentIndex((prevIndex) => (prevIndex + 1) % contentArray.length);
      }, 8000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [contentIndex, contentArray]);

  const handleVideoEnd = () => {
    const nextIndex = contentIndex + 1;

    // Remove the current video from the array
    const newContentArray = contentArray.filter(
      (_, index) => index !== contentIndex
    );

    setContentArray(newContentArray);
    setContentIndex((prevIndex) =>
      nextIndex >= newContentArray.length ? 0 : prevIndex
    );
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen text-center">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={
                "inline-block max-w-3xl p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              }
            >
              {/* Render content based on the current index */}
              <iframe
                className="w-full"
                src="https://lottie.host/embed/31f7c7c7-a32b-4c36-94ff-444087783d9a/FawVTQSzwN.json"
              ></iframe>
              {contentArray[contentIndex].videoSrc ? (
                <div className="w-full">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold leading-6 text-gray-800">
                      {contentArray[contentIndex].title}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {contentArray[contentIndex].description}
                    </p>
                  </div>
                  <video
                    ref={videoRef}
                    muted
                    controls
                    autoPlay
                    className="rounded-lg w-full"
                    onEnded={handleVideoEnd} // Move to the next content when the video ends
                  >
                    <source
                      src={contentArray[contentIndex].videoSrc}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-6 text-gray-800">
                      {contentArray[contentIndex].title}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {contentArray[contentIndex].description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingModal;
