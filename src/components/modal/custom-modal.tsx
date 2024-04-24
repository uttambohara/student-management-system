"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/modal-provider";
import { useEffect, useState } from "react";

interface CustomModalProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function CustomModal({
  children,
  title,
  description,
}: CustomModalProps) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => setHasMounted(true), []);
  const { isOpen, setClose } = useModal();

  if (!hasMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="no-scrollbar max-h-[35rem] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl tracking-wide">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
