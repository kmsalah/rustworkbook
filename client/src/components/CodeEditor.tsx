import Editor, { type Monaco } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { EditorToolbar } from "./EditorToolbar";
import { useState, useRef, useEffect } from "react";
import type { editor } from "monaco-editor";
import type { CompilationResult } from "@shared/schema";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
  fileName: string;
  compilationResult?: CompilationResult | null;
}

interface ParsedError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

function parseErrorLocation(stderr: string): ParsedError[] {
  const errors: ParsedError[] = [];
  const lines = stderr.split('\n');
  
  let currentMessage = '';
  let currentSeverity: 'error' | 'warning' = 'error';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match error/warning headers
    const severityMatch = line.match(/^(error|warning)(\[.*?\])?:/);
    if (severityMatch) {
      currentSeverity = severityMatch[1] as 'error' | 'warning';
      currentMessage = line.replace(/^(error|warning)(\[.*?\])?:\s*/, '');
    }
    
    // Match location lines like "--> temp.rs:5:5"
    const locationMatch = line.match(/-->\s+(?:.*?\.rs|temp\.rs):(\d+):(\d+)/);
    if (locationMatch) {
      const lineNum = parseInt(locationMatch[1], 10);
      const colNum = parseInt(locationMatch[2], 10);
      
      // Collect subsequent context lines for better message
      let fullMessage = currentMessage;
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j];
        if (nextLine.match(/^(error|warning)/) || nextLine.match(/-->/)) break;
        if (nextLine.trim() && !nextLine.match(/^\s*\|/)) {
          fullMessage += '\n' + nextLine.trim();
        }
      }
      
      errors.push({
        line: lineNum,
        column: colNum,
        message: fullMessage,
        severity: currentSeverity,
      });
    }
  }
  
  return errors;
}

export function CodeEditor({ value, onChange, readOnly = false, fileName, compilationResult }: CodeEditorProps) {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Update editor markers when compilation result changes
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    
    const monaco = monacoRef.current;
    const model = editorRef.current.getModel();
    if (!model) return;
    
    // Clear previous markers
    monaco.editor.setModelMarkers(model, 'rust-compiler', []);
    
    // Add new markers from stderr (includes both errors and warnings)
    if (compilationResult && compilationResult.stderr) {
      const parsedErrors = parseErrorLocation(compilationResult.stderr);
      const markers = parsedErrors.map(err => ({
        startLineNumber: err.line,
        startColumn: err.column,
        endLineNumber: err.line,
        endColumn: err.column + 10, // Highlight a few characters
        message: err.message,
        severity: err.severity === 'error' 
          ? monaco.MarkerSeverity.Error 
          : monaco.MarkerSeverity.Warning,
      }));
      
      monaco.editor.setModelMarkers(model, 'rust-compiler', markers);
    }
  }, [compilationResult]);

  return (
    <div className="h-full w-full bg-card border-r border-card-border flex flex-col" data-testid="container-code-editor">
      <EditorToolbar fileName={fileName} language="Rust" />
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="rust"
          value={value}
          onChange={onChange}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;
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
