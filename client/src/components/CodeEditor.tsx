import Editor, { type Monaco } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { EditorToolbar } from "./EditorToolbar";
import { useState, useRef, useEffect } from "react";
import type { editor } from "monaco-editor";
import type { CompilationResult } from "@shared/schema";
import { useTheme } from "@/components/theme-provider";

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

function defineSolarizedThemes(monaco: Monaco) {
  // Solarized Dark Theme
  monaco.editor.defineTheme('solarized-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '586e75', fontStyle: 'italic' },
      { token: 'keyword', foreground: '859900' },
      { token: 'string', foreground: '2aa198' },
      { token: 'number', foreground: 'd33682' },
      { token: 'regexp', foreground: 'dc322f' },
      { token: 'type', foreground: 'b58900' },
      { token: 'class', foreground: 'b58900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: '268bd2' },
      { token: 'constant', foreground: 'cb4b16' },
      { token: 'operator', foreground: '859900' },
      { token: 'delimiter', foreground: '93a1a1' },
    ],
    colors: {
      'editor.background': '#002b36',
      'editor.foreground': '#839496',
      'editorLineNumber.foreground': '#586e75',
      'editorCursor.foreground': '#839496',
      'editor.selectionBackground': '#073642',
      'editor.lineHighlightBackground': '#073642',
      'editorWhitespace.foreground': '#073642',
      'editorIndentGuide.background': '#073642',
      'editorIndentGuide.activeBackground': '#586e75',
    }
  });

  // Solarized Light Theme
  monaco.editor.defineTheme('solarized-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
      { token: 'keyword', foreground: '859900' },
      { token: 'string', foreground: '2aa198' },
      { token: 'number', foreground: 'd33682' },
      { token: 'regexp', foreground: 'dc322f' },
      { token: 'type', foreground: 'b58900' },
      { token: 'class', foreground: 'b58900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: '268bd2' },
      { token: 'constant', foreground: 'cb4b16' },
      { token: 'operator', foreground: '859900' },
      { token: 'delimiter', foreground: '586e75' },
    ],
    colors: {
      'editor.background': '#fdf6e3',
      'editor.foreground': '#657b83',
      'editorLineNumber.foreground': '#93a1a1',
      'editorCursor.foreground': '#657b83',
      'editor.selectionBackground': '#eee8d5',
      'editor.lineHighlightBackground': '#eee8d5',
      'editorWhitespace.foreground': '#eee8d5',
      'editorIndentGuide.background': '#eee8d5',
      'editorIndentGuide.activeBackground': '#93a1a1',
    }
  });
}

export function CodeEditor({ value, onChange, readOnly = false, fileName, compilationResult }: CodeEditorProps) {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme } = useTheme();

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

  // Update Monaco theme when UI theme changes
  useEffect(() => {
    if (!monacoRef.current) return;
    const monacoTheme = theme === 'dark' ? 'solarized-dark' : 'solarized-light';
    monacoRef.current.editor.setTheme(monacoTheme);
  }, [theme]);

  return (
    <div className="h-full w-full bg-card border-r border-card-border flex flex-col" data-testid="container-code-editor">
      <EditorToolbar fileName={fileName} language="Rust" />
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="rust"
          value={value}
          onChange={onChange}
          beforeMount={(monaco) => {
            defineSolarizedThemes(monaco);
          }}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;
            editor.onDidChangeCursorPosition((e) => {
              setCursorPosition({ line: e.position.lineNumber, column: e.position.column });
            });
          }}
          theme={theme === 'dark' ? 'solarized-dark' : 'solarized-light'}
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
