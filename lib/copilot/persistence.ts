import "server-only"
import { prisma } from "@/lib/prisma"
import { type UIMessage } from "ai"

/**
 * Loads a chat session and its messages from the database.
 */
export async function loadChatSession(sessionId: string) {
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  })

  if (!session) return null

  // Convert DB messages to AI SDK UIMessage format
  const messages: UIMessage[] = session.messages.map(msg => ({
    id: msg.id,
    role: msg.role as "user" | "assistant" | "system" | "tool",
    content: msg.content,
    createdAt: msg.createdAt,
    // Add tool calls if present
    ...(msg.toolCalls ? { parts: JSON.parse(JSON.stringify(msg.toolCalls)) } : {})
  }))

  return { ...session, messages }
}

/**
 * Saves a new message to an existing chat session or creates a new session.
 */
export async function saveChatMessage(userId: string, sessionId: string | null, message: { role: string; content: string; toolCalls?: any }) {
  let targetSessionId = sessionId

  if (!targetSessionId) {
    const session = await prisma.chatSession.create({
      data: {
        userId,
        title: message.content.slice(0, 50) + "..."
      }
    })
    targetSessionId = session.id
  }

  return await prisma.chatMessage.create({
    data: {
      sessionId: targetSessionId,
      role: message.role,
      content: message.content,
      toolCalls: message.toolCalls ? JSON.parse(JSON.stringify(message.toolCalls)) : undefined
    }
  })
}

/**
 * Lists all chat sessions for a specific user.
 */
export async function listUserChatSessions(userId: string) {
  return await prisma.chatSession.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true
    }
  })
}
