import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-zinc-500">Progreso</span>
          <span className="text-xs font-medium text-zinc-400">{percentage}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-dark-700 rounded-full overflow-hidden",
          {
            "h-1.5": size === "sm",
            "h-2.5": size === "md",
            "h-4": size === "lg",
          }
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
