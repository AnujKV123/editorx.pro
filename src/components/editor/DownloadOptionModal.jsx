import Modal from "../common/Modal";
import React from "react";
import { X, FileText, FileDown, FileArchive } from "lucide-react";
import { Button } from "../ui/button";

export const DownloadOptionModal = ({
  saveContent,
  setOpen,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} title="Download Format">
       <div className="flex flex-col items-center justify-center w-full py-4">
            <div className="flex flex-col gap-4 w-64">
            <Button
                variant="outline"
                onClick={() => saveContent("html")}
                className="flex items-center justify-start gap-2"
            >
                <FileText className="w-5 h-5" />
                HTML (.html)
            </Button>

            <Button
                variant="outline"
                onClick={() => saveContent("docx")}
                className="flex items-center justify-start gap-2"
            >
                <FileDown className="w-5 h-5" />
                Word (.docx)
            </Button>

            <Button
                variant="outline"
                onClick={() => saveContent("pdf")}
                className="flex items-center justify-start gap-2"
            >
                <FileArchive className="w-5 h-5" />
                PDF (.pdf)
            </Button>
            </div>
        </div>
    </Modal>
  );
};
