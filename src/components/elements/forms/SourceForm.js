import React, {useState} from "react";
import AutoComplete from "./AutoComplete";
import Button from "./Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import {v4 as uuid4} from 'uuid';
import ElevatedBox from "../misc/ElevatedBox";
import FormSubHeader from "../misc/FormSubHeader";
import FormDescription from "../misc/FormDescription";
import Columns from "../misc/Columns";
import Rows from "../misc/Rows";
import Form from "../misc/Form";
import FormHeader from "../misc/FormHeader";
import JsonEditor from "../misc/JsonEditor";

export default function SourceForm({onSubmit, init}) {

    if (!init) {
        init = {
            name: "",
            type: {name: "", id: ""},
            description: "",
            config: {},
            consent: false
        }
    }


    const [requiresConsent, _setRequiresConsent] = useState(init.consent);
    const [enabledSource, setEnabledSource] = useState(init.enabled);
    const [type, setType] = useState(init.type);
    const [name, setName] = useState(init.name);
    const [description, setDescription] = useState(init.description);
    const [errorTypeMessage, setTypeErrorMessage] = useState('');
    const [errorNameMessage, setNameErrorMessage] = useState('');
    const [config, setConfig] = useState(JSON.stringify(init.config, null, '  '));

    const setRequiresConsent = (ev) => {
        _setRequiresConsent(ev.target.checked)
    }

    const _onSubmit = () => {

        if (!name || name.length === 0 || !type?.name) {
            if (!name || name.length === 0) {
                setNameErrorMessage("Source name can not be empty");
            } else {
                setNameErrorMessage("");
            }
            if (!type?.name) {
                setTypeErrorMessage("Source type can not be empty");
            } else {
                setTypeErrorMessage("");
            }
            return;
        }


        const payload = {
            id: (!init?.id) ? uuid4() : init.id,
            name: name,
            description: description,
            type: type.name,
            config: (config === "") ? {} : JSON.parse(config),
            consent: requiresConsent,
            enabled: enabledSource
        };
        onSubmit(payload)
    }

    return <Form>
        <Columns>
            <FormHeader>Source</FormHeader>
            <ElevatedBox className="Elevate">
                <FormSubHeader>Source type</FormSubHeader>
                <AutoComplete
                    solo={true}
                    disabled={false}
                    error={errorTypeMessage}
                    placeholder="Source type"
                    url="/sources/types"
                    initValue={type}
                    onSetValue={setType} onDataLoaded={
                    (result) => {
                        return result.data?.result.map((key) => {
                            return {name: key, id: key}
                        });
                    }
                }/>

                <FormSubHeader>Consent</FormSubHeader>
                <FormDescription>Check if this source requires user consent? Web pages
                    located in Europe require user consent to comply with GDPR. </FormDescription>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Switch
                        checked={requiresConsent}
                        onChange={setRequiresConsent}
                        name="concetRequired"
                    />
                    <span>
                            This source requires user consent
                        </span>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Switch
                        checked={enabledSource}
                        onChange={() => setEnabledSource(!enabledSource)}
                        name="enabledSource"
                    />
                    <span>
                            This source is enabled
                        </span>
                </div>
            </ElevatedBox>

            <FormHeader>Configuration</FormHeader>
            <ElevatedBox>
                <FormSubHeader>Credentials or Access tokens</FormSubHeader>
                <FormDescription>This json data will be an encrypted part of source. Please pass here all the
                    credentials or
                    access configuration information, such as hostname, port, username and password, etc.
                    This part can be empty if source does not require authorization.</FormDescription>
                <JsonEditor value={config} onChange={setConfig}/>
            </ElevatedBox>

            <FormHeader>Description</FormHeader>
            <ElevatedBox>
                <FormSubHeader>Name</FormSubHeader>
                <FormDescription>Source name can be any string that
                    identifies source. Source id is made out of rule
                    name by replacing spaces with hyphens and lowering the string
                </FormDescription>
                <TextField
                    label={"Source name"}
                    value={name}
                    error={errorNameMessage}
                    helperText={errorNameMessage}
                    onChange={(ev) => {
                        setName(ev.target.value)
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                />

                <FormSubHeader>Description <sup style={{fontSize: "70%"}}>* optional</sup></FormSubHeader>
                <FormDescription>Description will help you to understand what a rule is
                    doing.
                </FormDescription>
                <TextField
                    label={"Rule description"}
                    value={description}
                    multiline
                    rows={3}
                    onChange={(ev) => {
                        setDescription(ev.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                />

            </ElevatedBox>
        </Columns>
        <Rows style={{paddingLeft: 30}}>
            <Button label="Save" onClick={_onSubmit}/>
        </Rows>
    </Form>
}
