import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className: string;
  validate: (value: string) => string | null;
  placeholder: string;
};

const EditableText = ({
  value,
  className,
  onSave,
  validate,
  placeholder,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleCancel();
    if (event.key === "Enter") handleSave();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const error = validate(draft);

    if (error) {
      toast.error(error, {
        description: "Reverted the title to its previous value",
      });
    } else if (draft !== value) {
      onSave(draft);
    }

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        className={cn(
          className,
          "block w-full bg-transparent focus:outline-none",
        )}
        type="text"
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        ref={inputRef}
      />
    );
  } else {
    return (
      <div className={className} onClick={startEditing}>
        {value}
      </div>
    );
  }
};

export default EditableText;
