"use client";
import { useState, useEffect } from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export default function Icon({ name, size = 20, className = "", strokeColor = "currentColor", fillColor }: IconProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(`/icons/${name}.svg`)
      .then((r) => r.text())
      .then((text) => setSvgContent(text))
      .catch(() => setSvgContent(""));
  }, [name]);

  if (!svgContent) {
    return <span style={{ width: size, height: size, display: "inline-block", flexShrink: 0 }} className={className} aria-hidden="true" />;
  }

  const fillStyle = fillColor ? `svg{fill:${fillColor};}` : "";
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: `<style>svg{stroke:${strokeColor};width:100%;height:100%;display:block;}${fillStyle}</style>${svgContent}`,
      }}
    />
  );
}
