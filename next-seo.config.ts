import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://my-trips.com',
    siteName: 'My Trips'
  },
  twitter: {
    handle: '@mytrips',
    site: '@site',
    cardType: 'summary_large_image'
  }
}

export default config
