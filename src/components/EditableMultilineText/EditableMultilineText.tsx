import { useInlineEdit } from "@/hooks/useInlineEdit";
import { cn } from "@/lib/utils";
import { type KeyboardEvent } from "react";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder: string;
};

const EditableMultilineText = ({
  value,
  className,
  onSave,
  placeholder,
}: Props) => {
  const {
    isEditing,
    ref,
    draft,
    setDraft,
    handleSave,
    handleCancel,
    startEditing,
  } = useInlineEdit<HTMLTextAreaElement>({ value, onSave });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleCancel();
  };

  if (isEditing) {
    return (
      <textarea
        className={cn(
          "bg-transparent block field-sizing-content resize-none px-2 rounded-md border border-transparent outline-none placeholder:text-muted-foreground",
          className,
        )}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        ref={ref}
      />
    );
  } else {
    return (
      <button
        type="button"
        className={cn(
          "whitespace-pre-wrap wrap-anywhere text-left px-2 rounded-md border border-transparent outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
        onClick={startEditing}
      >
        {value || <span className="text-muted-foreground">{placeholder}</span>}
      </button>
    );
  }
};

export default EditableMultilineText;
