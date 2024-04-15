import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 400 });
    }

    // Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage || conversation.messages.length === 0) {
      // return new NextResponse("No messages found", { status: 400 });
      return NextResponse.json(conversation);
    }

    // Update seen of last message
    const updateMesage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // Create update seen conversation hook
    await pusherServer.trigger(conversationId, "conversation:update", {
      id: conversationId,
      messages: [updateMesage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    // If sender has seen message, create update seen message hook
    await pusherServer.trigger(conversationId, "message:update", updateMesage);

    return NextResponse.json(updateMesage);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
