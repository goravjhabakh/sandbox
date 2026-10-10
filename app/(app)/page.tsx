import { auth } from "@clerk/nextjs/server"

import { ChatComposer } from "@/components/chat-composer"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default async function Page() {
  await auth.protect()

  return (
    <div className="flex min-h-svh flex-col items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <img src="/logo.svg" alt="" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl">
            What should we build today?
          </EmptyTitle>
          <EmptyDescription>
            Build your own racers, shooters, puzzles and whole worlds using your
            own words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-2xl">
          <ChatComposer />
        </EmptyContent>
      </Empty>
    </div>
  )
}
