import { CloseOutline } from '@styled-icons/evaicons-outline'
import LinkWrapper from 'components/LinkWrapper'

import * as S from './styles'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

type ImageProps = {
  url: string
  height: string
  width: string
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: ImageProps[]
  }
}

const PlacesTemplate = ({ place }: PlacesTemplateProps) => {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <>
      <NextSeo
        title={`${place.name} - My Trips`}
        description={
          place.description?.text ||
          'A simple project to show in a map the places that I went and show more informations and photos when clicked.'
        }
        canonical="https://my-trips.com"
        openGraph={{
          url: 'https://my-trips.com',
          title: `${place.name} - My Trips`,
          description:
            place.description?.text ||
            'A simple project to show in a map the places that I went and show more informations and photos when clicked.',
          images: [
            {
              url: place.gallery[0].url,
              width: Number(place.gallery[0].width),
              height: Number(place.gallery[0].height),
              alt: `${place.name}`
            }
          ]
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>

          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />

          <S.Gallery>
            {place.gallery.map((image, index) => {
              const myLoader = () => {
                return `${image.url}`
              }

              return (
                <Image
                  loader={myLoader}
                  src={image.url}
                  alt={place.name}
                  key={`photo-${index}`}
                  width={1000}
                  height={600}
                  quality={75}
                />
              )
            })}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}

export default PlacesTemplate
