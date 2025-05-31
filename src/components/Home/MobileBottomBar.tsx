
"use client";
import {
  IconChartDonut3,
  IconCompass,
  IconCompassFilled,
  IconMessage,
  IconMessageFilled,
  IconUsersGroup
} from "@tabler/icons-react";
import  Link  from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const MobileBottomBar = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "chats";

  const items = [
    {
      tab: "chats",
      filledIcon: <IconMessageFilled className="text-zinc-200 size-7" />,
      outlineIcon: <IconMessage className="text-zinc-200 size-7" />,
    },
    {
      tab: "status",
      filledIcon: (
        <IconChartDonut3 stroke={3} className="text-zinc-200 size-7" />
      ),
      outlineIcon: (
        <IconChartDonut3 stroke={2} className="text-zinc-200 size-7" />
      ),
    },
    {
      tab: "groups",
      filledIcon: (
        <IconUsersGroup stroke={3} className="text-zinc-200 size-7" />
      ),
      outlineIcon: (
        <IconUsersGroup stroke={2} className="text-zinc-200 size-7" />
      ),
    },
    {
      tab: "explore",
      filledIcon: (
        <IconCompassFilled className="text-zinc-200 size-7" />
      ),
      outlineIcon: (
        <IconCompass className="text-zinc-200 size-7" />
      ),
    },
  ];

  return (
    <div className='md:hidden flex w-full h-[7vh] items-center bg-[#181818] absolute bottom-0'>

        <div className="flex justify-around w-full">
        {items.map((item) => {
          const isSelected = currentTab === item.tab;

          return (
            <div
              key={item.tab}
              onClick={() => router.push(`/?tab=${item.tab}`)}
              className={`px-[2vh] py-[1vh] rounded-full cursor-pointer hover:bg-zinc-800 transition-all duration-300 ${
                isSelected ? "bg-zinc-800" : ""
              } `}
            >
              {isSelected ? item.filledIcon : item.outlineIcon}
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default MobileBottomBar