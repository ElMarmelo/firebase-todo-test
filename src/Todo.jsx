import React from 'react'
import {BiTrashAlt} from 'react-icons/bi'
const style = {
    li: `flex justify-between bg-slate-700 p-4 my-4 capitalze text-white text-lg`,
    liComplete: `flex flex justify-between bg-slate-200 p-4 my-2 capitalze`,
    row: `flex`,
    text: `ml-2 cursos-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
    checkbox: `bg-white text-black text-xl`
}

const Todo = ({todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={style.li}>
        <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} className={style.checkbox}/>
            <p onChange={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)}>{<BiTrashAlt size={24}/>}</button>
    </li>

  )
}

export default Todo