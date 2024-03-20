import React, { useEffect } from "react";
// Lib
import { cn } from "@/lib/utils";
// Props
interface ShortcutProps {
  className?: string;
  keys: string[];
  onShortcutPress?: (e: KeyboardEvent) => void; // eslint-disable-line
}

const Shortcut = ({
  keys,
  className = "",
  onShortcutPress = () => {},
}: ShortcutProps) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const [_, charKey] = keys; // eslint-disable-line

      if (e.key !== charKey) return;

      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        onShortcutPress(e);
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [keys]); // eslint-disable-line

  return (
    <kbd
      className={cn(
        "bg-black/20 text-white pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded  px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto",
        className
      )}
    >
      <span className="text-xs">
        {keys[0]}+{keys[1]?.toUpperCase()}
      </span>
    </kbd>
  );
};

export default Shortcut;
