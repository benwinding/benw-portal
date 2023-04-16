import { Icon } from "components/icons/icons";
import React from "react";

export function FilterContainer(props: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-t">
      <div className="flex items-center px-1 hover:bg-gray-200 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <span
          className="bg-gray-300 rounded-full p-1"
          style={{
            transform: !open ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "all 0.3s",
          }}
        >
          <Icon iconName="uparrow" width={16} />
        </span>
        <p className="ml-3 text-xl">{props.label}</p>
      </div>
      {open && <div>{props.children}</div>}
    </div>
  );
}
