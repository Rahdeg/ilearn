"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean,
    courseId: string,
    chapterId: string,
    isPublished: boolean
}

const ChapterActions = ({ disabled, courseId, chapterId, isPublished }: ChapterActionsProps) => {
    const router = useRouter();

    const [isloading, setIsloading] = useState(false);

    const onClick = async () => {
        try {

            setIsloading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
            }
            router.refresh()

        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsloading(false);
        }
    }


    const onDelete = async () => {
        try {
            setIsloading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted")
            router.push(`/teacher/courses/${courseId}`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsloading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled || isloading} variant="outline" size="sm">
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isloading}>
                    <Trash className=" w-4 h-4" />
                </Button>
            </ConfirmModal>

        </div>
    );
};

export default ChapterActions;
