import React, { useRef, useState, useEffect } from "react";
import "./styles.module.css";

export default function ToggleText() {
  const contentRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [durationMs, setDurationMs] = useState(400);

  // Stores maxHeight, opacity and animation duration
  const [styleProps, setStyleProps] = useState({
    maxHeight: "0px",
    opacity: 0,
    transitionDuration: "400ms",
  });

  // Update animation duration when durationMs changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStyleProps((prev) => ({
      ...prev,
      transitionDuration: `${durationMs}ms`,
    }));
  }, [durationMs]);

  // Toggle show/hide
  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      // Closing animation
      setStyleProps({
        ...styleProps,
        maxHeight: `${el.scrollHeight}px`,
        opacity: 1,
      });

      requestAnimationFrame(() => {
        setStyleProps({
          ...styleProps,
          maxHeight: "0px",
          opacity: 0,
        });
      });

      setIsOpen(false);
    } else {
      // Opening animation
      setStyleProps({
        ...styleProps,
        maxHeight: `${el.scrollHeight}px`,
        opacity: 1,
      });

      setIsOpen(true);
    }
  };

  // When opened, allow content to adjust height naturally
  const handleTransitionEnd = () => {
    if (isOpen) {
      setStyleProps((prev) => ({
        ...prev,
        maxHeight: "none",
      }));
    }
  };

  const onDurationChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) setDurationMs(val);
  };

  return (
    <div className="toggle-text-wrap">
      <div className="controls">

        <button className="toggle-btn" onClick={toggle}>
          {isOpen ? "Hide text" : "Show text"}
        </button>

        <label className="duration-label">
          Animation duration (ms):
          <input
            type="number"
            min="0"
            step="50"
            value={durationMs}
            onChange={onDurationChange}
            className="duration-input"
          />
        </label>
      </div>

      <div
        ref={contentRef}
        className="toggle-content"
        style={{
          maxHeight: styleProps.maxHeight,
          opacity: styleProps.opacity,
          transitionDuration: styleProps.transitionDuration,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="toggle-content-inner">
          <h3>Stylish colorful block 🎨</h3>

          <p>
            This is a modern, colorful, smoothly animated ToggleText component.
            You can control the animation duration, and the block will open and close smoothly.
          </p>

          <p>
            The design is bright, soft, elegant, and fully responsive.
            Works great for FAQs, hidden sections, content reveals, etc.
          </p>

          <ul>
            <li>🌈 Colorful gradients</li>
            <li>✨ Smooth animation</li>
            <li>🎛 Adjustable speed</li>
            <li>🎨 Modern clean design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
