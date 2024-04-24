"use client";

import { deleteStudent, getStudentById } from "@/actions/db-queries";
import CustomModal from "@/components/modal/custom-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useModal } from "@/providers/modal-provider";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Edit2, Loader, Trash } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useToast } from "../ui/use-toast";
import { StudentDetailsForm } from "../form/student-details";

export type Payment = {
  id: string;
  name: string;
  class: "SLC" | "Plus2" | "Bachelor" | "Masters";
  address: string;
  imageUrl: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className="w-[70px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Photo",
    cell: ({ row }) => {
      const image = row.original.imageUrl;

      return (
        <HoverCard>
          <HoverCardTrigger>
            <div className="relative h-12 w-12">
              <Image
                src={image}
                alt={row.original.name}
                fill
                priority
                className="rounded-full object-cover "
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-full items-center justify-center gap-3">
            <div className="relative h-24 w-24">
              <Image
                src={image}
                alt={row.original.name}
                fill
                priority
                className="rounded-full object-cover "
              />
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger className="text-[1.2rem]">
            {row.original.name}
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => {
      switch (row.original.class) {
        case "SLC":
          return (
            <Badge className="bg-gray-400 font-bold ">
              {row.original.class}
            </Badge>
          );
        case "Plus2":
          return (
            <Badge className="bg-blue-400 font-bold">
              {row.original.class}
            </Badge>
          );
        case "Bachelor":
          return (
            <Badge className="bg-green-600 font-bold">
              {row.original.class}
            </Badge>
          );
        case "Masters":
          return (
            <Badge className="bg-red-600 font-bold">{row.original.class}</Badge>
          );
      }
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.original.address}</div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="w-[50px]">
          Crud Actions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      const { toast } = useToast();
      const payment = row.original;
      const { setOpen, setClose } = useModal();
      const [student, setStudent] = useState({});

      const memoizedLoadData = useCallback(async () => {
        const result = await getStudentById({ id: row.original.id });
        const { data } = JSON.parse(result);
        setStudent(data);
      }, []);

      useMemo(() => memoizedLoadData(), []);
      return (
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Badge
                  onClick={() =>
                    setOpen(
                      <CustomModal
                        title={"Update exisiting user"}
                        description={
                          "You can use the following form to update user details."
                        }
                      >
                        <StudentDetailsForm student={student} type={"update"} />
                      </CustomModal>,
                    )
                  }
                >
                  <Edit size={16} />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Update student data</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                {isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Badge
                    className="bg-red-700"
                    onClick={() =>
                      setOpen(
                        <CustomModal
                          title={"Are you absolutely sure?"}
                          description={
                            "This action cannot be undone. This will permanently delete the student's account from the servers."
                          }
                        >
                          <div className="flex">
                            <div className="ml-auto flex items-center gap-2">
                              <Button
                                variant={"destructive"}
                                onClick={async () => {
                                  startTransition(async () => {
                                    await deleteStudent({
                                      id: row.original.id,
                                    });
                                    toast({
                                      title: `${row.original.name} sucessfully deleted!`,
                                    });
                                    setClose();
                                  });
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant={"outline"}
                                onClick={() => setClose()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CustomModal>,
                      )
                    }
                  >
                    <Trash size={16} />
                  </Badge>
                )}
              </TooltipTrigger>
              <TooltipContent>Delete student data</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
