import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { siteConfig } from "@/constants";
import { weeklyCodingActivity } from "@/lib/wakatime";
import {
  AlertCircle,
  AlertTriangle,
  CheckCheck,
  Clock,
  Github,
  RefreshCcw,
  Split,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default async function AppFooter() {
  const { data } = await weeklyCodingActivity();
  const todayData = data[data.length - 1];

  return (
    <div className="absolute left-0 bottom-0 w-full flex items-center justify-between bg-background text-xs border-t z-50">
      <div className="flex items-center border-r divide-x">
        <Link
          target="_blank"
          href={siteConfig.links.github}
          className="flex items-center gap-2 px-2 py-1 bg-blue-900 text-white transition-colors"
        >
          <Split size={13} />
          <p>main</p>
        </Link>
        <button
          aria-label="refetch"
          className="items-center gap-x-2 px-2 py-1 md:flex hidden group hover:text-foreground text-muted-foreground transition-colors"
        >
          <RefreshCcw
            size={13}
            className="text-xl group-active:rotate-180 transition-transform"
          />
        </button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="items-center gap-x-1 px-2 py-1 md:flex hidden text-muted-foreground">
                <XCircle size={13} />
                <p>0</p>
                <AlertTriangle size={13} />
                <p>0</p>
                <AlertCircle size={13} />
                <p>0</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="!border-none">
              No problems
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/activity"
                className="items-center gap-x-1 px-2 py-1 md:flex hidden text-muted-foreground"
              >
                <Clock size={13} className="text-base" />
                <p>{todayData?.grand_total.text}</p>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="!border-none">
              <p>Today coding activity</p>
              <p className="text-sm text-muted-foreground">click for more</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="items-center gap-x-1 px-2 py-1 md:flex hidden text-muted-foreground">
          <p>--NORMAL--</p>
        </div>
      </div>

      <div className="flex items-center divide-x divide border-l">
        <div className="items-center gap-x-2 px-2 py-1 lg:flex hidden text-muted-foreground">
          <CheckCheck size={13} />
          <p>Prettier</p>
        </div>
        <Link
          target="_blank"
          href={siteConfig.links.github}
          className="flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors"
        >
          <p>{siteConfig.username}</p>
          <Github size={13} />
        </Link>
      </div>
    </div>
  );
}
