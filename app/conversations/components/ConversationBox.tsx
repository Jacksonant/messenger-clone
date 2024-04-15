"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data)
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email || ""
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage || userEmail) return false;

        const seenArray = lastMessage.seen || []

        return seenArray.filter((user) => user.email === userEmail).length > 0
    }, [userEmail, lastMessage])


    const LastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image'
        }

        if (lastMessage?.body) {
            return lastMessage.body
        }

        return 'Started a conversation'
    }, [lastMessage])

    return (
        <aside
            onClick={handleClick}
            className={
                clsx("w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3", selected ? 'bg-neutral-100' : [hasSeen ? 'bg-white' : 'bg-red-600 animate-bounce'])
            }
        >
            {data.isGroup ? <AvatarGroup users={data.users} />
                : <Avatar user={otherUser} />
            }
            <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-md font-medium text-gray-900">
                        {data.name || otherUser?.name}
                    </p>
                    {lastMessage?.createdAt && (
                        <p className="text-xs text-gray-400 font-light">
                            {format(lastMessage.createdAt, 'p')}
                        </p>
                    )}
                </div>
                <p className={clsx("text-sm truncate", hasSeen ? 'text-gray-500' : 'text-black font-bold')}>
                    {LastMessageText}
                </p>
            </div>
        </aside>
    );
};

export default ConversationBox;
