import React, { useMemo } from "react";
import { FileText, User, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ApiService from "../../Services/Api.service";
import { useToast } from "../../context/use-toast";

export const DocumentCard = ({ document, onClick, fetchDocuments, isOwner }) => {
  const token = useSelector((state) => state.accessToken);
  const { toast } = useToast();
  const lastModified = new Date(document.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  const handleDelete = async () => {
    try {
      const response = await ApiService.deleteDocument({id:document._id}, token);
      if (response.statusCode === 200) {
        toast({
          variant: "success",
          title: "Document deleted successfully !!",
        })
        fetchDocuments();
      }

    } catch (error) {
      console.info(error);
    }
  }

  return (
    <div
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
            }}
            variant="ghost"
            size="icon"
            className="float-right"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        { isOwner && <PopoverContent className="w-24 p-2">
          <div className="flex flex-col gap-2">
            {/* <Button variant="secondary" size="sm">
              Share
            </Button> */}
            {isOwner && <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick
                handleDelete();
              }}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>}
          </div>
        </PopoverContent>}
      </Popover>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {document.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <User className="h-3 w-3" />
            <span>{isOwner ? "You" : document.owner}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <FileText className="h-3 w-3" />
            <span>{document.type}</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Modified {lastModified}
          </p>
        </div>
      </div>
    </div>
  );
};
