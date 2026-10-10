"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { CoinsIcon, MessageSquareIcon, SquarePenIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Empty, EmptyDescription } from "@/components/ui/empty"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppSidebarProps = {
  games: { id: string; title: string }[]
}

export function AppSidebar({ games }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between group-data-[collapsible=icon]:justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 group-data-[collapsible=icon]:hidden"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
          <span className="font-logo text-base">Sandbox</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={pathname === "/"}
                  size="lg"
                  className="group-data-[collapsible=icon]:p-2!"
                >
                  <SquarePenIcon />
                  <span className="group-data-[collapsible=icon]:hidden">
                    New Game
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            {games.length === 0 ? (
              <>
                <Empty className="border p-2 group-data-[collapsible=icon]:hidden">
                  <EmptyDescription className="text-xs">
                    Your games will live here.
                  </EmptyDescription>
                </Empty>
              </>
            ) : (
              <SidebarMenu className="group-data-[collapsible=icon]:hidden">
                {games.map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <SidebarMenuButton
                      render={<Link href={`/games/${game.id}`} />}
                      isActive={pathname === `/games/${game.id}`}
                    >
                      <span className="truncate">{game.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
            <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger
                    render={
                      <SidebarMenuButton>
                        <MessageSquareIcon />
                        <span className="sr-only">Recents</span>
                      </SidebarMenuButton>
                    }
                  />
                  <PopoverContent side="right" align="start" className="gap-2">
                    <PopoverHeader>
                      <PopoverTitle>Recents</PopoverTitle>
                    </PopoverHeader>
                    {games.length === 0 ? (
                      <p className="text-muted-foreground">
                        Your games will live here.
                      </p>
                    ) : (
                      <SidebarMenu>
                        {games.map((game) => (
                          <SidebarMenuItem key={game.id}>
                            <PopoverClose
                              nativeButton={false}
                              render={
                                <SidebarMenuButton
                                  render={<Link href={`/games/${game.id}`} />}
                                  isActive={pathname === `/games/${game.id}`}
                                >
                                  <span>{game.title}</span>
                                </SidebarMenuButton>
                              }
                            />
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <CoinsIcon />
              <span>Credits</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>$0.67</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  rootBox: "w-full! max-w-full",
                  organizationSwitcherTrigger:
                    "w-full! max-w-full justify-between!",
                  organizatonPreview: "min-w-0",
                  organizationPreviewTextContainer: "min-w-0",
                  organizationPreviewMainIndentifier: "truncate",
                },
              }}
            />
          </div>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
