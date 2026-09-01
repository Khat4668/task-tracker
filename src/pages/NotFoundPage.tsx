import EmptyState from "@/components/EmptyState/EmptyState";
import { FileQuestion } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <EmptyState
        as="h1"
        icon={<FileQuestion className="w-6 h-6" />}
        title="Page not found"
        description="This page doesn't exist or has been moved."
        actionLabel="Back to board"
        actionHref="/board"
      />
    </div>
  );
};

export default NotFoundPage;
