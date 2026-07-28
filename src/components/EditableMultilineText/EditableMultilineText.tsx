import { useInlineEdit } from "@/hooks/useInlineEdit";
import { cn } from "@/lib/utils";
import { type KeyboardEvent } from "react";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className: string;
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
          className,
          "bg-transparent focus:outline-none field-sizing-content resize-none",
        )}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        ref={ref}
        rows={4}
      />
    );
  } else {
    return (
      <div
        className={cn(className, "whitespace-pre-wrap")}
        onClick={startEditing}
      >
        {value || (
          <span className="text-muted-foreground italic">{placeholder}</span>
        )}
      </div>
    );
  }
};

export default EditableMultilineText;
