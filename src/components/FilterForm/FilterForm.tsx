import "./styles.css";
import { useState, useEffect } from 'react';

export function FilterForm(props) {
  const [isOpened, setOpened] = useState<string>('all')
  const [isFriends, setFriends] = useState<string>("all");
  const [color, setColor] = useState<string>("all");


  const changeOpened =(e)=>{
    setOpened(e.target.value)
  }

   const changeFriends = (e) => {
     setFriends(e.target.value);
   };

    const changeColor = (e) => {
      setColor(e.target.value);
    };

  useEffect(() => {
    props.getIsOpenedValue(isOpened)
    props.getIsFrinedsValue(isFriends)
    props.getColorValue(color)
  }, [isOpened, isFriends, color]);

  return (
    <>
      <div className="label-panel">
        <p className="label">Тип группы</p>
        <p className="label">Цвет аватарки</p>
        <p className="label">Общие друзья</p>
      </div>
      <div className="filterForm">
        <select value={isOpened} id="isOpened" onChange={changeOpened}>
          <option value="all">Все</option>
          <option value="false">Открытые</option>
          <option value="true">Закрытые</option>
        </select>

        <select value={color} id="colorAvatar" onChange={changeColor}>
          <option value="all">Любой</option>
          <option value="red">Красный</option>
          <option value="green">Зеленый</option>
          <option value="blue">Синий</option>
          <option value="white">Белый</option>
          <option value="orange">Оранжевый</option>
          <option value="purple">Фиолетовый</option>
          <option value="yellow">Желтый</option>
        </select>

        <select value={isFriends} id="friends" onChange={changeFriends}>
          <option value="all">Все</option>
          <option value="friends">Есть общие друзья</option>
          <option value="noFriends">Нет общих друзей</option>
        </select>
      </div>
    </>
  );
}
