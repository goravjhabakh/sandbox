"use client"

import { useState, useTransition } from "react"

import {
  ArrowUpIcon,
  BrushIcon,
  CarIcon,
  ChevronDownIcon,
  CrosshairIcon,
  Gamepad2Icon,
  GripIcon,
  PickaxeIcon,
  PlaneIcon,
  ZapIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createGame } from "@/lib/games/actions"

const models = ["Kimi K3", "Claude Opus 5.5", "GPT-6", "Gemini 3 Pro"]

const suggestions = [
  { label: "Voxel survival", icon: PickaxeIcon },
  { label: "Ink samurai duel", icon: BrushIcon },
  { label: "Comic-book firefight", icon: ZapIcon },
  { label: "Realistic battlefield", icon: PlaneIcon },
  { label: "Fight-first shooter", icon: CrosshairIcon },
  { label: "Jungle expedition drive", icon: CarIcon },
  { label: "Sunny kingdom platformer", icon: Gamepad2Icon },
]

export function ChatComposer() {
  const [title, setTitle] = useState("")
  const [isPending, startTransition] = useTransition()

  function submitGame() {
    if (!title.trim()) {
      return
    }

    startTransition(async () => {
      await createGame(title)
      setTitle("")
    })
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <InputGroup className="bg-popover">
        <InputGroupTextarea
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              submitGame()
            }
          }}
          placeholder="Describe the game you want to build..."
          rows={1}
          className="field-sizing-content max-h-48 min-h-10"
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton>
                  <GripIcon />
                  Kimi K3
                  <ChevronDownIcon />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent className="w-auto">
              {models.map((model) => (
                <DropdownMenuItem key={model}>{model}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            type="button"
            size="icon-lg"
            className="ml-auto rounded-full"
            disabled={!title.trim() || isPending}
            onClick={submitGame}
          >
            <ArrowUpIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.label}
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full font-normal text-muted-foreground"
            onClick={() => setTitle(suggestion.label)}
          >
            <suggestion.icon />
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
