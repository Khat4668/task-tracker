import { useInlineEdit } from "@/hooks/useInlineEdit";
import { cn } from "@/lib/utils";
import { type KeyboardEvent } from "react";
import { toast } from "sonner";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  validate?: (value: string) => string | null;
  placeholder: string;
  "aria-label"?: string;
};

const EditableText = ({
  value,
  className,
  onSave,
  validate,
  placeholder,
  "aria-label": ariaLabel,
}: Props) => {
  const {
    isEditing,
    ref,
    draft,
    setDraft,
    handleSave,
    handleCancel,
    startEditing,
  } = useInlineEdit<HTMLInputElement>({ value, onSave, validate });

  const handleSaveWithToast = () => {
    const error = handleSave();
    if (error) {
      toast.error(error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleCancel();
    if (event.key === "Enter") handleSaveWithToast();
  };

  if (isEditing) {
    return (
      <input
        className={cn(
          "px-2 py-1 border border-transparent bg-transparent outline-none placeholder:text-muted-foreground",
          className,
        )}
        type="text"
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSaveWithToast}
        ref={ref}
        aria-label={ariaLabel}
      />
    );
  } else {
    return (
      <button
        type="button"
        className={cn(
          "text-left px-2 py-1 rounded-md border border-transparent outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
        onClick={startEditing}
        aria-label={ariaLabel}
      >
        {value || <span className="text-muted-foreground">{placeholder}</span>}
      </button>
    );
  }
};

export default EditableText;
