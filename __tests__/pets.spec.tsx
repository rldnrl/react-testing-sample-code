import Pets from '@pages/pets'
import { render } from '@testing-library/react'

describe('Pets Page', () => {
  test('should be render', () => {
    render(<Pets />)
  })
})
