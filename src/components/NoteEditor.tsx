import React, { useRef, useEffect } from "react";

type NoteEditorProps = {
  content: string;
  onChange: (newText: string) => void;
  className?: string;
};

export const NoteEditor = ({
  content,
  onChange,
  className,
}: NoteEditorProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && divRef.current.innerHTML !== content) {
      divRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (divRef.current) {
      onChange(divRef.current.innerHTML);
    }
  };

  return (
    <div
      ref={divRef}
      contentEditable
      onInput={handleInput}
      className={className}
      suppressContentEditableWarning={true}
    />
  );
};
