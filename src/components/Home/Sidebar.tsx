"use client";
import {
  IconChartDonut3,
  IconCompass,
  IconCompassFilled,
  IconMessage,
  IconMessageFilled,
} from "@tabler/icons-react";
import  Link  from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "chats";

  const items = [
    {
      tab: "chats",
      filledIcon: <IconMessageFilled className="text-zinc-200 md:size-7" />,
      outlineIcon: <IconMessage className="text-zinc-200 md:size-7" />,
    },
    {
      tab: "status",
      filledIcon: (
        <IconChartDonut3 stroke={3} className="text-zinc-200 md:size-7" />
      ),
      outlineIcon: (
        <IconChartDonut3 stroke={2} className="text-zinc-200 md:size-7" />
      ),
    },
    {
      tab: "groups",
      filledIcon: (
        <IconCompassFilled className="text-zinc-200 md:size-7" />
      ),
      outlineIcon: (
        <IconCompass className="text-zinc-200 md:size-7" />
      ),
    },
  ];

  return (
    <div className="md:w-[4vw] md:h-[calc(100vh-4vw)] w-full h-[6vh] bg-[#0d0d0ddf] md:rounded-l-lg flex flex-col items-center justify-between py-[1vh]">
      <div className="flex flex-col gap-[.2vh]">
        {items.map((item) => {
          const isSelected = currentTab === item.tab;

          return (
            <div
              key={item.tab}
              onClick={() => router.push(`/?tab=${item.tab}`)}
              className={`md:p-[.5vw] md:rounded-lg cursor-pointer hover:bg-zinc-800 transition-all duration-300 ${
                isSelected ? "bg-zinc-800" : ""
              }`}
            >
              {isSelected ? item.filledIcon : item.outlineIcon}
            </div>
          );
        })}
      </div>

      <div  className="flex items-center justify-center">
        <Link href="/?tab=profile"><Image width={100} height={100} src="/next.svg" alt="user profile" className='md:w-[2.5vw] md:h-[2.5vw] w-[4vh] h-[4vh] rounded-full object-cover border-2 border-prime cursor-pointer'/></Link>
      </div>
    </div>
  );
};

export default Sidebar;
