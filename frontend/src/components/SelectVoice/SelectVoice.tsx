import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ic_navigate from "@src/assets/navigate_down.svg";
import styles from "./selectVoice.module.scss";

type SelectVoiceProps = {
  voiceType: string;
  setVoiceType: (type: string) => void;
};

const SelectVoice = ({ voiceType, setVoiceType }: SelectVoiceProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const refButton = useRef<HTMLButtonElement | null>(null);
  const refDropdown = useRef<HTMLDivElement | null>(null);

  const voices = ["Man", "Woman"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refDropdown.current &&
        refButton.current &&
        !refDropdown.current.contains(event.target as Node) &&
        !refButton.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDropdown, refButton]);

  const showMenuVoice = () => {
    return (
      <div
        ref={refDropdown}
        className="absolute z-10 mt-2 max-h-[320px] w-full bg-white rounded-lg shadow-lg overflow-y-auto"
      >
        {voices.map((voice, index) => (
          <div
            key={index}
            onClick={() => {
              setVoiceType(voice);
              setShowDropdown(false);
            }}
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <p className="text-text">{voice}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">Voice</p>{" "}
      <div className="relative">
        <button
          ref={refButton}
          onClick={() => setShowDropdown((prev) => !prev)}
          className={clsx(
            styles.btn_select,
            "flex items-center gap-4 justify-between",
            { [styles.focus]: showDropdown }
          )}
        >
          {voiceType === "" ? (
            <p className="text-sm text-[#717171]">Select Voice</p>
          ) : (
            <p className="text-sm truncate">{voiceType}</p>
          )}
          <img
            src={ic_navigate}
            alt="down"
            className={clsx(
              "w-4 h-4 transition duration-500",
              showDropdown ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        {showDropdown && showMenuVoice()}
      </div>
    </div>
  );
};

export default SelectVoice;
