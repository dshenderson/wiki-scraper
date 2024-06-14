export default function Home() {
  return (
    <main>
      <h1>Wikipedia Bankruptcy/Fraud Scraper</h1>

      <p>This app allows you to scrape a Wikipedia page for information on bankruptcy and fraud.</p>

      <form method="post" action='api/submit'>
        <div className="input-wrapper">
          <label htmlFor="url">Enter the URL for a Wikipedia page</label>
          <input type="text" id="url" name="url" required pattern='.*wikipedia.org.*' />
        </div>
        <button type="submit">Retrieve data</button>
      </form>
    </main>
  );
}
