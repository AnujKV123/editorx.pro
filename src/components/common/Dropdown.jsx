import React, { useState, useRef, useEffect, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  enableSearch = false,
  infiniteScroll = false,
  onSearchChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(
    infiniteScroll ? ITEMS_PER_PAGE : options.length
  );

  useEffect(()=>{
    if(!onSearchChange) return;
    onSearchChange(search);
  }, [search])

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const sentinelRef = useRef(null);

  const filteredOptions = enableSearch
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const visibleOptions = useMemo(() => {
    return filteredOptions.slice(0, visibleCount);
  }, [filteredOptions, visibleCount]);

  const hasMore = useMemo(() => {
    return infiniteScroll && visibleOptions.length < filteredOptions.length;
  }, [infiniteScroll, visibleOptions, filteredOptions]);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisibleCount(infiniteScroll ? ITEMS_PER_PAGE : filteredOptions.length);
    }
  }, [isOpen, search, infiniteScroll, filteredOptions.length]);

  useEffect(() => {
    if (!infiniteScroll || !isOpen || !hasMore || !menuRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      {
        root: menuRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const timeout = setTimeout(() => {
      if (sentinelRef.current) {
        observer.observe(sentinelRef.current);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [infiniteScroll, isOpen, search, hasMore, visibleCount]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        className={`flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-all`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {value ? value.label : placeholder}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-xs">▾</span>
      </div>

      {isOpen && (
        <div
          className="absolute mt-2 z-50 w-full rounded-md border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-md"
          ref={menuRef}
        >
          {enableSearch && (
            <input
              type="text"
              className="w-full px-3 py-2 border-b border-gray-200 dark:border-zinc-700 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <ul className="max-h-60 overflow-auto">
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                    value?.value === option.value
                      ? "bg-gray-100 dark:bg-zinc-800 font-medium"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options
              </li>
            )}
            {infiniteScroll && hasMore && (
              <li
                ref={sentinelRef}
                className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500"
              >
                Loading more...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
