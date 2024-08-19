import VideoTranslate from "@src/containers/VideoTranslate/VideoTranslate";
import logo from "@src/assets/logo/logo_text.svg";
import ic_warning from "@src/assets/warning.svg";
import ic_close from "@src/assets/close-outline.svg";
import media from "@src/assets/media.png";
import video_demo from "@src/assets/video/video_demo.mp4";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleVideoDemoClick = () => {
    setIsVideoModalOpen(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div className="h-screen relative">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="h-10 w-auto cursor-pointer flex items-end gap-2">
            <img src={logo} alt="logo" className="h-8" />
          </div>
        </div>
        <div className="xl:p-6 p-8 flex flex-col gap-4">
          <div className="flex xl:flex-col xl:gap-6 justify-between w-full">
            <div className="xl:p-0 xl:flex xl:flex-col xl:justify-center xl:w-full xl:text-center p-6 w-fit flex-1 basis-1/2">
              <h2 className="font-semibold text-deepSkyBlue lg:text-4xl text-[40px] leading-tight">
                Elevate your content with AI video
              </h2>
              <p className="mt-1 font-medium text-xl text-gray-600">
                Automated, high-quality, multilingual video creation for
                professionals
              </p>
              <div className="mt-4 flex gap-2 w-full xl:justify-center">
                <button
                  className="bg-gradient px-4 py-3 rounded-full flex gap-2"
                  onClick={handleVideoDemoClick}
                >
                  <span className="font-semibold text-white">Video demo</span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#FFF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12L10 9V15L15 12Z"
                        stroke="#FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="xl:w-full xl:flex xl:justify-center w-fit xl:pr-0 pr-6">
              <img
                src={media}
                alt="media"
                className="md:h-48 sm:h-40 h-64 w-auto"
              />
            </div>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl">
            <VideoTranslate
              errorMessage={errorMsg}
              setErrorMessage={setErrorMsg}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="fixed bottom-0 right-0 size-fit py-3 px-4 bg-yellow-300 rounded-lg m-6 shadow-md z-50 flex items-center justify-center transform animate-[fade-in_1s_ease-in-out]">
            <div className="flex gap-1 items-center">
              <img src={ic_warning} className="size-4" />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg relative">
              <button
                className="absolute top-2 right-2"
                onClick={handleCloseModal}
              >
                <img src={ic_close} className="size-6" />
              </button>
              <video
                ref={videoRef}
                controls
                className="rounded-lg"
                width="720"
                height="480"
                autoPlay
              >
                <source src={video_demo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
