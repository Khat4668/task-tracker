import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { Link } from "react-router";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  as?: "h1" | "h2" | "div";
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
};

const EmptyState = ({
  icon,
  title,
  description,
  as: Title = "div",
  actionLabel,
  onAction,
  actionHref,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-xl border border-dotted border-foreground/40 flex items-center justify-center mb-4">
        {icon}
      </div>
      <Title className="font-medium mb-1.5">{title}</Title>
      <div className="text-sm text-muted-foreground leading-relaxed max-w-64">
        {description}
      </div>
      {actionLabel &&
        (actionHref ? (
          <Button asChild className="mt-5">
            <Link to={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button className="mt-5" onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </div>
  );
};

export default EmptyState;
