import React, { useState } from "react";
import { BsDatabaseCheck } from "react-icons/bs";
const Count = ({ name, total }: any) => {
  return (
    <div className="w-1/3 p-3">
      <div className="bg-white flex justify-between items-center p-10">
        <div>
          <p className="text-sm text-gray-400 mb-3">{name}</p>
          <p className="text-4xl">{total}</p>
        </div>
        <div>
          <BsDatabaseCheck className="text-6xl text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export const HomePageModule = () => {
  return (
    <div className="container mx-auto flex h-full flex-col justify-center px-32">
      <div className="flex mb-5">
        <Count name="Sierra Leone" total="129329" />
        <Count name="Guinea" total="590945" />
        <Count name="Liberia" total="4398398" />
      </div>
      <div className="flex">
        <div className="w-2/3 p-3">
          <div className="bg-white h-96 flex items-center justify-center">Bar Chat</div>
        </div>
        <div className="w-1/3 p-3">
          <div className="bg-white h-96 flex items-center justify-center">Pie Chat</div>
        </div>
      </div>
    </div>
  );
};
