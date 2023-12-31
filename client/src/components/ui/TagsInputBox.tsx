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
    <div className="grid w-full    ">
      <div className="border-sm  flex flex-wrap gap-xs input   p-sm">
        {inputs.map((inp) => {
          return (
            <p key={inp} className=" flex  font-semibold  gap-2">
              <span className="break-all "> {inp}</span>
              <span>
                {" "}
                {isEditorOpen && (
                  <FaTimesCircle
                    className="text-orange-dark w-5 h-5 cursor-pointer "
                    onClick={() => removeInput(inp)}
                  />
                )}
              </span>
            </p>
          );
        })}
        <input
          type="text"
          ref={inputRef}
          placeholder="Add skills"
          onChange={(e) => handleChange(e)}
          className="outline-none break-all w-full   input "
          disabled={!isEditorOpen}
        />
      </div>
      {currentInput && (
        <div
          className="  break-all flex  gap-sm p-sm shadow-sm cursor-pointer"
          onClick={handleAddInput}
        >
          {currentInput}
          <span>
            {" "}
            <FaCheckCircle className="text-green-dark w-5 h-5" />
          </span>
        </div>
      )}
    </div>
  );
};

export default TagsInputBox;
