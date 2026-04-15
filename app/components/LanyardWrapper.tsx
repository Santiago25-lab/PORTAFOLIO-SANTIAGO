"use client";

import dynamic from "next/dynamic";

// ssr:false requerido — usa WebGL, Physics WASM y APIs del browser
const LanyardDynamic = dynamic(() => import("./Lanyard"), { ssr: false });

export default function LanyardWrapper(props: any) {
  return <LanyardDynamic {...props} />;
}
