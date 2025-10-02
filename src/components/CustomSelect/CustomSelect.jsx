import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({ options, value, onChange, placeholder = "Select..." }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <div
        className={styles.selectBox}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || placeholder}
        <span className={`${styles.arrow} ${open ? styles.up : ""}`}></span>
      </div>
      {open && (
        <ul className={styles.optionsList}>
          {options.map((opt, idx) => (
            <li
              key={idx}
              className={`${styles.option} ${opt === value ? styles.active : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
