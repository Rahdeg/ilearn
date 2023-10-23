"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean,
    courseId: string,
    isPublished: boolean
}

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();

    const [isloading, setIsloading] = useState(false);

    const onClick = async () => {
        try {

            setIsloading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
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
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course deleted")
            router.refresh();
            router.push(`/teacher/courses`)
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

export default Actions;
