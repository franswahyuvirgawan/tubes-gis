import React from "react";

export default function Input({ value, setValue, errors, placeholder }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="input input-xs h-11 input-bordered lg:w-full w-full"
      />
      {errors && <p className="px-2 text-red-500 text-xs">{errors}</p>}
    </div>
  );
}
