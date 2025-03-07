import { memo } from 'react'
import Placeholder from '../assets/placeholder.png'

function Card({ data }) {

    const { name, image, position, biography, dob } = data

    console.log(`Rendering card for ${name}`)

    return (
        <div className="bg-gray-300 rounded-lg p-4 flex flex-col gap-2">
            <figure>
                <img className="w-full object-cover h-48 rounded-lg" src={image === null || undefined ? Placeholder : image} alt={name} />
            </figure>
            <div className="flex flex-col gap-3">
                <strong>{name}</strong>
                <span>{dob}</span>
                <span>{position}</span>
                <p className="overflow-y-auto max-h-40">{biography}</p>
            </div>
        </div>
    )
}

export default memo(Card)