import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const MainFooter = () => {
  const d = useMemo(() => new Date(), []);
  let year = useMemo(() => d.getFullYear(), [d]);
  return (
    <footer className="bg-primary text-white flex flex-col text-sm p-4 px-20">
      <div className="flex flex-col justify-between items-center py-4 md:flex-row">
        <div className="flex flex-col justify-center items-center  gap-2">
          <p className="mb-4 text-lg">Follow us</p>
          <div className="flex items-center justify-center gap-4">
            <a
              className="cursor-pointer hover:text-secondary"
              href="https://www.facebook.com/"
              target={`_blank`}
            >
              <BsFacebook />
            </a>
            <a
              className="cursor-pointer hover:text-secondary"
              href="https://www.instagram.com/"
              target={`_blank`}
            >
              <BsInstagram />
            </a>
            <a
              className="cursor-pointer hover:text-secondary"
              href="https://twitter.com/?lang=en"
              target={`_blank`}
            >
              <BsTwitter />
            </a>
          </div>
          <div className="md:hidden w-[80vw] border-b-[1px] border-gray-400 my-4"></div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center gap-2">
          <p className="text-lg">Support</p>
          <Link to="/contact" className="hover:text-secondary">
            Contact
          </Link>
          <Link to="/about" className="hover:text-secondary">
            About us
          </Link>
        </div>
        <div className="md:hidden w-[80vw] border-b-[1px] border-gray-400 my-4"></div>

        <div className="flex flex-col my-4 justify-center items-center gap-2 text-gray-400">
          <p className="text-lg text-white"> Our Address</p>
          <p>0KM-5, Pokhara</p>
          <p>9800101010</p>
        </div>
        <div className="md:hidden w-[80vw] border-b-[1px] border-gray-400 my-4"></div>
      </div>
      <div className="text-gray-400">
        <p>© The Happy Reader {year}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default React.memo(MainFooter);
