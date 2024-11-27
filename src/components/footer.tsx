import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

import { Button } from "./ui/button";

interface ILink {
	href: string;
	title: string;
}

interface IFooterLink {
	title: string;
	links: ILink[];
}

interface ISocialLink {
	href: string;
	icon: IconType;
}

export default function Component() {
	return (
		<footer
			className={`absolute bottom-0 max-h-[45.5rem] pt-[4rem] pb-[2.5rem] w-full flex justify-center`}
			style={{
				background:
					"linear-gradient(rgb(23, 23, 23) 0%, rgba(39, 39, 42, 0) 100%)",
			}}
		>
			FOOTER
		</footer>
	);
}

