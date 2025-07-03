import React from "react";
export default function Selector({
  placeHolder = "Select",
  options = ["Option 1", "Option 2", "Option 3", ""],
  onChange = () => {},
  value,
  style = {},
  name,
  id,
  label,
}) {
  return (
    <div className="selector-container">
      <label className="Selector-label" htmlFor={id}>
        {label}
      </label>
      <div className="selector base-filter" style={style}>
        <select value={value} onChange={onChange} name={name} id={id}>
          <option value="">{placeHolder}</option>

          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
