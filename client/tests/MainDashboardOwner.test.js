import React from 'react';
import TestRenderer from 'react-test-renderer';
import MainDashboardOwner from '../src/containers/OwnerDashboard/MainDashboardOwner';
import { BrowserRouter } from 'react-router-dom';

// Mocking useNavigate since it's used within the component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
  useNavigate: () => jest.fn(), // Mock useNavigate with a jest function
}));

// Mocking fetch to simulate API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      value: {
        firstName: 'John',
        lastName: 'Doe',
        property: {
          companyName: 'Acme Inc.',
        },
      },
    }),
  })
);

// Test to render MainDashboardOwner component
describe('MainDashboardOwner Component', () => {
  it('renders correctly', async () => {
    let testRenderer;
    await TestRenderer.act(async () => {
      testRenderer = TestRenderer.create(
        <BrowserRouter>
          <MainDashboardOwner />
        </BrowserRouter>
      );
    });
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});