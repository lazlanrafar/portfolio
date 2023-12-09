import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import Link from "next/link";
import { Navigation } from "./sidebar.Constant";

export default function AppSidebarLink(item: Navigation) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={item.link}>
            <span className="sr-only">{item.title}</span>
            <item.icon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{item.content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
