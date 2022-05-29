import classNames from "classnames";
import { Icon } from "components/icons/icons";
import React from "react";
import { ProjectOrderType } from "./projects-service";

export type OrderChangedEvent = {
  orderBy?: ProjectOrderType,
  ascending?: boolean,
}

const orderByArray: ProjectOrderType[] = [
  ProjectOrderType.NAME,
  ProjectOrderType.YEAR,
]

export function ProjectsOrder(props: { orderChangedEvent: (event: OrderChangedEvent) => void }) {
  const [orderSelected, setOrderSelected] = React.useState<ProjectOrderType>(ProjectOrderType.YEAR)
  const [orderReversed, setOrderReversed] = React.useState(false);

  function clickOrderBy(order: ProjectOrderType) {
    const alreadySelected = order === orderSelected;
    if (alreadySelected) {
      clickReverse();
    } else {
      setOrderSelected(order);
    }
  }

  function clickReverse() {
    setOrderReversed(v => !v);
  }

  React.useEffect(() => {
    props.orderChangedEvent({ orderBy: orderSelected, ascending: orderReversed });
  }, [orderSelected, orderReversed]);

  return <div className="border-2 rounded-md mt-2">
    <div className="p-1 flex justify-between">
      <p className="text-gray-700 -mt-1">Order Projects:</p>
    </div>
    <div className="m-1 flex flex-wrap items-center gap-x-1">
      {orderByArray.map(order => <span
        key={order}
        className={classNames(order === orderSelected && 'bg-green-400', "cursor-pointer px-2 py-0 bg-gray-400 rounded-2xl")}
        onClick={() => clickOrderBy(order)}
      >
        {order}
      </span>)}
      <span
        style={{
          transform: !orderReversed ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'all 0.3s'
        }}
      >
        <Icon onClick={clickReverse} iconName="arrowsupdown" width={24} />
      </span>
    </div>
  </div>;
}
