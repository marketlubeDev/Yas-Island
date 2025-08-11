import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Selector({
  placeHolder = "Select",
  options = ["Option 1", "Option 2", "Option 3"],
  onChange = () => {},
  value,
  style = {},
  name,
  id,
  label,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selectedIndex = useMemo(() => {
    // Default to the first option when no value is provided
    if (value === undefined || value === null || value === "") {
      return options && options.length > 0 ? 0 : -1;
    }
    const idx = options?.findIndex((opt) => opt === value);
    return typeof idx === "number" ? idx : -1;
  }, [options, value]);

  const selectedLabel = useMemo(() => {
    if (selectedIndex >= 0) return options[selectedIndex];
    return "";
  }, [selectedIndex, options]);

  useEffect(() => {
    function onDocumentClick(event) {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target)) return;
      setIsOpen(false);
    }
    if (isOpen) document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const indexToFocus = selectedIndex >= 0 ? selectedIndex : 0;
    setFocusedIndex(indexToFocus);
    // ensure list receives focus for arrow key navigation
    setTimeout(() => listRef.current?.focus(), 0);
  }, [isOpen, selectedIndex]);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function emitChange(nextValue) {
    return () => {
      const syntheticEvent = {
        target: {
          value: nextValue,
          name: name ?? id,
          id,
        },
      };
      onChange(syntheticEvent);
      closeMenu();
    };
  }

  function onTriggerKeyDown(event) {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openMenu();
    }
  }

  function onListKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((i) => (i + 1) % options.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((i) => (i - 1 + options.length) % options.length);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const nextValue = options[focusedIndex >= 0 ? focusedIndex : 0];
      emitChange(nextValue)();
      return;
    }
  }

  return (
    <div className="selector-container" ref={containerRef}>
      <label className="Selector-label" htmlFor={id}>
        {label}
      </label>
      <div className="selector base-filter custom-select" style={style}>
        <button
          id={id}
          type="button"
          className="selector-trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          onKeyDown={onTriggerKeyDown}
        >
          <span
            className={`selector-value ${
              selectedLabel ? "has-value" : "is-placeholder"
            }`}
          >
            {selectedLabel || placeHolder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>

        {isOpen && (
          <ul
            className="selector-menu"
            role="listbox"
            tabIndex={-1}
            ref={listRef}
            aria-labelledby={id}
            onKeyDown={onListKeyDown}
          >
            {options?.map((option, index) => (
              <li
                key={index}
                role="option"
                aria-selected={selectedIndex === index}
                className={`selector-option ${
                  selectedIndex === index ? "is-selected" : ""
                } ${focusedIndex === index ? "is-focused" : ""}`}
                onClick={emitChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
