import { CardProject } from "./components/CardProject";
import { Project } from "./projects-service";

export function LayoutProject(props: { project: Project }) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{props.project.name}</h1>
      <p className="text">{props.project.description}</p>
      <CardProject project={props.project} />
    </div>
  );
}
