"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export async function createGame(title: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to create a game.")
  }

  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    throw new Error("A game description is required.")
  }

  const [game] = await db
    .insert(games)
    .values({ orgId, title: trimmedTitle })
    .returning()

  revalidatePath("/", "layout")

  return game
}
