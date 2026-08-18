import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-xl border border-dotted border-foreground/40 flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="font-medium mb-1.5">{title}</div>
      <div className="text-sm text-muted-foreground leading-relaxed max-w-64">
        {description}
      </div>
      {actionLabel && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
