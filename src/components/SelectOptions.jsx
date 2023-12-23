import React from "react";
import Select from "react-select";

export default function SelectOptions({ title, data, setValue, errors }) {
  const customStyles = {
    control: (base) => ({
      ...base,
      background: "#1d232a",
      border: "1px solid rgba(255, 255, 255, var(--tw-border-opacity, 0.2))",
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      background: "#1d232a",
      color: "white",
    }),
    menuList: (base) => ({
      ...base,
      background: "#1d232a",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      backgroundColor: state.isHovered ? "#007bff" : null,
      "&:hover": {
        backgroundColor: "#007bff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="">{title}</label>
      <Select
        styles={customStyles}
        options={data}
        onChange={(e) => setValue(e.value)}
      />
      {errors && <p className="px-2 text-red-500 text-xs">{errors}</p>}
    </div>
  );
}
