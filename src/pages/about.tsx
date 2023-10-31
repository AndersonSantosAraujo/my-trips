import client from 'graphql/client'
import { GET_PAGES } from 'graphql/queries'
import AboutTemplate from 'templates/About'

type Pages = {
  pages: Page[]
}

type Page = {
  id: string
  heading: string
  slug: string
  body: {
    html: HTMLElement
  }
}

export default function AboutPage() {
  return <AboutTemplate />
}

export const getStaticProps = async () => {
  const { pages }: { pages: Pages } = await client.request(GET_PAGES)

  console.log(pages)

  return {
    props: {}
  }
}

// MÉTODOS DO NEXTJS
// getStaticPaths -> gerar as URLS das páginas em build time
// getStaticProps -> buscar dados da página (props) em build time
// getServerSideProps -> buscar dados da páfina em runtime (toda request) o bundle fica no server
// getInitialProps -> similar ao getServerSideProps, porém o bundle também no client (hydrate); está em desuso
