import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
	title: "Insighta | The Apex of Learning",
	description:
		"Elevate your learning experience with our cutting-edge platform - where knowledge meets innovation.",
};

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ReactQueryProvider>
				<body className={poppins.className}>{children}</body>
			</ReactQueryProvider>
			<Toaster />
		</html>
	);
}
