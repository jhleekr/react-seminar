import { useEffect, useRef, useState } from "react";

const TodoItem = (onclick, index, content, isComplete) => {
  const colors = ["#F8F6E3", "#97E7E1", "#6AD4DD", "#7AA2E3"];
  const Random = (maxval) => {
    const randomNumber = Math.floor(Math.random() * maxval);
    return randomNumber;
  };

  const DeleteHandler = () => {
    onclick(index, 1);
  };

  const CompleteHandler = () => {
    onclick(index, 2);
  };

  const stylesheet = {
    width: "280px",
    height: "auto",
    display: "grid",
    "grid-template-columns": "repeat(3, 60px) 1fr",
    "grid-template-rows": "35px 1fr",
    "background-color": colors[Random(colors.length)],
    "border-radius": "10px",
    margin: "10px",
  };
  const textstyle = {
    padding: "10px",
    "font-size": "15px",
  };
  return (
    <div key={index} id={index} style={stylesheet}>
      <div style={textstyle} onClick={DeleteHandler}>
        삭제
      </div>
      {isComplete ? (
        <div></div>
      ) : (
        <div onClick={CompleteHandler} style={textstyle}>
          완료
        </div>
      )}
      <div style={textstyle}></div>
      <div
        style={Object.assign({}, textstyle, {
          "grid-column": "1 / 5",
          "grid-row": "2 / 3",
        })}
      >
        {content}
      </div>
    </div>
  );
};

export const Todo = () => {
  const [todoList, setTodoList] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const storage = localStorage.getItem("todoList");
    setTodoList(storage !== null ? JSON.parse(storage) : []);
  }, []);
  useEffect(() => {
    if (todoList != null) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const clickHandler = () => {
    const content = inputRef.current.value;
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    setTodoList((curr) =>
      curr.length
        ? curr.concat([{ key: curr[curr.length - 1].key + 1, content: content, isComplete: false }])
        : [{ key: 1, content: content, isComplete: false }]
    );
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const taskClickHandler = (index, operation) => {
    var newList = Object.assign([], todoList);
    if (operation === 1) {
      for (const item of newList) {
        if (item.key === index) {
          const nindex = newList.indexOf(item);
          newList.splice(nindex, 1);
          setTodoList(newList);
          return;
        }
      }
    } else if (operation === 2) {
      for (const item of newList) {
        if (item.key === index) {
          const nindex = newList.indexOf(item);
          newList.splice(nindex, 1);
          setTodoList(newList.concat([{ key: item.key, content: item.content, isComplete: true }]));
          return;
        }
      }
    }
  };

  const taskTodo = todoList ? (
    todoList.map((item) =>
      !item.isComplete ? TodoItem(taskClickHandler, item.key, item.content, item.isComplete) : <></>
    )
  ) : (
    <></>
  );

  const taskDone = todoList ? (
    todoList.map((item) =>
      item.isComplete ? TodoItem(taskClickHandler, item.key, item.content, item.isComplete) : <></>
    )
  ) : (
    <></>
  );

  const stylesheet = {
    display: "flex",
    "flex-direction": "column",
    "font-size": "20px",
  };
  const childstyle = {
    margin: "10px",
  };
  const flexstyle = {
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
  };

  return (
    <>
      <div style={stylesheet}>
        <div style={childstyle}>Welcome to Todo List</div>
        <div style={childstyle}>
          <input ref={inputRef} type="text"></input>
          <button onClick={clickHandler}>Add Task</button>
        </div>
        <div style={childstyle}>Task to do</div>
        <div style={Object.assign({}, flexstyle, childstyle)}>{taskTodo}</div>
        <div style={childstyle}>Task Completed</div>
        <div style={Object.assign({}, flexstyle, childstyle)}>{taskDone}</div>
      </div>
    </>
  );
};
