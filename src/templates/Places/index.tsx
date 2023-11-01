import React from 'react'

type ImageProps = {
  url: string
  height: string
  width: string
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description: {
      html: string
    }
    gallery: ImageProps[]
  }
}

const PlacesTemplate = ({ place }: PlacesTemplateProps) => {
  return (
    <>
      <h1>{place.name}</h1>

      <div dangerouslySetInnerHTML={{ __html: place.description.html }} />

      {place.gallery.map((image, index) => (
        <img src={image.url} alt={place.name} key={`photo-${index}`} />
      ))}
    </>
  )
}

export default PlacesTemplate
