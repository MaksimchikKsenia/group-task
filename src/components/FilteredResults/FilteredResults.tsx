import { useContext } from "react";
import { FilteredContext } from "./FilteredContext";
import { GroupCard } from "../GroupCard/GroupCard";

import "./style.css";

export function FilteredResults() {
  const { groups } = useContext(FilteredContext);

  return (
    <div className="groupsList">
      {groups.map((group) => (
        <GroupCard {...group} key={group.id} />
      ))}
    </div>
  );
}
