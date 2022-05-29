import classNames from "classnames";
import { Icon, IconName } from "components/icons/icons";

export function ProjectsFilterItem(props: {
  enabled: boolean,
  iconName: IconName,
  iconLabel: string,
  clickedItem: () => void,
}) {
  return <div className="w-full">
    <label
      className={classNames(props.enabled && 'bg-blue-400', "cursor-pointer hover:bg-gray-400 flex items-center")}
      onClick={props.clickedItem}
    >
      <Icon width={24} className="mx-1 py-1" iconName={props.iconName} />
      <span className="w-full">{props.iconLabel}</span>
      <span>
        {props.enabled && <Icon iconName="uparrow"/>}
      </span>
    </label>
  </div>;
}
