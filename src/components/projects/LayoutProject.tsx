import { Icon, IconName } from "../icons/icons";
import { Project } from "./projects-service";

export function LayoutProject(props: { project: Project; children: React.ReactNode }) {
  const { project } = props;
  const links = [
    { href: project.deploy_link, label: "Live site", icon: "live" as const },
    { href: project.code_link, label: "View code", icon: "github" as const },
    { href: project.article_link, label: "View article", icon: "book" as const },
  ].filter(link => link.href);

  return (
    <div>
      <header className="pt-6 mb-6 flex flex-col gap-5 sm:flex-row sm:items-start">
        {project.thumbnail && (
          <img
            className="h-40 w-full rounded object-cover sm:w-56"
            src={project.thumbnail}
            alt=""
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{project.name}</h1>
          <p className="mt-2">{project.description}</p>
          <p className="mt-3 text-sm text-gray-600">{project.year}</p>
          {project.tools?.length > 0 && <p className="mt-1">{project.tools.join(", ")}</p>}
          {project.icons?.length > 0 && (
            <div className="mt-3 flex gap-2" aria-label="Technologies">
              {project.icons.map(icon => <Icon key={icon} iconName={icon as IconName} width={28} />)}
            </div>
          )}
          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {links.map(link => (
                <a className="link flex items-center gap-2" href={link.href} key={link.label}>
                  <Icon iconName={link.icon} width={20} />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
      {props.children}
    </div>
  );
}
