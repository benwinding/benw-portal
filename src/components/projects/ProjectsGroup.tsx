import classNames from "classnames";
import React from "react";

export enum ProjectGroupType {
  TYPE,
  YEAR,
  TECH,
}

const groupByArray: ProjectGroupType[] = [
  ProjectGroupType.TYPE,
  ProjectGroupType.YEAR,
  ProjectGroupType.TECH,
];

export function ProjectsGroup(props: { groupChangedEvent: (groupby: ProjectGroupType) => void }) {
  const [groupSelected, setGroupSelected] = React.useState<ProjectGroupType>(ProjectGroupType.YEAR);

  function clickGroupBy(group: ProjectGroupType) {
    setGroupSelected(group);
    props.groupChangedEvent(group);
  }

  return (
    <div className="border-2 rounded-md mt-2">
      <div className="p-1 flex justify-between">
        <p className="text-gray-700 -mt-1">Group Projects:</p>
      </div>
      <div className="m-1 flex flex-wrap items-center">
        {groupByArray.map(group => (
          <span
            key={group}
            className={classNames(
              group === groupSelected && "bg-green-400",
              "cursor-pointer px-1 py-0 bg-gray-400 rounded-2xl mr-1",
            )}
            onClick={() => clickGroupBy(group)}
          >
            {group}
          </span>
        ))}
      </div>
    </div>
  );
}
