import { Editor } from "@tinymce/tinymce-react";

type EditorProps = {
  onChange: () => void;
  initialValue: string | undefined;
};

export default function EditorComponent({
  onChange,
  initialValue,
}: EditorProps) {
  return (
    <div className="border-gray-light border-sm  w-full  ">
      <Editor
        apiKey={import.meta.env.VITE_APP_TINYMCE_API_KEY}
        init={{
          resize: false,
          plugins: "lists  autoresize",
          toolbar: "blocks  | numlist bullist| bold italic underline | link ",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        onEditorChange={onChange}
        initialValue={initialValue}
      />
    </div>
  );
}
