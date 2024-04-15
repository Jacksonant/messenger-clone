"use client"

import clsx from "clsx"
import Link from "next/link";

interface DesktopItemProps {
    href: string;
    label: string;
    icon: any;
    onClick?: () => void;
    active?: boolean;
}

const DekstopItem: React.FC<DesktopItemProps> = (
    { href, label, icon: Icon, onClick, active }
) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <li>
            <Link
                href={href}
                onClick={handleClick}
                className={clsx(
                    "group flex gap-x-3 p-3 text-sm leading-6 text-gray-500 font-semibold rounded-md hover:text-black hover:bg-gray-100",
                    active && "bg-gray-100 text-black"
                )}
            >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}
export default DekstopItem;