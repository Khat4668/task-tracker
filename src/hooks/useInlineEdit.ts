import { useEffect, useRef, useState } from "react";

type Params = {
  value: string;
  onSave: (value: string) => void;
  validate?: (value: string) => string | null;
};

export const useInlineEdit = <T extends HTMLElement>({
  value,
  onSave,
  validate,
}: Params) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>("");
  const ref = useRef<T>(null);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const error = validate?.(draft) ?? null;

    if (!error && draft !== value) {
      onSave(draft);
    }

    setIsEditing(false);
    return error;
  };

  return {
    isEditing,
    ref,
    draft,
    setDraft,
    handleSave,
    handleCancel,
    startEditing,
  };
};
