"use client"
import classNames from "classnames";
import { Icon, IconName } from "components/icons/icons";
import React from "react";

import { Project } from "../projects-service";
import styles from "./CardProject.module.css";

export type AddFilterEvent = {
  icon?: IconName;
  year?: number;
};

export function CardProject(
  { project, onAddFilterClick }: { project: Project; onAddFilterClick?: (event: AddFilterEvent) => void },
) {
  const links: ProjectLinkProps[] = [
    {
      href: project.deploy_link,
      samePage: project.open_same_page,
      label: "Live Site",
      iconName: "live",
      iconColor: "blue",
    },
    {
      href: project.code_link,
      label: "View Code",
      iconName: "github",
      iconColor: "black",
    },
    {
      href: project.article_link,
      label: "View Docs",
      iconName: "book",
      iconColor: "maroon",
    },
    {
      href: project.presentation_link,
      label: "View Presentation",
      iconName: "play",
      iconColor: "maroon",
    },
  ];

  return (
    <div
      className={classNames(
        { [styles.hazardBorder]: project.wip },
        "p-3 h-full flex items-center flex-col border-2 w-full rounded-md text-center hover:border-red-700 hover:bg-gray-700 hover:text-white",
      )}
    >
      {project.wip && <p className="text-xs -mt-3 italic text-orange-600">^ Work In Progress</p>}
      <p className="text-xl font-bold truncate w-full" title="project.name">{project.name}</p>
      <div className="flex">
        {project.icons?.map(icon => (
          <div key={icon} className="mx-1">
            <Icon onClick={() => onAddFilterClick?.({ icon })} iconName={icon as any} />
          </div>
        ))}
      </div>
      <div className="mt-2 text-black flex justify-around">
        <span
          className="px-2 rounded-xl bg-gray-400"
          onClick={() => onAddFilterClick?.({ year: project.year })}
        >
          {project.year}
        </span>
      </div>
      <p className="mb-2">{project.tools?.join(", ")}</p>
      <div className="underline flex flex-col items-center">
        {links.filter(l => l.href).map((linkProps) => <ProjectLink key={linkProps.href} {...linkProps} />)}
      </div>
      <p className="mt-2 mb-0">{project.description}</p>
    </div>
  );
}

type ProjectLinkProps = {
  href: string | undefined;
  label: string;
  iconName: IconName;
  iconColor: string;
  samePage?: boolean;
};

function ProjectLink(props: ProjectLinkProps) {
  return (
    <a className="flex items-center" href={props.href} target={props.samePage ? "_blank" : undefined}>
      <Icon iconName={props.iconName} width={20} color={props.iconColor} />
      <span className="ml-2">{props.label}</span>
    </a>
  );
}
