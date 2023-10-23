"use client"
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/price-format";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    courseId: string
    price: number
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onCLick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button className=" w-full md:w-auto" size="sm" onClick={onCLick} disabled={isLoading}>
            Enroll for  {formatPrice(price)}
        </Button>
    );
};

export default CourseEnrollButton;
