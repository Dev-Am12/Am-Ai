"use client";
import { useState, useEffect } from "react";

interface IconProps {
    name: string;
    size?: number;
    className?: string;
    strokeColor?: string;
}

export default function Icon({ name, size = 20, className = "", strokeColor = "currentColor" }: IconProps) {
    const [svgContent, setSvgContent] = useState<string>("");

    useEffect(() => {
        fetch(`/icons/${name}.svg`)
            .then((r) => {
                if (!r.ok) throw new Error("Icon not found");
                return r.text();
            })
            .then((text) => setSvgContent(text))
            .catch(() => setSvgContent(""));
    }, [name]);

    if (!svgContent) {
        return <span style={{ width: size, height: size, display: "inline-block" }} className={className} aria-hidden="true" />;
    }

    return (
        <span
            className={`inline-block ${className}`}
            style={{ width: size, height: size }}
            aria-hidden="true"
            dangerouslySetInnerHTML={{
                __html: `<style>svg{stroke:${strokeColor};width:100%;height:100%;display:block;}</style>${svgContent}`,
            }}
        />
    );
}