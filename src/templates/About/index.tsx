import { CloseOutline } from '@styled-icons/evaicons-outline'
import LinkWrapper from 'components/LinkWrapper'

import * as S from './styles'

const AboutTemplate = () => (
  <S.Content>
    <LinkWrapper href="/">
      <CloseOutline />
    </LinkWrapper>

    <S.Heading>My Trips</S.Heading>

    <S.Body>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint voluptas
        quidem aliquam accusamus ad praesentium et iure soluta iusto ut, autem
        fugiat molestias aperiam maiores! Soluta iure sit necessitatibus
        explicabo?
      </p>
    </S.Body>
  </S.Content>
)

export default AboutTemplate
