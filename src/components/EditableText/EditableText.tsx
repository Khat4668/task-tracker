import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Props = {
  value: string;
  className: string;
};

const EditableText = ({ value, className }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setTextValue(value);
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
    console.log(textValue);
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
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        ref={inputRef}
      />
    );
  } else {
    return (
      <div className={className} onClick={handleClick}>
        {value}
      </div>
    );
  }
};

export default EditableText;
