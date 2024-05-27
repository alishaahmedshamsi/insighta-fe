import { Search } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "../ui/input";

export const SearchBar = ({ initialValue }: { initialValue?: string }) => {
  const [value, setValue] = useState(initialValue || "");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = useDebounce(value, 1200);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";
    // Reset page to 1 only when the search query changes
    if (query !== currentQuery) {
      router.push(`${pathname}?${createQueryString("search", query)}`);
    }
  }, [query, router, pathname, searchParams, createQueryString]);

  return (
    <div className="font-roboto flex items-center gap-x-2 relative">
      <Search className="size-5 text-[#1A1A26] absolute top-2.2  left-2"   />
      <Input
        type="text"
        placeholder="Search"
        className="pl-7 h-10 rounded-xl"
        name="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
};