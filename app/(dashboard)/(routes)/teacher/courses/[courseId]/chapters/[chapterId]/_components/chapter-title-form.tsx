"use client"
import { Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ChapterTitleFormProps {
    initialData: {
        title: string
    };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
})

const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditting((current) => !current);


    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className=" mt-6 border bg-slate-100 rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
                Chapter title
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditting ? (<>
                            Cancel
                        </>) :
                            (
                                <>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit title
                                </>
                            )
                    }

                </Button>
            </div>
            {
                !isEditting && (
                    <p className=" text-sm mt-2">
                        {initialData.title}
                    </p>
                )
            }
            {
                isEditting && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 mt-4">
                            <FormField control={form.control} name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="e,g 'introduction '" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className=" flex items-center gap-x-2">
                                <Button className="" disabled={!isValid || isSubmitting} type="submit"> save</Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div>
    );
};

export default ChapterTitleForm;
