import { useState } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import "./comments.scss";
import { __localStorageGet } from "./Utility/Utility";
const comments = {
  id: 1,
  items: [],
};
const App = () => {
  const [commentsData, setCommentsData] = useState( comments);

  localStorage.setItem('comments',JSON.stringify(commentsData))

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item,cotnent) => {
    debugger
    const finalStructure = insertNode(commentsData, folderId, item,cotnent);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    debugger
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
console.log(commentsData,"#REWQR")
  return (
    <div className="App">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
};

export default App;