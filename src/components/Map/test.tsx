import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    // screen.logTestingPlaygroundURL()
    expect(
      screen.getByRole('link', { name: /openstreetmap/i })
    ).toBeInTheDocument()
  })

  it('should render with the marker in correct place', () => {
    const place = {
      id: '1',
      name: 'São Paulo',
      slug: 'são paulo',
      location: {
        latitude: 0,
        longitude: 0
      }
    }

    const place_ = {
      id: '2',
      name: 'Lisboa',
      slug: 'lisboa',
      location: {
        latitude: 129,
        longitude: -50
      }
    }

    render(<Map places={[place, place_]} />)

    expect(screen.getByTitle(/são paulo/i)).toBeInTheDocument()
    expect(screen.getByTitle(/lisboa/i)).toBeInTheDocument()
  })
})
