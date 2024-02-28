import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="z-50 fixed w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-center items-center">
      <div className="flex flex-col justify-center items-center ">
        <Image
          className="w-[100px]"
          src="https://i.gifer.com/ZKZg.gif"
          width={200}
          height={200}
        />
        <h1 className="p-2 text-black">Loading...</h1>
      </div>
    </div>
  );
}
