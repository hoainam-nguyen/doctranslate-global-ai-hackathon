// import React, { useState } from "react";
// import clsx from "clsx";
// import logo from "@src/assets/logo/logo.svg";
// import logo_text from "@src/assets/logo/logo_text.svg";

// const Sidebar = () => {
//   // const [openSidebar, setopenSidebar] = useState<boolean>(true);
//   return (
//     <>
//       <button className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-gray-200">
//         <svg
//           className="size-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>
//       <aside
//         className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl"
//         aria-label="sidebar"
//       >
//         <div className="h-full px-4 py-6 overflow-y-auto flex flex-col gap-16">
//           <div
//             className="h-10 w-auto cursor-pointer flex items-end gap-2"
//           >
//             <img src={logo} alt="logo" className="h-9" />
//             <img src={logo_text} alt="logo" className="w-auto h-7" />
//           </div>
//           <ul className="space-y-4 font-medium px-2">
//             <li>
//               <a
//                 href="/"
//                 className={clsx(
//                   location.pathname === "/" && "bg-blue-50",
//                   "flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-blue-50 gap-2"
//                 )}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipPath="url(#clip0_109_3419)">
//                     <path
//                       d="M23.121 9.06887L15.536 1.48287C14.5973 0.546856 13.3257 0.0212402 12 0.0212402C10.6744 0.0212402 9.40277 0.546856 8.46401 1.48287L0.879012 9.06887C0.599438 9.34665 0.377782 9.67717 0.226895 10.0413C0.0760072 10.4053 -0.0011104 10.7958 1.20795e-05 11.1899V21.0069C1.20795e-05 21.8025 0.316083 22.5656 0.878692 23.1282C1.4413 23.6908 2.20436 24.0069 3.00001 24.0069H21C21.7957 24.0069 22.5587 23.6908 23.1213 23.1282C23.6839 22.5656 24 21.8025 24 21.0069V11.1899C24.0011 10.7958 23.924 10.4053 23.7731 10.0413C23.6222 9.67717 23.4006 9.34665 23.121 9.06887ZM15 22.0069H9.00001V18.0729C9.00001 17.2772 9.31608 16.5142 9.87869 15.9515C10.4413 15.3889 11.2044 15.0729 12 15.0729C12.7957 15.0729 13.5587 15.3889 14.1213 15.9515C14.6839 16.5142 15 17.2772 15 18.0729V22.0069ZM22 21.0069C22 21.2721 21.8947 21.5264 21.7071 21.714C21.5196 21.9015 21.2652 22.0069 21 22.0069H17V18.0729C17 16.7468 16.4732 15.475 15.5355 14.5373C14.5979 13.5997 13.3261 13.0729 12 13.0729C10.6739 13.0729 9.40216 13.5997 8.46448 14.5373C7.5268 15.475 7.00001 16.7468 7.00001 18.0729V22.0069H3.00001C2.7348 22.0069 2.48044 21.9015 2.29291 21.714C2.10537 21.5264 2.00001 21.2721 2.00001 21.0069V11.1899C2.00094 10.9248 2.1062 10.6709 2.29301 10.4829L9.87801 2.89987C10.4417 2.3388 11.2047 2.02381 12 2.02381C12.7953 2.02381 13.5583 2.3388 14.122 2.89987L21.707 10.4859C21.8931 10.6731 21.9983 10.9259 22 11.1899V21.0069Z"
//                       fill="#374957"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_109_3419">
//                       <rect width="24" height="24" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 <span>Home</span>
//               </a>
//             </li>
//             <li>
//               <div
//                 className={clsx(
//                   "flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-blue-50 gap-2 cursor-pointer"
//                 )}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipPath="url(#clip0_109_3798)">
//                     <path
//                       d="M23 14H22V5C21.9984 3.67441 21.4711 2.40356 20.5338 1.46622C19.5964 0.528882 18.3256 0.00158786 17 0L7 0C5.67441 0.00158786 4.40356 0.528882 3.46622 1.46622C2.52888 2.40356 2.00159 3.67441 2 5V14H1C0.734784 14 0.48043 14.1054 0.292893 14.2929C0.105357 14.4804 0 14.7348 0 15C0 15.2652 0.105357 15.5196 0.292893 15.7071C0.48043 15.8946 0.734784 16 1 16H11V20H9C8.20435 20 7.44129 20.3161 6.87868 20.8787C6.31607 21.4413 6 22.2044 6 23C6 23.2652 6.10536 23.5196 6.29289 23.7071C6.48043 23.8946 6.73478 24 7 24C7.26522 24 7.51957 23.8946 7.70711 23.7071C7.89464 23.5196 8 23.2652 8 23C8 22.7348 8.10536 22.4804 8.29289 22.2929C8.48043 22.1054 8.73478 22 9 22H15C15.2652 22 15.5196 22.1054 15.7071 22.2929C15.8946 22.4804 16 22.7348 16 23C16 23.2652 16.1054 23.5196 16.2929 23.7071C16.4804 23.8946 16.7348 24 17 24C17.2652 24 17.5196 23.8946 17.7071 23.7071C17.8946 23.5196 18 23.2652 18 23C18 22.2044 17.6839 21.4413 17.1213 20.8787C16.5587 20.3161 15.7956 20 15 20H13V16H23C23.2652 16 23.5196 15.8946 23.7071 15.7071C23.8946 15.5196 24 15.2652 24 15C24 14.7348 23.8946 14.4804 23.7071 14.2929C23.5196 14.1054 23.2652 14 23 14ZM4 5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2H17C17.7956 2 18.5587 2.31607 19.1213 2.87868C19.6839 3.44129 20 4.20435 20 5V14H4V5Z"
//                       fill="#374957"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_109_3798">
//                       <rect width="24" height="24" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 <span>Templates</span>
//               </div>
//             </li>
//             <li>
//               <div className="h-1 border-b border-gray-300 w-full"></div>
//             </li>
//             <li>
//               <div
//                 className={clsx(
//                   "flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-blue-50 gap-2 cursor-pointer"
//                 )}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipPath="url(#clip0_109_4194)">
//                     <path
//                       d="M23.0002 11C22.735 11 22.4806 11.1054 22.2931 11.2929C22.1056 11.4804 22.0002 11.7348 22.0002 12C22.0083 14.3253 21.2086 16.5812 19.7377 18.3822C18.2669 20.1831 16.2161 21.4173 13.9361 21.8738C11.6561 22.3303 9.28826 21.9807 7.2374 20.8849C5.18654 19.789 3.57995 18.0148 2.69224 15.8657C1.80454 13.7165 1.69082 11.3257 2.37053 9.10201C3.05024 6.87828 4.48118 4.95966 6.41876 3.67407C8.35634 2.38849 10.6803 1.81575 12.9934 2.05377C15.3064 2.29179 17.465 3.32578 19.1002 4.979C19.0673 4.98797 19.0339 4.99498 19.0002 5H16.0002C15.735 5 15.4806 5.10536 15.2931 5.29289C15.1056 5.48043 15.0002 5.73478 15.0002 6C15.0002 6.26522 15.1056 6.51957 15.2931 6.70711C15.4806 6.89464 15.735 7 16.0002 7H19.0002C19.7959 7 20.5589 6.68393 21.1215 6.12132C21.6841 5.55871 22.0002 4.79565 22.0002 4V1C22.0002 0.734784 21.8949 0.48043 21.7073 0.292893C21.5198 0.105357 21.2654 0 21.0002 0C20.735 0 20.4806 0.105357 20.2931 0.292893C20.1056 0.48043 20.0002 0.734784 20.0002 1V3.065C17.9528 1.23453 15.3391 0.162166 12.5961 0.0271026C9.85299 -0.107961 7.14666 0.702457 4.92929 2.32293C2.71192 3.94341 1.11785 6.27578 0.413437 8.9303C-0.290973 11.5848 -0.0630447 14.4007 1.05913 16.9074C2.18131 19.414 4.12976 21.4596 6.57889 22.7024C9.02803 23.9451 11.8295 24.3097 14.5151 23.7353C17.2007 23.1608 19.6079 21.682 21.3343 19.5461C23.0607 17.4101 24.0017 14.7464 24.0002 12C24.0002 11.7348 23.8949 11.4804 23.7073 11.2929C23.5198 11.1054 23.2654 11 23.0002 11Z"
//                       fill="#374957"
//                     />
//                     <path
//                       d="M12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6Z"
//                       fill="#374957"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_109_4194">
//                       <rect width="24" height="24" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 <span>History</span>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
