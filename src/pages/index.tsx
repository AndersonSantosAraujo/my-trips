import HomeTemplate from 'templates/Home'
import { MapProps } from 'components/Map'

import React from 'react'
import { GetStaticProps } from 'next'
import { GET_PLACES } from 'graphql/queries'
import { GetPlacesQuery } from 'graphql/generated/graphql'
import client from 'graphql/client'

export default function Home({ places }: MapProps) {
  return <HomeTemplate places={places} />
}

export const getStaticProps: GetStaticProps = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES)

  return {
    props: {
      places
    }
  }
}
