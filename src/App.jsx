import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState(""); //this for input text
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true); //this for holding arrays
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos)); //to save and fetch todos from localstorage
  };
  const togglefinish = () => {
    setshowfinished(!showfinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
    savetoLs();
  };
  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
    savetoLs();
  };
  const handleAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo("");
    savetoLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    savetoLs();
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="text-center font-bold text-3xl">
          iTask-Manage your Todos at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-2"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 text-sm disabled:bg-violet-700 font-bold hover:bg-violet-900 text-white p-4 py-2 rounded-full mx-2 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="mx-2"
          onChange={togglefinish}
          type="checkbox"
          checked={showfinished}
        />{" "}
        Show Finished
        <div className="h-[1px] bg-black w-[90%] mx-auto my-3"></div>
        <h2 className="text-xl font-bold my-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No Todos Yet! Add one to get started.</div>
          )}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div className="todo flex justify-between   my-3" key={item.id}>
                  <div className="flex gap-5 ">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />

                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 text-sm font-bold hover:bg-violet-900 text-white px-2 py-1 rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 text-sm font-bold hover:bg-violet-900 text-white px-2 py-1 rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
