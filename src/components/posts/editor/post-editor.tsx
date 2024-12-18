"use client";

import UserAvatar from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitPost } from "./actions";

export default function PostEditor() {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "New post...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await submitPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <div className="hidden sm:inline self-start">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            username={user.username}
            className="size-40"
          />
        </div>
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
            "[&_.tiptap.ProseMirror]:outline-none",
            "[&_.tiptap_p.is-editor-empty:first-child::before]:text-muted-foreground",
            "[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
            "[&_.tiptap_p.is-editor-empty:first-child::before]:float-left",
            "[&_.tiptap_p.is-editor-empty:first-child::before]:h-0",
            "[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none",
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
