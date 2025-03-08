import { memo } from 'react'
import Placeholder from '../assets/placeholder.png'

function Card({ data }) {

    const { name, image, description, price } = data

    console.log(`Rendering card for ${name}`)

    return (
        <div className="bg-gray-300 rounded-lg p-4 flex flex-col gap-2 my-4">
            <figure>
                <img className="w-full object-cover h-48 rounded-lg" src={image === null || undefined ? Placeholder : image} alt={name} />
            </figure>
            <div className="flex flex-col gap-3">
                <strong>{name}</strong>
                <span>{price}€</span>
                <p className="overflow-y-auto max-h-40">{description}</p>
            </div>
        </div>
    )
}

export default memo(Card)