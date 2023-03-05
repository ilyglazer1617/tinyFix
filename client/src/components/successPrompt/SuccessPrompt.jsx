import "./successPrompt.css";
import { useContext, useEffect } from "react";
import { CommentsContext } from "./../../context/CommentsContext";
const SuccessPrompt = () => {
    const { promptMessage, showPromptMessage } = useContext(CommentsContext);
    useEffect(() => {}, [promptMessage]);
    return (
        <div className="successPrompt">
            <p>{promptMessage}</p>
        </div>
    );
};

export default SuccessPrompt;
