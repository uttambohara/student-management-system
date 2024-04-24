"use client";

import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "./custom-modal";
import { StudentDetailsForm } from "../form/student-details";

export default function AddCourse() {
  const { setOpen } = useModal();

  return (
    <Button
      className="flex items-center gap-2 rounded-full bg-[#141414]"
      onClick={() =>
        setOpen(
          <CustomModal
            title={"Add a student"}
            description={"Create a student also upload their photo."}
          >
            <StudentDetailsForm type={"create"} />
          </CustomModal>,
        )
      }
    >
      <Plus size={16} />
      Add a student
    </Button>
  );
}
