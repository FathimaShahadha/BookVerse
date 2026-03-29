import React, { Children } from 'react';
import {
  BookOpenIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-navy text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="w-6 h-6 text-amber" />
              <span className="font-serif text-xl font-bold tracking-tight">
                BookVerse
              </span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Your curated independent online bookshop. We believe in the magic
              of stories and the power of a good book to change your world.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-cream/50 hover:text-amber transition-colors">

                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream/50 hover:text-amber transition-colors">

                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream/50 hover:text-amber transition-colors">

                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Fiction & Literature
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Non-Fiction
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Science & Technology
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Children's Books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Academic & Textbooks
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-amber text-sm transition-colors">

                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">
              Stay Connected
            </h3>
            <p className="text-cream/70 text-sm mb-4">
              Subscribe to our newsletter for curated recommendations and
              exclusive offers.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-cream/50 focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber transition-colors" />

              </div>
              <button
                type="button"
                className="bg-amber hover:bg-[#c39463] text-navy font-medium py-2.5 rounded-lg text-sm transition-colors">

                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-cream/50 hover:text-amber text-sm transition-colors">

              Privacy Policy
            </a>
            <a
              href="#"
              className="text-cream/50 hover:text-amber text-sm transition-colors">

              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}