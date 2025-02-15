import {MenuItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import "./CopyTraitsForm.css";
import DottedPathInput from "./inputs/DottedPathInput";
import {AiOutlinePlusCircle} from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import TextField from "@material-ui/core/TextField";
import {VscTrash} from "@react-icons/all-files/vsc/VscTrash";
import {objectMap} from "../../../misc/mappers";

const CopyTraitsForm = ({
                            onChange = () => {
                            }, value, actions = {set: "Set"}, defaultAction = "Set", defaultSource="event@", defaultTarget="profile@",
                        }) => {
    const [localValue, setLocalValue] = useState(value || {});
    const [target, setTarget] = useState(defaultTarget);
    const [source, setSource] = useState(defaultSource);
    const [task, setTask] = useState(defaultAction);

    const handleAdd = (e) => {
        if (task !== "" && target !== "" && source !== "") {
            const value = {
                ...localValue,
                [task]: {...localValue[task], [target]: source},
            }
            setLocalValue(value);
            onChange(value);
        }
    };

    const handleDelete = (task, item) => {
        const newCopy = localValue;
        delete newCopy[task][item];
        setLocalValue({...newCopy});
    };

    useEffect(() => {
    }, [localValue]);

    return (
        <div className="CopyTraitsForm">
            <fieldset>
                <legend>Operations</legend>
                <ul className="CopyTraitsList">
                    {Object.keys(localValue).map((task, i) => {
                        return Object.keys(localValue[task]).map((item, j) => {
                            return (
                                <li key={`${task}${j}`}>
                                    <p>{`${item} ${task} to: ${localValue[task][item]}`}</p>
                                    <VscTrash
                                        size={25}
                                        onClick={() => {
                                            handleDelete(task, item);
                                        }}
                                        className="Button DeleteButton"
                                    />
                                </li>
                            );
                        });
                    })}
                </ul>
            </fieldset>
            <div className="CopyTraitsInput">
                <div style={{margin: "5px 0 15px 0", fontSize: "140%"}}>
                    Use this form to add operations.
                </div>
                <DottedPathInput label="Target" value={target} onChange={setTarget}/>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: "10px",
                        paddingTop: "10px",
                    }}
                >
                    <TextField
                        select
                        variant="outlined"
                        size="small"
                        label="Operation"
                        value={task}
                        defaultValue={defaultAction}
                        style={{width: 120, justifySelf: "center"}}
                        onChange={(e) => setTask(e.target.value)}
                    >
                        {objectMap(actions, (key, value) => <MenuItem value={key} key={key}>{value}</MenuItem>)}
                    </TextField>
                </div>
                <div className="Target">
                    <DottedPathInput label="Source" value={source} onChange={setSource} defaultSourceValue={defaultSource}/>
                    <AiOutlinePlusCircle size={25} onClick={handleAdd} className="Button AddButton"/>
                </div>
            </div>

        </div>
    );
};

export default CopyTraitsForm;
