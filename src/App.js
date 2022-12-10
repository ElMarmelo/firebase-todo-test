import React, { useState, useEffect, querySnapshot } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-400 to-sky-600`,
  container: `bg-slate-800 max=-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-white p-4`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 sm:mt-0 bg-blue-500 text-slate-100 rounded-lg`,
  count: `text-center p-2 text-white text-xl`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //Crear un TODO
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("No es posible agregar una tarea vacía, por favor escribe algo");
      return;
    }
    await addDoc(collection(db, "pending"), {
      text: input,
      completed: false,
    });
    setInput('')
  };

  //Leer un TODO desde Firebase
  useEffect(() => {
    const q = query(collection(db, "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);

  //Actualizar un TODO en Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "pending", todo.id), {
      completed: !todo.completed,
    });
  };

  //Borrar un TODO
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'pending', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Listicas bonitas</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Lavar los platos"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.button}>
            <AiOutlinePlusCircle size={30} />
          </button>
        </form>
        <ul>
          <li>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete}  deleteTodo={deleteTodo}/>
            ))}
          </li>
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>Tienes {todos.length} tareas pendientes</p>}
      </div>
    </div>
  );
}

export default App;
