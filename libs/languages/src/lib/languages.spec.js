import { render } from '@testing-library/react';
import Languages from './languages';
describe('Languages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Languages />);
    expect(baseElement).toBeTruthy();
  });
});
