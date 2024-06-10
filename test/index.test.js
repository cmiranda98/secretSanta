import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SantaCard from '../../secretSanta/src/_containers/home/components/SantaCard';
// global.React = React;

afterEach(cleanup);

it('SantaCard', () => {
    const { getByTestId  } = render(<SantaCard data={["Carlos", "Alberto", "Miranda"]} />);
    const container = getByTestId('santa-card');
    const columns = container.querySelectorAll('.person-text');
    expect(columns.length).toBe(3);
});