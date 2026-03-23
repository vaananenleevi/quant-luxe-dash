import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricTooltipProps {
  label: string;
  tooltip: string;
  children?: React.ReactNode;
}

export function MetricTooltip({ label, tooltip, children }: MetricTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1 cursor-help">
          {children || <span>{label}</span>}
          <Info className="h-3 w-3 text-muted-foreground/50 shrink-0" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-muted-foreground">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
