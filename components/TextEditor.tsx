import { useState, useRef } from "react";
// Next
import dynamic from "next/dynamic";
// NPM
import JoditEditor from "jodit-react";
// Components
const Label = dynamic(() => import("@/components/ui/Label"));

// Props
interface TextEditorProps {
  className?: string;
  value: string;
  onChange: (content: string) => void; // eslint-disable-line
  label?: string;
  error?: string;
}

const TextEditor = ({
  className,
  value,
  onChange,
  label,
  error,
}: TextEditorProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value);
  const config = {
    readonly: false,
    height: 400,
  };

  const handleUpdate = (event: any) => {
    const editorContent = event.target.innerHTML;

    setContent(editorContent);

    onChange(editorContent);
  };

  return (
    <div className={`${className}`}>
      {/** Label? */}
      {label && (
        <div>
          <Label text={label} />
          {error && (
            <span className="text-rose-500 text-sm md:text-md block mt-1">
              {error}
            </span>
          )}
        </div>
      )}
      <JoditEditor
        className="!text-black"
        ref={editor}
        value={content}
        config={config}
        onChange={handleUpdate}
      />
      <div
        className="opacity-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextEditor;
