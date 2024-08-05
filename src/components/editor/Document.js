
import React, { useState , useEffect, useCallback} from 'react'
import ApiService from '../Services/Api.service'

import 
{
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { FileText } from 'lucide-react'
import { v4 as uuidV4 } from "uuid"
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from "../ui/use-toast"
import { useSelector } from 'react-redux'

const Document = () => {
    const [documents, setDocuments] = useState([])
    const user = useSelector((state) => state.user)
    const accessToken = useSelector((state) => state.accessToken)

    const { toast } = useToast()
    const navigate = useNavigate()



    useEffect(() => {
        async function fetchData(){
            const documents = await ApiService.getUserDocuments(user.email, accessToken);
            setDocuments(documents.data)
        }
        fetchData()
    }, [setDocuments])

    const createNewDocument = useCallback(async () => {
        if(user.subscription_plan==="Free" && documents.length<10){
            console.log("doc::", "event fired", documents.length)
            navigate(`${window.location.pathname}/${uuidV4()}`);
        }
        else{
            toast({ title: "Your free plan only allows 10 documents, please upgrade your plan 😊."})
        }
    }, [user.subscription_plan, documents.length, toast])

  return (
    <div className=' flex justify-center w-full mt-10 md:w-1/2 md:relative md:top-1/5 md:left-1/4'>
    <Card className="lg:w-[800px] lg:h-[500px] md:w-[500px] md:h-[400px] sm:w-[300px] sm:h-[600px]">
        <CardHeader>
            <CardTitle className="text-center">Document</CardTitle>
            {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
            <div className="flex justify-around items-center mt-5 ">
                <div className='text-center'>
                    <p className='mb-3'>Documents</p>
                    <ScrollArea className="h-72 w-64 rounded-md border">
                    <div className="p-4">
                        {documents.map((tag) => (
                        <>
                            <Link to={`/document/${tag._id}`}>
                                <div key={tag._id} className="text-sm cursor-pointer" >
                                {tag.document_name}
                                </div>
                            </Link>
                            <Separator className="my-2" />
                        </>
                        ))}
                    </div>
                    </ScrollArea>
                </div>
                <div className='text-center'>
                    <p>Create New</p>
                    <div className='border-dotted border-2 p-5 rounded-sm mt-3 cursor-pointer' onClick={createNewDocument}>
                        <FileText size={150} absoluteStrokeWidth />
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    </div>
  )
}

export default Document  