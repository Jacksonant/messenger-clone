import prisma from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
