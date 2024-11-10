import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams,  useLocation} from "react-router-dom"
import { Button } from "../ui/button"
import { Copy } from "lucide-react"
import {FileCode2} from "lucide-react"
import { FileDown } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { getHost } from "../config/global"
import errorImg from "../common/images/404-not-found.png"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card"

import UpdateDocNamePopUp from "./UpdateDocNamePopUp"
import { v4 as uuidV4 } from "uuid"
import { useSelector } from "react-redux"


import { saveAs } from 'file-saver';
import { pdfExporter } from "quill-to-pdf";
import * as quillToWord from "quill-to-word";


// const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const docName = queryParams.get('name');
  const { id: documentId } = useParams()

  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const [userHasAccess, setUserHasAccess] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user)
  const user_email = user?.email
  const user_fullname = user?.fullname
  const { toast } = useToast()


  const downloadAsPdf = async () => {
    const delta = quill.getContents();
    const blob = await pdfExporter.generatePdf(delta);
    saveAs(blob, `${docName}.pdf`);
  }

  const downloadAsDocs = async () => {
    const delta = quill.getContents();
    const blob = await quillToWord.generateWord(delta, {exportAs: "blob"});
    saveAs(blob, `${docName}.docx`);
  }


  useEffect(() => {
    const s = io(getHost().HOST_URL)
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])


  useEffect(() => {
    if (socket == null || quill == null) return
    
    if(docName != null){
      socket.once("load-document", document => {
        quill.setContents(document.data)
        quill.enable()
        setUserHasAccess(document.shared_with)
      })
      socket.emit("get-document", documentId, user_email, user_fullname)
    }
  }, [socket, quill, documentId, user_email, user_fullname, docName])

  useEffect(() => {
    if (socket == null || quill == null) return

    // const interval = setInterval(() => {
    //   socket.emit("save-document", quill.getContents(), user_email, user_fullname)
    // }, SAVE_INTERVAL_MS)

    const saveDocument = () => {
      socket.emit("save-document", quill.getContents(), user_email, user_fullname)
    }
    quill.on("text-change", saveDocument)

    // return () => {
    //   clearInterval(interval)
    // }
  }, [socket, quill, user_email, user_fullname])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    socket.on("load-shared-with", shared_with => {
      setUserHasAccess(shared_with)
    })

    return () => {
      socket.off("receive-changes", handler)
      socket.off("load-shared-with")
    }
  }, [socket, quill])



  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])
  return docName===null ?
          <div className="items-center flex mt-20 flex-col w-full">
            <h2 className="text-3xl font-bold mb-5">Document Not Found</h2>
            <img className="w-96" src={errorImg} alt="Not Found" />
          </div>
          :
          <>
            <div className="container" ref={wrapperRef}></div>
            <div className="lg:absolute lg:top-40 lg:right-20 lg:w-20">
              <div className="fixed">
                <div className="m-2">
                  <Button onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast({ title: "URL Copied Successfully! Please Share 😊."})
                    }}> 
                      Share &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Copy className="mr-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="m-2">
                      <Button onClick={() => setIsOpen(true)}> 
                        Save As &nbsp;&nbsp;&nbsp;&nbsp; <FileCode2 className="mr-2 h-4 w-4" />
                      </Button>
                </div>
                <div className="m-2">
                  <Button onClick={downloadAsPdf}> Save Pdf &nbsp;&nbsp;&nbsp;<FileDown className="mr-2 h-4 w-4" /></Button>
                </div>
                <div className="m-2">
                  <Button onClick={downloadAsDocs}> Save Docx &nbsp;<FileDown className="mr-2 h-4 w-4" /></Button>
                </div>
              </div>
            </div>
            <div className="lg:absolute lg:top-40 lg:left-20 lg:w-28">
              <div className="fixed w-48">
                  <p className="p-1 text-center rounded-sm bg-blue-500"> Edited/Read By </p>
                <div className="m-2">
                  {userHasAccess.length>0 && userHasAccess.map(item=>(
                    <div className="flex flex-row mb-1" key={item._id}>
                      <HoverCard>
                        <HoverCardTrigger>
                          <div className=" cursor-pointer text-center m-1 px-2 py-1 w-8 bg-pink-400 rounded-full">{item.full_name.slice(0, 1).toUpperCase()}</div>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-center">
                          <p className="text-sm">{item.full_name}</p>
                          <p className="text-sm">{item.email}</p>
                        </HoverCardContent>
                      </HoverCard>
                      <p className="m-1">{item.full_name.substring(0,15)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <UpdateDocNamePopUp documentId={documentId} newId={uuidV4()} content={async()=> await quill.getContents()} closeDialog={() => setIsOpen(false)} isOpen={isOpen}/>
          </>
}
