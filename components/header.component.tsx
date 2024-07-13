"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";

function HeaderComponent() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<header className="fixed inset-x-0 z-50 top-0 text-[#ccc] bg-gradient-to-b from-[#0009319c] to-[#00093100] backdrop-blur">
				<nav
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<Image
								alt=""
								className="object-cover w-[60px] h-auto"
								src={"/assets/insighta-logo.png"}
								width={600}
								height={600}
							/>
						</a>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<Popover.Group className="hidden lg:flex lg:gap-x-12">
						<a
							href="#ranking-section"
							className="text-sm font-semibold leading-6 text-white"
						>
							Rankings
						</a>

						<a
							href="#about-section"
							className="text-sm font-semibold leading-6 text-white"
						>
							Features
						</a>
						<a
							href="#contact-section"
							className="text-sm font-semibold leading-6 text-white"
						>
							Contact
						</a>
						{/* <a
							href="#"
							className="text-sm font-semibold leading-6 text-white"
						>
							Company
						</a> */}
					</Popover.Group>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						{/* <a
							href="#"
							className="transition ml-2 text-sm font-semibold leading-6 text-white px-4 py-2 border rounded-md shadow-sm border-[#ccc] hover:bg-brand-pink hover:text-[#fff] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sea-green"
						>
							Request a Demo <span aria-hidden="true"></span>
						</a> */}
						<a
							href="/login"
							className="transition ml-2 text-sm font-semibold leading-6 text-gray-900 px-4 py-2 border border-transparent rounded-md shadow-sm bg-brand-sea-green hover:text-[#fff] hover:bg-brand-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sea-green"
						>
							Log in <span aria-hidden="true"></span>
						</a>
					</div>
				</nav>
				<Dialog
					as="div"
					className="lg:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-50" />
					<Dialog.Panel className="z-50 fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<Image
									alt=""
									className="object-cover w-[60px] h-auto"
									src={"/assets/insighta-logo.png"}
									width={600}
									height={600}
								/>
							</a>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Product
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Features
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Marketplace
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Company
									</a>
								</div>
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Request a Demo
									</a>
									<a
										href="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>
		</>
	);
}

export default HeaderComponent;
