import React from "react";

interface TagHtmlProps {
  children: React.ReactNode;
  isClosed?: boolean;
  className?: string;
}

export default function TagHtml({
  children,
  isClosed,
  className,
}: TagHtmlProps) {
  return (
    <code
      className={`font-laBelleAurore select-none text-muted-foreground block ${className}`}
    >
      <span>&lt;{isClosed ? "/" : ""}</span>
      {children}
      <span>&gt;</span>
    </code>
  );
}
