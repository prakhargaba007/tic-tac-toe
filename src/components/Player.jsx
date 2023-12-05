import React, { useState } from "react";
function Player(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);

    function handleEditClick() {
        setIsEditing((Editing) => !Editing);
        if (isEditing) {
            props.onChangeName(props.symbol, name);
        }
    }
    function setHandleEditClick(event) {
        setName(event.target.value)
    }

    let playerName = <span
        className="player-name"
        onClick={handleEditClick}
    >{name}
    </span>;

    if (isEditing) {
        playerName = <input
            onChange={setHandleEditClick}
            value={name}
            type="text"
            required
        />;
    }

    return (
        <li className={props.isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">
                    {props.symbol}
                </span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
export default Player;
