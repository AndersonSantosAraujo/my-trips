jest.mock('next/router', () => require('next-router-mock'))
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MapProps } from '.'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useRouter } from 'next/router'

// Mock ->
const MapMock = ({ places }: MapProps) => {
  const router = useRouter()

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places?.map(({ id, slug, name, location }) => {
        const { latitude, longitude } = location

        return (
          <Marker
            key={`place-${id}`}
            position={[latitude, longitude]}
            title={name}
            eventHandlers={{
              click: () => {
                router.push(`/place/${slug}`)
              }
            }}
          />
        )
      })}
    </MapContainer>
  )
}
// <- Mock

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<MapMock />)

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

    render(<MapMock places={[place, place_]} />)

    expect(screen.getByTitle(/são paulo/i)).toBeInTheDocument()
    expect(screen.getByTitle(/lisboa/i)).toBeInTheDocument()
  })
})
