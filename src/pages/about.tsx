import client from 'graphql/client'
import { GET_PAGES } from 'graphql/queries'
import { useRouter } from 'next/router'
import PageTemplate from 'templates/Pages'

type Page = {
  id: string
  heading: string
  slug: string
  body: {
    html: HTMLElement
  }
}

export default function AboutPage() {
  const router = useRouter()

  // retorna um loading ou outra coisa, enquanto está sendo criado
  if (router.isFallback) return null

  return <PageTemplate />
}

// Gerando as URLS das minhas páginas, mas não o conteúdo
export async function getStaticPaths() {
  const { pages }: { pages: Page[] } = await client.request(GET_PAGES, {
    first: 3
  })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// export const getStaticProps = async () => {
//   const { pages }: { pages: Page[] } = await client.request(GET_PAGES)

//   console.log(pages)

//   return {
//     props: {}
//   }
// }

// MÉTODOS DO NEXTJS
// getStaticPaths -> gerar as URLS das páginas em build time
// getStaticProps -> buscar dados da página (props) em build time
// getServerSideProps -> buscar dados da páfina em runtime (toda request) o bundle fica no server
// getInitialProps -> similar ao getServerSideProps, porém o bundle também no client (hydrate); está em desuso
