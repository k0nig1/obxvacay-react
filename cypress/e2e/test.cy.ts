/// <reference types="cypress" />

describe('Homepage Tests', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should display the OBX Vacay logo in the header', () => {
    // Check if the logo is visible in the header
    cy.get('ion-header .header-logo').should('be.visible');
  });

  it('should display the LivestreamReactPlayer component', () => {
    // Ensure that the LivestreamReactPlayer component loads
    cy.get('ion-card ion-spinner').should('exist'); // Spinner shows during lazy loading
    cy.get('ion-card ion-spinner').should('not.exist'); // Spinner should disappear once loaded
    cy.get('ion-card').should('exist'); // Check that the Livestream player card is visible
  });

  it('should display the WeatherForecast component with the correct location', () => {
    // Check that the WeatherForecast component loads with the correct location
    cy.get('ion-card ion-spinner').should('exist'); // Spinner shows during lazy loading
    cy.get('ion-card ion-spinner').should('not.exist'); // Spinner should disappear once loaded
    cy.get('WeatherForecast').should('have.attr', 'location', '27959');
  });

  it('should display buttons for external links and navigate correctly', () => {
    // OBX Voice button
    cy.get('ion-button').eq(0).click();
    cy.location('pathname').should('eq', '/webview');
    cy.location('href').should('include', 'outerbanksvoice.com'); // Check the URL contains the correct site

    // OBX Vacay button
    cy.go('back'); // Go back to the previous page to check the next button
    cy.get('ion-button').eq(1).click();
    cy.location('pathname').should('eq', '/webview');
    cy.location('href').should('include', 'obxvacay.com'); // Check the URL contains the correct site
  });

  it('should display social media section', () => {
    // Ensure that the SocialMediaIcons component loads
    cy.get('ion-card ion-spinner').should('exist'); // Spinner shows during lazy loading
    cy.get('ion-card ion-spinner').should('not.exist'); // Spinner should disappear once loaded
    cy.get('ion-card').contains('Follow Us On Social Media').should('exist');
  });

  it('should refresh the page when pulled down', () => {
    // Simulate the pull-to-refresh action
    cy.get('ion-content').trigger('touchstart', { touches: [{ clientY: 50 }] });
    cy.get('ion-content').trigger('touchmove', { touches: [{ clientY: 150 }] });
    cy.get('ion-content').trigger('touchend', { touches: [{ clientY: 150 }] });

    // Verify the page has refreshed (optional: Check for reloading indicators)
    cy.reload();
    cy.get('ion-header .header-logo').should('be.visible');
  });
});