import "./style.css";
import { useState } from "react";

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
export function GroupCard(props:Group) {
  const [isClicked, setClicked] = useState(false);

  const findFriends = () => {
    return (
      <div className="friendsList">
        {props.friends && props.friends.length > 0 ? (
          props.friends.map((friend, index) => (
            <p key={index}>
              {friend.first_name} {friend.last_name}
            </p>
          ))
        ) : (
          <p>No friends to display</p>
        )}
      </div>
    );
  };

  return (
    <div className="groupCard">
      <div
        className="groupAvatar"
        style={{
          backgroundColor: props.avatar_color ? props.avatar_color : "",
        }}
        data-color={props.avatar_color}
      ></div>
      <div className="groupInfo">
        <div>{`${props.name}`}</div>
        <div>{`${
          props.members_count ? ` Участники: ${props.members_count}` : ""
        }`}</div>
        <div>{`Статус: ${
          props.closed ? "закрытая группа" : "открытая группа"
        }`}</div>
        <div className="friends" onClick={() => setClicked(!isClicked)}>
          {`${props.friends ? `Общие друзья: ${props.friends.length} ` : ""}`}
        </div>
        {isClicked ? findFriends() : null}
      </div>
    </div>
  );
}
