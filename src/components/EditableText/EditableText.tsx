import { useInlineEdit } from "@/hooks/useInlineEdit";
import { cn } from "@/lib/utils";
import { type KeyboardEvent } from "react";
import { toast } from "sonner";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className: string;
  validate?: (value: string) => string | null;
  placeholder: string;
};

const EditableText = ({
  value,
  className,
  onSave,
  validate,
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
  } = useInlineEdit<HTMLInputElement>({ value, onSave, validate });

  const handleSaveWithToast = () => {
    const error = handleSave();
    if (error) {
      toast.error(error, {
        description: "Reverted the title to its previous value",
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleCancel();
    if (event.key === "Enter") handleSaveWithToast();
  };

  if (isEditing) {
    return (
      <input
        className={cn(className, "bg-transparent focus:outline-none")}
        type="text"
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSaveWithToast}
        ref={ref}
      />
    );
  } else {
    return (
      <div className={className} onClick={startEditing}>
        {value || (
          <span className="text-muted-foreground italic">{placeholder}</span>
        )}
      </div>
    );
  }
};

export default EditableText;
