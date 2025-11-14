import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, AlertCircle, Trash2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CompilationResult } from "@shared/schema";

interface ConsolePanelProps {
  compilationResult: CompilationResult | null;
  isCompiling: boolean;
  onClear: () => void;
}

interface CompilerError {
  type: string;
  message: string;
  location?: string;
}

function parseCompilerErrors(stderr: string): CompilerError[] {
  const errors: CompilerError[] = [];
  const lines = stderr.split('\n');
  
  let currentError: CompilerError | null = null;
  
  for (const line of lines) {
    // Match error/warning headers like "error[E0425]:" or "error:"
    if (line.match(/^(error|warning)(\[.*?\])?:/)) {
      if (currentError) {
        errors.push(currentError);
      }
      const type = line.match(/^(error|warning)(\[.*?\])?/)?.[0] || 'error';
      currentError = {
        type: type,
        message: line.replace(/^(error|warning)(\[.*?\])?:\s*/, ''),
      };
    }
    // Match location lines like "--> temp.rs:5:5"
    else if (line.match(/^\s*-->\s+/) && currentError) {
      currentError.location = line.replace(/^\s*-->\s+/, '');
    }
    // Add to message if we have a current error
    else if (currentError && line.trim()) {
      currentError.message += '\n' + line;
    }
  }
  
  if (currentError) {
    errors.push(currentError);
  }
  
  // If no structured errors found, create a single error from stderr
  if (errors.length === 0 && stderr.trim()) {
    errors.push({
      type: 'Compilation Error',
      message: stderr,
    });
  }
  
  return errors;
}

export function ConsolePanel({ compilationResult, isCompiling, onClear }: ConsolePanelProps) {
  const hasOutput = compilationResult !== null;

  return (
    <div className="flex flex-col h-full bg-card border-l border-card-border" data-testid="container-console">
      <Tabs defaultValue="output" className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-card-border">
          <TabsList className="h-9">
            <TabsTrigger value="output" className="text-xs" data-testid="tab-output">
              <Terminal className="h-3 w-3 mr-1" />
              Output
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-xs" data-testid="tab-problems">
              <AlertCircle className="h-3 w-3 mr-1" />
              Problems
            </TabsTrigger>
          </TabsList>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={onClear}
            disabled={!hasOutput}
            className="h-8 w-8"
            data-testid="button-clear-console"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="output" className="flex-1 m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {isCompiling ? (
                <div className="flex items-start gap-2 text-sm text-muted-foreground" data-testid="text-compiling">
                  <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin mt-0.5" />
                  <span>Compiling Rust code...</span>
                </div>
              ) : !hasOutput ? (
                <div className="text-sm text-muted-foreground flex items-start gap-2" data-testid="text-no-output">
                  <Terminal className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">No output yet</p>
                    <p className="text-xs">Click "Run Code" to compile and see results</p>
                  </div>
                </div>
              ) : compilationResult.success ? (
                <div data-testid="container-success-output">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500 mb-3">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">Compilation successful!</span>
                  </div>
                  {compilationResult.output && (
                    <pre className="text-xs font-mono text-foreground bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words" data-testid="text-stdout">
                      {compilationResult.output}
                    </pre>
                  )}
                </div>
              ) : (
                <div data-testid="container-error-output">
                  <div className="flex items-center gap-2 text-sm text-destructive mb-3">
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">Compilation failed</span>
                  </div>
                  {compilationResult.stderr && (
                    <pre className="text-xs font-mono text-foreground bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words" data-testid="text-stderr">
                      {compilationResult.stderr}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="problems" className="flex-1 m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {!hasOutput || compilationResult.success ? (
                <div className="text-sm text-muted-foreground flex items-start gap-2" data-testid="text-no-problems">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-500" />
                  <div>
                    <p className="font-medium mb-1">No problems found</p>
                    <p className="text-xs">Your code compiled successfully</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3" data-testid="container-problems-list">
                  {parseCompilerErrors(compilationResult.stderr).map((error, i) => (
                    <div key={i} className="border-l-2 border-destructive bg-muted rounded-md p-3" data-testid={`problem-${i}`}>
                      <div className="flex items-start gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-destructive">{error.type}</div>
                          {error.location && (
                            <div className="text-xs text-muted-foreground mt-1" data-testid={`problem-location-${i}`}>
                              {error.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-foreground whitespace-pre-wrap pl-6">
                        {error.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
