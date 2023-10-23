"use client"
import { Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";


interface ImageFormProps {
    initialData: Course
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "ImageUrl is required",
    }),
})

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {


    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditting((current) => !current);




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className=" mt-6 border bg-slate-100 rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
                Course Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditting && (<>
                            Cancel
                        </>)}

                    {
                        !isEditting && !initialData.imageUrl && (
                            <>
                                <PlusCircle className=" h-4 w-4 mr-2" />
                                Add an Image
                            </>
                        )
                    }
                    {!isEditting && initialData.imageUrl &&
                        (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Image
                            </>
                        )
                    }

                </Button>
            </div>
            {
                !isEditting && (
                    !initialData.imageUrl ? (
                        <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <ImageIcon className="w-10 h-10 text-slate-500" />
                        </div>
                    ) : (
                        <div className=" relative aspect-video mt-2">
                            <Image alt="upload" fill className=" object-cover rounded-md" src={initialData.imageUrl} />
                        </div>
                    )
                )
            }
            {
                isEditting && (
                    <div className="">
                        <FileUpload endpoint="courseImage" onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }} />

                        <div className=" text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ImageForm;