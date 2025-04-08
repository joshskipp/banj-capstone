"use client";
import React, { useEffect, useState } from "react";

type KeyEvent = {
  event_id: string;
  title: string;
  date?: string;
  summary?: string;
};

export default function NewsReel({ events }: { events: KeyEvent[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // change slide every 4s

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md bg-white">
      <div className="p-4 text-center transition-all duration-500">
        <h4 className="text-lg font-bold text-gray-800">Latest Key Event</h4>
        <p className="text-sm text-gray-500">Event ID: {events[currentIndex].event_id}</p>
        {events[currentIndex].title && (
          <p className="mt-2 text-base text-gray-700 font-medium">
            {events[currentIndex].title}
          </p>
        )}
        {events[currentIndex].summary && (
          <p className="mt-1 text-sm text-gray-600 italic">
            {events[currentIndex].summary}
          </p>
        )}
      </div>
    </div>
  );
}