import Editor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { EditorToolbar } from "./EditorToolbar";
import { useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
  fileName: string;
}

export function CodeEditor({ value, onChange, readOnly = false, fileName }: CodeEditorProps) {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  return (
    <div className="h-full w-full bg-card border-r border-card-border flex flex-col" data-testid="container-code-editor">
      <EditorToolbar fileName={fileName} language="Rust" />
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="rust"
          value={value}
          onChange={onChange}
          onMount={(editor) => {
            editor.onDidChangeCursorPosition((e) => {
              setCursorPosition({ line: e.position.lineNumber, column: e.position.column });
            });
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 21,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            scrollBeyondLastLine: false,
            renderLineHighlight: "all",
            readOnly,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
            lineNumbers: "on",
            glyphMargin: true,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 4,
            renderWhitespace: "selection",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            snippetSuggestions: "inline",
          }}
          loading={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" data-testid="loading-editor" />
            </div>
          }
        />
      </div>
      <div className="h-6 border-t border-card-border bg-card px-4 flex items-center justify-between text-xs text-muted-foreground">
        <span data-testid="text-cursor-position">Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
        <div className="flex items-center gap-4">
          <span data-testid="text-encoding">UTF-8</span>
          <span data-testid="text-eol">LF</span>
          <span data-testid="text-tab-size">Spaces: 4</span>
        </div>
      </div>
    </div>
  );
}
