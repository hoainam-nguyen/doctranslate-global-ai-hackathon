import { useEffect, useRef, useState } from "react";
import SearchIcon from "@src/assets/search.svg";
import clsx from "clsx";
import { useAppSelector } from "@src/hooks/reduxHook";
import ic_navigate from "@src/assets/navigate_down.svg";
import styles from "./selectLanguage.module.scss";
import { creatorService } from "@src/services/creatorServices";

type SelectLanguageProps = {
  languageName: string;
  setLanguageName: (name: string) => void;
  languageCode: string | null;
  setLanguageCode: (code: string | null) => void;
};

const SelectLanguage = ({
  languageName,
  setLanguageName,
  setLanguageCode,
  languageCode,
}: SelectLanguageProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [languages, setLanguages] = useState<{ name: string; code: string }[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const refButton = useRef<HTMLButtonElement | null>(null);
  const refDropdown = useRef<HTMLDivElement | null>(null);

  const isCreatingVideo = useAppSelector(
    (state) => state.create.isCreatingVideo
  );

  const fetchLanguages = async () => {
    try {
      const res: any = await creatorService.getLanguages();
      if (res.status === "success") {
        const resLanguages = res.data.map((item: Record<string, string>) => {
          let [name, code] = Object.entries(item)[0];
          name = name.replace(/_/g, " "); // Replace _ with spaces
          return { name, code };
        });
        setLanguages(resLanguages);
      } else {
        console.error("Failed to fetch languages:", res.message);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);


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

  const showMenuLanguage = () => {
    const filteredLanguages = languages.filter((language) =>
      language.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div
        ref={refDropdown}
        className="absolute z-10 mt-2 max-h-[320px] w-full bg-white rounded-lg shadow-lg overflow-y-auto"
      >
        <div className="flex items-center gap-2 px-4 py-2">
          <img src={SearchIcon} alt="search" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={clsx(styles.search_input, "w-full outline-none")}
          />
        </div>
        {/* {detectLanguage && (
          <div
            onClick={() => {
              setLanguageName(t("Detect language"));
              setLanguageCode(null);
              setShowDropdown(false);
            }}
            className={styles.dropdown_item}
          >
            <p className="text-sm">{t("Detect language")}</p>
          </div>
        )} */}
        {filteredLanguages.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setLanguageName(item.name);
              setLanguageCode(item.code);
              setShowDropdown(false);
            }}
            className="px-4 py-3 hover:bg-gray-100"
          >
            <p className="text-text">{item.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">Target language</p>
      <div className="relative">
        <button
          disabled={isCreatingVideo}
          ref={refButton}
          onClick={() => setShowDropdown(!showDropdown)}
          className={clsx(
            styles.btn_select,
            "flex items-center gap-4 justify-between",
            { [styles.focus]: showDropdown }
          )}
        >
          {languageCode === "" ? (
            <p className="text-sm text-[#717171]">Select language</p>
          ) : (
            <p className="text-sm truncate">{languageName}</p>
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
        {showDropdown && showMenuLanguage()}
      </div>
    </div>
  );
};

export default SelectLanguage;
