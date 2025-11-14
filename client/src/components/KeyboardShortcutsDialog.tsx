import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    {
      category: "Code Execution",
      items: [
        { keys: [`${modKey}`, "Enter"], description: "Run code (compile/test)" },
        { keys: [`${modKey}`, "R"], description: "Reset code to original" },
      ]
    },
    {
      category: "Navigation",
      items: [
        { keys: ["Alt", "N"], description: "Next exercise" },
        { keys: ["Alt", "P"], description: "Previous exercise" },
        { keys: [`${modKey}`, "K"], description: "Focus search filter" },
      ]
    },
    {
      category: "Editor",
      items: [
        { keys: [`${modKey}`, "S"], description: "Save (auto-saved)" },
        { keys: [`${modKey}`, "Z"], description: "Undo" },
        { keys: [`${modKey}`, "Shift", "Z"], description: "Redo" },
        { keys: [`${modKey}`, "/"], description: "Toggle comment" },
        { keys: [`${modKey}`, "F"], description: "Find" },
        { keys: [`${modKey}`, "H"], description: "Find and replace" },
      ]
    },
    {
      category: "Help",
      items: [
        { keys: ["?"], description: "Show this help dialog" },
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-shortcuts">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Quick reference for all available keyboard shortcuts in the Rustlings IDE
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 px-3 rounded-md hover-elevate"
                    data-testid={`shortcut-item-${idx}`}
                  >
                    <span className="text-sm text-foreground/80">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIdx) => (
                        <span key={keyIdx} className="flex items-center gap-1">
                          <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded-sm">
                            {key}
                          </kbd>
                          {keyIdx < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Tip: Most standard Monaco editor shortcuts (from VS Code) also work in the code editor.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
