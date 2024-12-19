import React, { useEffect, useState } from 'react';
import { getQuotes } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './QuoteListPage.css';

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Define limit constant
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more data

    setLoading(true);
    try {
      const response = await getQuotes(limit, offset); // Fetch with limit and offset
      const fetchedQuotes = response.data;

      setQuotes((prevQuotes) => [...prevQuotes, ...fetchedQuotes]);
      setHasMore(fetchedQuotes.length === limit); // If less than limit, no more data
      setOffset((prevOffset) => prevOffset + limit); // Update offset for next batch
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(); // Fetch initial quotes on component mount
  }, []);

  const handleCreateQuote = () => {
    navigate('/create-quote'); // Redirect to quote creation page
  };

  return (
    <div className="quote-list-page">
      <h2>Quotes</h2>
      <div className="quote-container">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            {quote.mediaUrl && <img src={quote.mediaUrl} alt="quote visual" />}
            <div className="quote-text">{quote.text}</div>
            <div className="quote-info">
              <span>{quote.username}</span> | <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button onClick={fetchQuotes} className="btn btn-secondary load-more-btn">
          Load More
        </button>
      )}

      <div className="floating-action-btn" onClick={handleCreateQuote}>
        <span>+</span>
      </div>
    </div>
  );
};

export default QuoteListPage;

