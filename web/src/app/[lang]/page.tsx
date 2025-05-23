import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactElement } from "react";
import Images from "@/constants/images";
import ExemptionForm from "./components/ExemptionForm";
import type { Locale } from "./dictionaries";
import { getDictionary } from "./dictionaries";

const navigations = [
  { name: "Events", href: "#", current: true },
  { name: "Destinations", href: "#", current: false },
  { name: "Articles", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
  { name: "Join Now", href: "#", current: false },
];

const navigation = {
  solutions: [
    { name: "Events", href: "#" },
    { name: "Articles", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Gov Notice", href: "#" },
    { name: "Apps Guide", href: "#" },
  ],
  support: [
    { name: "Destinations", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<ReactElement> {
  const t = await getDictionary(lang);

  return (
    <div className="w-full">
      <Disclosure as="nav" className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-28 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt=""
                  src={Images.logo}
                  className="size-20 object-scale-down"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex h-28 sm:flex-col justify-center items-center">
                <div className="h-14">
                  <div className="flex space-x-4 h-full">
                    {navigations.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "border-b-2 text-black"
                            : "dark:text-gray-300 text-black hover:border-b-2",
                          " px-3 text-sm font-medium flex flex-col items-center justify-center"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigations.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "dark:text-gray-300 text-black hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div>
        <div className="relative">
          <div className="relative">
            <img
              src="https://img.inews.co.id/media/1200/files/inews_new/2019/07/06/Sanur.jpg"
              alt="Image"
              className="w-full h-96 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-start justify-end text-white px-32 pb-10">
              <h1 className="text-4xl font-bold mb-4">Exemption</h1>
              <p className="text-lg">
                {`Understand the criteria and steps for foreign tourists to be
                exempted from Bali's tourist levy. This includes exemption for
                official duties, specific citizenship statuses, or contributions
                to Bali's or Indonesia's development.`}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:px-32">
          <ExemptionForm />
        </div>
      </div>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="space-y-8">
              <img
                alt=""
                src={Images.logo}
                className="size-20 object-scale-down"
              />
              <p className="text-balance text-sm/6 text-gray-600">
                {`Love Bali is a movement started by the Bali Provincial
                Government to enforce a new policy, the Comprehensive
                Development Plan. The goal is to preserve the integrity and
                balance of Bali's nature, its people, and their culture.`}
              </p>
            </div>
            <div className="mt-16 xl:mt-0 w-full">
              <div className="md:grid md:grid-cols-2 md:gap-8 w-full">
                <div>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-sm/6 text-gray-600">
              &copy; 2024 Love Bali, All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
