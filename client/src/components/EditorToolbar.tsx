import { Badge } from "@/components/ui/badge";

interface EditorToolbarProps {
  fileName: string;
  language: string;
}

export function EditorToolbar({ fileName, language }: EditorToolbarProps) {
  return (
    <div className="h-10 border-b border-card-border bg-card px-4 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="font-medium text-card-foreground" data-testid="text-filename">{fileName}</span>
        <Badge variant="outline" className="text-xs" data-testid="badge-language">{language}</Badge>
      </div>
    </div>
  );
}
