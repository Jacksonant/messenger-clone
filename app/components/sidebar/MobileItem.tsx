"use client"

import clsx from "clsx"
import Link from "next/link";

interface MobileItemProps {
    href: string;
    label: string;
    icon: any;
    onClick?: () => void;
    active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = (
    { href, label, icon: Icon, onClick, active }
) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(
                "group flex gap-x-3 p-4 text-sm leading-6 text-gray-500 font-semibold w-full justify-center hover:text-black hover:bg-gray-100",
                active && "bg-gray-100 text-black"
            )}
        >
            <Icon className="w-6 h-6" />
            <span className="sr-only">{label}</span>
        </Link>
    );
}
export default MobileItem;