import { useEffect, useState } from "react";
import { FilterForm } from "./components/FilterForm/FilterForm";
import { FilteredContext } from "./components/FilteredResults/FilteredContext";
import { FilteredResults } from "./components/FilteredResults/FilteredResults";
import { mockData } from "./mockData";
import setContent from "./components/setContent";
interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

interface User {
  first_name: string;
  last_name: string;
}

export default function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isOpened, setIsOpened] = useState<string>("");
  const [isFriends, setIsFriends] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [process, setProcess] = useState("waiting");

  const getIsOpenedValue = (isOpened) => {
    setIsOpened(isOpened);
  };
  const getIsFrinedsValue = (isFriends) => {
    setIsFriends(isFriends);
  };
  const getColorValue = (color) => {
    setColor(color);
  };

  useEffect(() => {
    updateGroups();
  }, [isOpened, isFriends, color]);

  const updateGroups = () => {
    new Promise<GetGroupsResponse>((response) => {
      setProcess("loading");
      setTimeout(() => {
        const filteredData = filtered(mockData, isOpened, isFriends, color);
        const result = filteredData.length === 0 ? 0 : 1;
        response({ result, filteredData });
      }, 1000);
    })
      .then(({ result, filteredData }) => {
        if (result === 0 && process != "loading") {
          throw new Error("group not found");
        }
        onInfoLoaded(filteredData);
        setProcess("confirmed");
      })
      .catch(() => setProcess("error"));
  };
  const onInfoLoaded = (info: Group[]) => {
    setGroups(info);
  };

  const filtered = (
    groups: Group[],
    filterIsOpened: string,
    filterIsFriends: string,
    filterColor: string
  ) => {
    let filteredGroups = groups.filter(
      (group) => filterIsOpened === "all" || "" + group.closed == filterIsOpened
    );
    filteredGroups = filteredGroups.filter(
      (group) =>
        filterIsFriends === "all" ||
        (filterIsFriends === "friends" ? group.friends : !group.friends)
    );
    filteredGroups = filteredGroups.filter(
      (group) => filterColor === "all" || "" + group.avatar_color == filterColor
    );
    if (filteredGroups.length === 0) {
      setProcess("founding");
      return;
    }
    return filteredGroups;
  };

  return (
    <FilteredContext.Provider value={{ groups }}>
      <FilterForm
        getIsOpenedValue={getIsOpenedValue}
        getIsFrinedsValue={getIsFrinedsValue}
        getColorValue={getColorValue}
      />
      {setContent(process, <FilteredResults />)}
    </FilteredContext.Provider>
  );
}
