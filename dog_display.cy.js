describe('Dog CEO API Testing with Cypress', () => {
  it('GET request - fetch random dog image and display it', () => {
    // Step 1: Request a random dog image
    cy.request('https://dog.ceo/api/breeds/image/random').then((response) => {
      // Assert that the status code is 200
      expect(response.status).to.eq(200);

      // Assert that the response body has a status of 'success'
      expect(response.body).to.have.property('status', 'success');

      // Assert that the message contains a valid URL (image link)
      expect(response.body).to.have.property('message').and.to.include('https://');

      // Step 2: Create a simple HTML to display the image
      const dogImageUrl = response.body.message;
      const html = `
        <html>
          <body>
            <h1>Random Dog Image</h1>
            <img src="${dogImageUrl}" alt="Random Dog" style="max-width: 100%; height: auto;">
          </body>
        </html>
      `;

      // Step 3: Load the HTML in Cypress
      cy.document().invoke('write', html);
    });
  });
});
