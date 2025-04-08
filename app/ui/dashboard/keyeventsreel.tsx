"use client";
import React, { useEffect, useState } from "react";
import {fetchKeyEvents} from "@/app/lib/fetchdb/fetch-keyevents";
import Link from "next/link";


type KeyEvent = {
  event_id: string;
  title: string;
  date?: string;
  summary?: string;
};

export default async function NewsReel({ events }: { events: KeyEvent[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allKeyEvents = await fetchKeyEvents();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // change slide every 4s

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="flex flex-col gap-2">

                    {Object.values(allKeyEvents).map((e) => (
                        <div key={e.event_id} className={"bg-gray-50 p-3 rounded-lg flex flex-row justify-between"}>
                            <div className="flex flex-row w-3/4 justify-between p-2">
                                <div className={""}>
                                    <strong>{e.event_date.toLocaleString()}
                                        <Link href={`/dashboard/project/${e.project_id}`}
                                              className={"underline decoration-solid"}>{e.project_name}</Link></strong>
                                    <p>{e.event_details}</p>
                                </div>
                                <div className={"flex flex-row gap-2 h-fit"}>
                                    <Link href={`/dashboard/keyevents/${e.event_id}/edit`}><button className={"fluent-default-button"}>Edit</button></Link>
                                    <button className={"fluent-default-button"}>Delete</button>
                                </div>
                            </div>
                            <div className={"bg-gray-200 text-sm w-1/4 p-2 rounded-md"}>
                                <label className={"font-bold"}>Metadata</label>
                                <div className="grid grid-cols-2">
                                    <label>Created by</label>
                                    <span>{e.name}</span>
                                    <label>Created at</label>
                                    <span>{e.created_at.toLocaleString()}</span>
                                    <label>Updated at</label>
                                    <span>{e.updated_at.toLocaleString()}</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
  );
}