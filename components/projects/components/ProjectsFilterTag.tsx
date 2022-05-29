import classNames from "classnames";
import { Icon } from "components/icons/icons";

export function ProjectsFilterTag(props: {
  enabled: boolean,
  iconLabel: string,
  count?: string,
  color: string,
  clickedItem: () => void,
}) {
  return <div
    style={{ backgroundColor: props.color, 'gap': '0.25em' }}
    className={classNames(props.enabled && 'bg-blue-400', "rounded-xl cursor-pointer bg-gray-400 px-2 mb-1 ml-1 flex items-center")}
    onClick={props.clickedItem}
  >
    <span>{props.iconLabel}</span>
    {props.count && <span style={{ fontSize: '0.6em', fontWeight: 'bold', color: '#666' }}>{props.count}</span>}
    <span>
      {props.enabled && <Icon iconName="closex" width={10} />}
    </span>
  </div>;
}
