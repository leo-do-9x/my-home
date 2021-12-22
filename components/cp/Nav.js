import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  GlobeIcon,
  BookmarkAltIcon,
  FilmIcon,
  ReceiptTaxIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import ActiveLink from "./ActiveLink";

export default function Nav() {
  const { pathname } = useRouter();
  const [show, setShow] = useState(false);
  const pathShow = [
    "/cp/english/youglish",
    "/cp/english/dictionary",
    "/cp/english/pronunciation",
  ];

  useEffect(() => {
    if (pathShow.includes(pathname)) {
      setShow(true);
    }
  }, []);

  return (
    <div className="w-64 p-6">
      <div
        className={`-mx-3 p-3 text-sm font-medium flex flex-col rounded-lg cursor-pointer ${
          show ? "" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col rounded-lg justify-center items-center">
          <div
            className="flex w-full justify-center items-center"
            onClick={() => setShow(!show)}
          >
            <GlobeIcon className="h-6 w-6" />
            <span className="text-gray-900 mx-4">English</span>
            {show ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div className={`w-full mt-2 ${show ? "" : "hidden"}`}>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/dictionary"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <BookmarkAltIcon className="h-6 w-6 mr-2" />
                Dictionary
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/youglish"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <FilmIcon className="h-6 w-6 mr-2" />
                Youglish
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/pronunciation"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <VolumeUpIcon className="h-6 w-6 mr-2" />
                Pronunciation
              </p>
            </ActiveLink>
          </div>
        </div>
      </div>
      <ActiveLink activeClassName="bg-gray-100" href="/cp/receipts">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <ReceiptTaxIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Receipts</span>
        </div>
      </ActiveLink>
      <ActiveLink activeClassName="bg-gray-100" href="/cp/body-language">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Body Language</span>
        </div>
      </ActiveLink>
    </div>
  );
}
