"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import queryString from "query-string";
import { useBoardContext } from "@/providers/boards-provider";

export const SearchInput = () => {
    const router = useRouter();
    const { setSearch } = useBoardContext();
    const [value, setValue] = useState('');
    const [debouncedValue] = useDebounceValue(value, 200);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    useEffect(()=>{
       const url = queryString.stringifyUrl({
            url: '/',
            query: {
                search: debouncedValue
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        })
        router.replace(url)
        setSearch(value)
    }, [debouncedValue, router])

    return (
        <div className="w-full relative flex flex-row items-center">
            <Search className="absolute left-2 text-muted-foreground"/>
            <Input 
            className="pl-10 w-full max-w-[500px]" 
            placeholder="Search boards"
            onChange={onChange}
            />
        </div>
    )
}