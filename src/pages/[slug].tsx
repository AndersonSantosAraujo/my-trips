import client from 'graphql/client'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // retorna um loading ou outra coisa, enquanto está sendo criado
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

// Gerando as URLS das minhas páginas, mas não o conteúdo
export async function getStaticPaths() {
  const { pages } = await client.request(GET_PAGES, {
    first: 3
  })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }

  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}

// MÉTODOS DO NEXTJS
// getStaticPaths -> gerar as URLS das páginas em build time
// getStaticProps -> buscar dados da página (props) em build time
// getServerSideProps -> buscar dados da páfina em runtime (toda request) o bundle fica no server
// getInitialProps -> similar ao getServerSideProps, porém o bundle também no client (hydrate); está em desuso
