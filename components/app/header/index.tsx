import { cn } from "@/lib/utils";

export default function AppHeader({
  onMouseDown,
}: {
  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  function handleHeaderKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  }

  return (
    <header
      className={cn(
        "relative flex cursor-default items-center justify-between overflow-hidden px-4 py-4 lg:cursor-grab lg:active:cursor-grabbing bg-slate-200 dark:bg-[#000000]",
        "hidden lg:flex"
      )}
      onMouseDown={onMouseDown}
      onKeyDown={handleHeaderKeyDown}
    >
      <div className="group absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex">
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          aria-label="Close"
        >
          <div className="h-3 w-3 rounded-full transition-colors bg-[#FF6057]"></div>
        </button>
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          aria-label="Minimize"
        >
          <div className="h-3 w-3 rounded-full transition-colors bg-[#FEBC2D]"></div>
        </button>
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          aria-label="Enter Fullscreen"
        >
          <div className="h-3 w-3 rounded-full transition-colors bg-[#2BC840]"></div>
        </button>
      </div>
      {/* <p className="not-sr-only mx-auto hidden font-semibold select-none lg:block">
        Qwerty.
      </p>
      <p className="not-sr-only mx-auto block font-semibold select-none lg:hidden">
        L Azlan Rafar
      </p> */}

      <div></div>
    </header>
  );
}
