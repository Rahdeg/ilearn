"use client"
import qs from "query-string"
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value);
    const pathname = usePathname();
    const router = useRouter();
    const searchparams = useSearchParams();

    const currentCategoryId = searchparams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debounceValue
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debounceValue, pathname, currentCategoryId, router]);



    return (
        <div className=" relative">
            <Search className=" w-4 h-4 absolute top-3 left-3 text-slate-600" />
            <Input className=" w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search for courses " value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

    )
};

export default SearchInput;
