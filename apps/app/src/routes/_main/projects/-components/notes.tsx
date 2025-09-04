import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Notes() {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-sm",
      },
    },
  });

  return (
    <div className="rounded-lg border border-neutral-200">
      <div className="p-3 border-b border-neutral-200 border-dashed font-medium">
        Notes
      </div>
      <div className="p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
