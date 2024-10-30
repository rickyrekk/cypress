describe('Meme API Testing with Cypress', () => {
  it('GET request - fetch random meme and display it', () => {
    // Step 1: Request a random meme
    cy.request('https://meme-api.com/gimme').then((response) => {
      // Assert that the status code is 200
      expect(response.status).to.eq(200);

      // Assert that the response body has a valid URL (image link)
      expect(response.body).to.have.property('url').and.to.include('https://');

      // Step 2: Create a simple HTML to display the meme
      const memeImageUrl = response.body.url;
      const html = `
        <html>
          <body>
            <h1>Random Meme</h1>
            <img src="${memeImageUrl}" alt="Random Meme" style="max-width: 100%; height: auto;">
          </body>
        </html>
      `;

      // Step 3: Load the HTML in Cypress
      cy.document().invoke('write', html);
    });
  });
});
