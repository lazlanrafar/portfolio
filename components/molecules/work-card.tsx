import { cn } from "@/lib/utils";

interface WorkCardProps {
  role: string;
  company: string;
  period: string;
  country?: string;
  className?: string;
}

export function WorkCard({ role, company, period, country = "🇮🇩", className }: WorkCardProps) {
  return (
    <div className={cn("anim group/work w-full space-y-0.5 py-2 text-sm", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-foreground font-semibold">{company}</h3>
        <span>{country}</span>
      </div>
      <div className="flex w-full items-center justify-between gap-x-4">
        <p className="text-muted-foreground line-clamp-1 font-medium">{role}</p>
        <p className="text-muted-foreground hidden text-xs font-medium sm:block">{period}</p>
      </div>
    </div>
  );
}
