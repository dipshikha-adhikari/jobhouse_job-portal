import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type TagsInputBoxProps = {
  onChange: (params: string[]) => void;
  values: string[] | undefined;
  isEditorOpen: boolean;
};

const TagsInputBox = ({
  onChange,
  values,
  isEditorOpen,
}: TagsInputBoxProps) => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentInput(e.target.value);
  };

  const handleAddInput = () => {
    setInputs((prev) => [...prev, currentInput]);
    setCurrentInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeInput = (input: string) => {
    setInputs(() => inputs.filter((inp) => inp !== input));
  };

  useEffect(() => {
    onChange(inputs);
  }, [inputs]);

  useEffect(() => {
    if (values !== undefined && values !== null) {
      setInputs(values);
    }
  }, [values]);

  return (
    <div className="grid w-full ">
      <div className="border-sm flex flex-wrap gap-xs input   p-sm">
        {inputs.map((inp) => {
          return (
            <span
              key={inp}
              className="flex items-center font-semibold overflow-hidden whitespace-pre-line gap-2"
            >
              {inp}{" "}
              {isEditorOpen && (
                <FaTimesCircle
                  className="text-orange-dark cursor-pointer"
                  onClick={() => removeInput(inp)}
                />
              )}
            </span>
          );
        })}
        <input
          type="text"
          ref={inputRef}
          placeholder="Add skills"
          onChange={(e) => handleChange(e)}
          className="outline-none  w-full input "
          disabled={!isEditorOpen}
        />
      </div>
      {currentInput && (
        <div
          className="flex items-center overflow-hidden gap-sm p-sm shadow-sm cursor-pointer"
          onClick={handleAddInput}
        >
          {currentInput} <FaCheckCircle className="text-green-dark" />
        </div>
      )}
    </div>
  );
};

export default TagsInputBox;
