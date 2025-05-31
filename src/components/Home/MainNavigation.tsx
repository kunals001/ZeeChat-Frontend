"use client"
import { useEffect, useState } from 'react';
import Chats from './Chats';
import Groups from './Groups';
import Sidebar from './Sidebar';
import Status from './Status';
import {useSearchParams } from 'next/navigation';
import Message from './Message';
import Profile from './Profile';
import Explore from './Explore';

const MainNavigation = () => {

  const searchParams = useSearchParams();
  const [tab, setTab] = useState('/chats');

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <div className='md:flex'>
        <div className=''>
          {/* Sidebar */}
          <Sidebar />
        </div>

        <div className="">
          {tab === "chats" && <Chats />}
          {tab === "groups" && <Groups />}
          {tab === "status" && <Status />}
          {tab === "profile" && <Profile />}
          {tab === "explore" && <Explore />}
        </div>

        <div className="">
          <Message />
        </div>
      </div>
  )
}

export default MainNavigation