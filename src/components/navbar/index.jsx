import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import { navbarStyles } from "./navbarStyles";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "+ Listing", href: "/addlisting" },
  { name: "My Profile", href: "/profile" },
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={navbarStyles.container}>
      <header className={navbarStyles.header}>
        <nav className={navbarStyles.nav} aria-label="Global">
          <div className={navbarStyles.logoContainer}>
            <a href="#" className={navbarStyles.logo}>
              <span className="sr-only">Your Company</span>
              <FontAwesomeIcon icon={faGavel} style={{ color: "#101828" }} />
            </a>
          </div>
          <div className={navbarStyles.mobileButton}>
            <button
              type="button"
              className={navbarStyles.mobileButton}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className={navbarStyles.navLinks}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={navbarStyles.link}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className={navbarStyles.authLink}>
            <a href="#" className={navbarStyles.link}>
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className={navbarStyles.dialog}
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className={navbarStyles.dialogPanel}>
            <div className="flex items-center justify-between">
              <a href="#" className={navbarStyles.logo}>
                <span className="sr-only">Your Company</span>

                <FontAwesomeIcon icon={faGavel} style={{ color: "#101828" }} />
              </a>
              <button
                type="button"
                className={navbarStyles.mobileButton}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className={navbarStyles.navLinks}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={navbarStyles.mobileMenuLink}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a href="#" className={navbarStyles.mobileMenuLink}>
                  Log in
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className={navbarStyles.relativeContainer}>
        <div className={navbarStyles.absoluteContainer}>
          <div className={navbarStyles.gradientShape} />
        </div>
      </div>
    </div>
  );
}
