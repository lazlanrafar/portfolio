import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import Link from "next/link";
import { Navigation } from "./sidebar.Constant";

interface Props {
  item: Navigation;
  onClick?: () => void;
}

export default function AppSidebarLink({ item, onClick }: Props) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={item.link} onClick={onClick}>
            <span className="sr-only">{item.title}</span>
            <item.icon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          <p className="">{item.content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
