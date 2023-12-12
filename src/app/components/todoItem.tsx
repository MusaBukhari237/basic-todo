import React from 'react'

export default function TodoItem({ onEdit, onDelete, todo, index, ...props }: { onEdit: (index: number) => void, onDelete: (index: number) => void, todo: string, index: number, props?: any }) {
    return (
        <div>
            <li className="flex items-center bg-gray-200 mb-2 p-2 rounded-lg pl-4" {...props}>
                <span className="w-full">{todo}</span>
                <button className="w-fit p-2 px-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => onEdit(index)}>Edit</button>
                <button className="w-fit p-2 px-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => onDelete(index)}>Delete</button>
            </li>
        </div>
    )
}
