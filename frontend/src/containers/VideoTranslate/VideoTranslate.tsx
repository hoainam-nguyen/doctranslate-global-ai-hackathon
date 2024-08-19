import SelectLanguage from "@src/components/SelectLanguage/SelectLanguage";
import SelectVoice from "@src/components/SelectVoice/SelectVoice";
import { useAppSelector } from "@src/hooks/reduxHook";
import { creatorService } from "@src/services/creatorServices";
import { useRef, useState } from "react";
import { getFileSize, isFileTooLarge, setIconFile } from "@src/utils/fileUtils";
import ic_close from "@src/assets/close-outline.svg";
import { shortString } from "@src/utils/formatUtils";
import LoadingModal from "@src/components/LoadingModal/LoadingModal";
import DownloadModal from "@src/components/DownloadModal/DownloadModal";

const MAX_FILE_SIZE_MB = 1;

type VideoTranslateProps = {
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
};

const VideoTranslate = ({ setErrorMessage }: VideoTranslateProps) => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [languageNameDest, setLanguageNameDest] = useState<string>("English");
  const [languageCodeDest, setLanguageCodeDest] = useState<string | null>("en");
  const [voice, setVoice] = useState<string>("Man");
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [videoFilename, setVideoFilename] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isCreatingVideo = useAppSelector(
    (state) => state.create.isCreatingVideo
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFileInput(null);
    setVideoUrl(null);
    setVideoFilename(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && isFileTooLarge(file, MAX_FILE_SIZE_MB)) {
      setErrorMessage(
        `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`
      );
      setFileInput(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setFileInput(file);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async () => {
    if (!fileInput) {
      setErrorMessage("Please upload your file to create video");
      return;
    } else if (!languageCodeDest) {
      setErrorMessage("Please select a target language for your video");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("dest_lang", languageCodeDest);
      formData.append("voice", voice.toUpperCase());

      const res = await creatorService.createVideo(formData);
      setVideoUrl(res.data.url_download);
      setVideoFilename(res.data.filename);
      setErrorMessage(null);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMessage("The file is too large or the request is invalid.");
      } else {
        setErrorMessage("An error occurred while creating the video.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center w-full relative">
        <div className="grid grid-cols-5 gap-5 w-full">
          <div className="xl:col-span-2 md:col-span-5">
            <SelectLanguage
              languageName={languageNameDest}
              setLanguageName={setLanguageNameDest}
              languageCode={languageCodeDest}
              setLanguageCode={setLanguageCodeDest}
            />
          </div>
          <div className="xl:col-span-2 md:col-span-5">
            <SelectVoice voiceType={voice} setVoiceType={setVoice} />
          </div>
        </div>
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-200">
          <div className="flex flex-col items-center justify-between h-full py-6 px-4">
            <div className="flex flex-col justify-center items-center">
              <svg
                className="size-10 mb-2 text-deepSkyBlue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-1 font-medium text-gray-700">
                Drag and drop your document here{" "}
                <span className="font-normal">or</span>
              </p>
              <button className="px-4" onClick={handleFileUpload}>
                <span className="text-deepSkyBlue font-semibold">
                  Upload and create your video
                </span>
              </button>
            </div>
            <p className="text-xs text-[#717171] text-center">
              File types supported: MS PowerPoint(.pptx), PDF | The maximum file
              size: {MAX_FILE_SIZE_MB}MB
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept=".pptx,.pdf"
            onChange={handleFileChange}
          />
        </label>
        {fileInput && (
          <>
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold">Your uploaded file</p>
              <div className="flex gap-2 items-center w-full px-4 py-2 justify-between border border-gray-200 rounded-md">
                <div className="flex gap-2 items-center">
                  <div className="size-6 flex-shrink-0">
                    {setIconFile(fileInput.name, "w-full h-auto")}
                  </div>
                  <p className="sm:block hidden">
                    {shortString(fileInput.name, 200)}
                  </p>
                  <p className="block sm:hidden">
                    {shortString(fileInput.name, 10)}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span>{getFileSize(fileInput.size)}</span>
                  <button
                    className="rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                    onClick={() => removeFile()}
                  >
                    <img src={ic_close} alt="close" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <button
          onClick={handleSubmit}
          disabled={isLoading || isCreatingVideo}
          className="px-12 py-3 bg-gradient text-white font-semibold rounded-full"
        >
          {isLoading ? "Creating video..." : "Create video"}
        </button>
        {isLoading && (
          // popup modal
          <>
            <LoadingModal
              isOpen={isLoading}
              onClose={() => setIsLoading(false)}
            />
          </>
        )}
        {videoUrl && (
          <>
            <DownloadModal
              isOpen={videoUrl !== null}
              onClose={() => {
                setVideoUrl(null);
                setVideoFilename(null);
              }}
              downloadUrl={videoUrl!}
              fileName={videoFilename!}
            />
          </>
        )}
      </div>
    </>
  );
};

export default VideoTranslate;
