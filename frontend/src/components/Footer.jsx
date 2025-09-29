// import React from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import footerLogo from '../assets/footerlogo.jpg'
// import { FaFacebook, FaInstagram, FaLink, FaTwitterSquare } from 'react-icons/fa'

// const Footer = () => {
//     const navigate = useNavigate();

//   // ✅ Scrolls page to top after navigation
//   const handleNavigation = (path) => {
//     navigate(path);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   return (
//     <footer className='bg-gray-800 text-[#ffffff] py-10'>
//       <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
//         {/*  info */}
//         <div className='mb-6 md:mb-0'>
//           <Link to='/' className='flex gap-3 items-center'>
//             {/* <img src={Logo} alt="" className='w-32'/> */}
//             <img src={footerLogo} alt="" className='w-16 h-16 ' />
//             {/* <p>Nirmaya Care</p> */}

//           </Link>
//           <p className='mt-2'>Helping you live healthier, confidently informed.</p>
//           <p className='mt-2 text-sm'>Hisar, Haryana</p>
//           <p className='text-sm'>Email: nirmayacare01@gmail.com</p>
//           <p className='text-sm'>Phone: +91 91086 30772</p>
//         </div>
//         {/* customer service link */}
//         <div className='mb-6 md:mb-0'>
//           <h3 className='text-xl font-semibold'>Quick Links</h3>
//           <ul className='mt-2 text-sm space-y-2'>
//             <li>Home</li>
//             <li>Blogs</li>
//             <li>About Us</li>
//             {/* <li>Contact Us</li> */}
//             <li>FAQs</li>
//           </ul>
//         </div>

//           <div className="mb-6 md:mb-0">
//       <h3 className="text-xl font-semibold">Quick Links</h3>
//       <ul className="mt-2 text-sm space-y-2">
//         <li
//           onClick={() => handleNavigation("/")}
//           className="cursor-pointer hover:text-blue-500 transition"
//         >
//           Home
//         </li>
//         <li
//           onClick={() => handleNavigation("/blogs")}
//           className="cursor-pointer hover:text-blue-500 transition"
//         >
//           Blogs
//         </li>
//         <li
//           onClick={() => handleNavigation("/about")}
//           className="cursor-pointer hover:text-blue-500 transition"
//         >
//           About Us
//         </li>
//         {/* <li onClick={() => handleNavigation("/contact")}>Contact Us</li> */}
//         <li
//           onClick={() => handleNavigation("/faqs")}
//           className="cursor-pointer hover:text-blue-500 transition"
//         >
//           FAQs
//         </li>
//       </ul>
//     </div>

//         {/* social media links */}
//         <div className='mb-6 md:mb-0'>
//           <h3 className='text-xl font-semibold'>Follow Us</h3>
//           <div className='flex space-x-4 mt-2'>
//             <a
//               href="https://www.facebook.com/yourProfile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-600 transition-colors"
//             >
//               <FaFacebook />
//             </a>

//             <a
//               href="https://www.instagram.com/niramaya.care/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-500 transition-colors"
//             >
//               <FaInstagram />
//             </a>

//             <a
//               href="https://x.com/Niramaya__Care"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-sky-500 transition-colors"
//             >
//               <FaTwitterSquare />
//             </a>

//             <a
//               href="https://www.linkedin.com/in/niramaya-care-770205384/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-gray-500 transition-colors"
//             >
//               <FaLink />
//             </a>
//           </div>
//         </div>
//         {/* newsletter subscription */}
//         <div>
//           <h3 className='text-xl font-semibold'>Join Our Team</h3>
//           <p className='mt-2 text-sm'>Together, let's build a healthier, better-informed community.</p>
//           <form action="" className='mt-4 flex'>
//             <input
//               type="email"
//               placeholder='Your email address'
//               className='w-full p-2 rounded-l-md bg-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500'
//             />
//             <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md '>Apply</button>
//           </form>
//         </div>
//       </div>
//       {/* bottom section */}
//       <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
//         <p>Made in Harayana ❤ ||  &copy; {new Date().getFullYear()} <span className='text-white'>Article</span>. All rights reserved</p>
//       </div>
//     </footer>
//   )
// }

// export default Footer
import React from "react";
import { useNavigate } from "react-router-dom";
import footerLogo from "../assets/footerlogo.jpg";
import { FaFacebook, FaInstagram, FaLink, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  // ✅ Smooth scroll and navigate
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {/* ─────────────── Info Section ─────────────── */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <img src={footerLogo} alt="Niramaya Care" className="w-16 h-16" />
            <h2 className="text-2xl font-bold text-white">Niramaya Care</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Helping you live healthier, confidently informed.
          </p>
          <div className="space-y-1 text-sm">
            <p>Hisar, Haryana</p>
            <p>
              Email:{" "}
              <a
                href="mailto:nirmayacare01@gmail.com"
                className="hover:text-blue-400"
              >
                nirmayacare01@gmail.com
              </a>
            </p>
            <p>Phone: +91 91086 30772</p>
          </div>
        </div>

        {/* ─────────────── Quick Links ─────────────── */}
        <div className="flex flex-col space-y-2 mt-5 ml-35">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => handleNavigation("/")}
              className="cursor-pointer hover:text-blue-400 transition"
            >
              Home
            </li>
            <li
              onClick={() => handleNavigation("/blogs")}
              className="cursor-pointer hover:text-blue-400 transition"
            >
              Blogs
            </li>
            <li
              onClick={() => handleNavigation("/about")}
              className="cursor-pointer hover:text-blue-400 transition"
            >
              About Us
            </li>
            <li
              onClick={() => handleNavigation("/faqs")}
              className="cursor-pointer hover:text-blue-400 transition"
            >
              FAQs
            </li>
          </ul>
        </div>

        {/* ─────────────── Social Media ─────────────── */}
        <div className="flex flex-col space-y-2 mt-5 ">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <p className="text-sm">
            Stay connected with us through our social platforms.
          </p>
          <div className="flex space-x-5 text-xl mt-2">
            <a
              href="https://www.facebook.com/yourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/niramaya.care/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/Niramaya__Care"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitterSquare />
            </a>
            <a
              href="https://www.linkedin.com/in/niramaya-care-770205384/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaLink />
            </a>
          </div>
        </div>

        {/* ─────────────── Newsletter ─────────────── */}
        <div className="flex flex-col space-y-2 mt-5">
          <h3 className="text-xl font-semibold text-white">Join Our Team</h3>
          <p className="text-sm">
            Together, let’s build a healthier, better-informed community.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full bg-gray-700 rounded-lg overflow-hidden"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2 text-sm bg-gray-700 text-white focus:outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-4 text-sm font-semibold text-white"
            >
              Apply
            </button>
          </form>
        </div>
      </div>

      {/* ─────────────── Footer Bottom ─────────────── */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        <p>
          Made in Haryana ❤️ | &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Niramaya Care</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
