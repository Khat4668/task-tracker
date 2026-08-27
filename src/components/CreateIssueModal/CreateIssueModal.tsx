import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { issueSchema, type IssueFormData } from "@/lib/issue-schema";
import { useCreateIssueMutation } from "@/store/issuesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CreateIssueModal = ({ isOpen, setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [createIssue] = useCreateIssueMutation();

  const onSubmit = async (data: IssueFormData) => {
    try {
      await createIssue({
        ...data,
        tag: data.tag || null,
        description: data.description || null,
      }).unwrap();
      reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to add issue");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
          <DialogDescription>
            Fill in the details of the new task
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter description"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              defaultValue="backlog"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full text-base md:text-sm">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Priority</Label>
            <Controller
              name="priority"
              control={control}
              defaultValue="low"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full text-base md:text-sm">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tag</Label>
            <Input {...register("tag")} />
          </div>
          <Button disabled={isSubmitting} type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssueModal;
