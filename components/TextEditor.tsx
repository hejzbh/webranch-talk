import { useState } from "react";
// Next
import dynamic from "next/dynamic";
// NPM
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  value = "",
  onChange,
  label,
  error,
}: TextEditorProps) => {
  const [convertedText, setConvertedText] = useState(value);

  const handleUpdate = (value: string) => {
    setConvertedText(value);
    onChange(value);
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
      <ReactQuill theme="snow" value={convertedText} onChange={handleUpdate} />
    </div>
  );
};

export default TextEditor;
