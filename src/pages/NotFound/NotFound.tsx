import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Set document title for SEO and accessibility
    document.title = "404 - Page Not Found";
    
    // Clean up title on unmount
    return () => {
      document.title = "Quorium Consulting"; // Replace with your actual app name
    };
  }, [location.pathname]);

  return (
    <main 
      className="min-h-screen bg-white flex items-center justify-center p-4"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <article className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl border border-gray-100 max-w-lg w-full">
        {/* Screen reader announcement */}
        <div className="sr-only">Error 404: Page not found</div>
        
        {/* Animated 404 illustration */}
        <div className="mb-8">
          <div className="relative">
            <div 
              className="text-9xl md:text-[12rem] font-black leading-none mb-4 select-none"
              style={{ 
                color: '#EFF0F2',
                textShadow: '2px 2px 0px #484848'
              }}
            >
              404
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-300 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gray-400 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
        
        <header className="mb-6">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: '#212121' }}
          >
            Oops! Page Not Found
          </h1>
          <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
        </header>
        
        <section className="mb-8">
          <p 
            className="text-lg leading-relaxed mb-4"
            style={{ color: '#484848' }}
          >
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered an incorrect URL.
          </p>
          <div 
            className="bg-gray-50 rounded-lg p-3 text-sm"
            style={{ color: '#484848' }}
          >
            <span className="font-medium">Attempted URL:</span>{' '}
            <code 
              className="bg-gray-200 px-2 py-1 rounded text-xs font-mono"
              style={{ color: '#212121' }}
            >
              {location.pathname}
            </code>
          </div>
        </section>
        
        <nav aria-label="Error page navigation" className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
            style={{ 
              backgroundColor: '#212121',
              focusRingColor: '#484848'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#484848'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#212121'}
            aria-label="Go back to homepage"
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Home
          </Link>
          
          <div>
            <button 
              onClick={() => window.history.back()} 
              className="text-base font-medium transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-3 py-2"
              style={{ 
                color: '#484848',
                focusRingColor: '#484848'
              }}
              onMouseEnter={(e) => e.target.style.color = '#212121'}
              onMouseLeave={(e) => e.target.style.color = '#484848'}
              aria-label="Go back to previous page"
            >
              ← Go back to previous page
            </button>
          </div>
        </nav>

        {/* Additional helpful links */}
        <footer className="mt-8 pt-6 border-t border-gray-100">
          <p 
            className="text-sm mb-3 font-medium"
            style={{ color: '#484848' }}
          >
            Need help? Try these:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              to="/contact" 
              className="hover:underline transition-colors duration-200"
              style={{ color: '#484848' }}
              onMouseEnter={(e) => e.target.style.color = '#212121'}
              onMouseLeave={(e) => e.target.style.color = '#484848'}
            >
              Contact Us
            </Link>
            <span style={{ color: '#EFF0F2' }}>|</span>
            <Link 
              to="/sitemap" 
              className="hover:underline transition-colors duration-200"
              style={{ color: '#484848' }}
              onMouseEnter={(e) => e.target.style.color = '#212121'}
              onMouseLeave={(e) => e.target.style.color = '#484848'}
            >
              Site Map
            </Link>
            <span style={{ color: '#EFF0F2' }}>|</span>
            <Link 
              to="/help" 
              className="hover:underline transition-colors duration-200"
              style={{ color: '#484848' }}
              onMouseEnter={(e) => e.target.style.color = '#212121'}
              onMouseLeave={(e) => e.target.style.color = '#484848'}
            >
              Help Center
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
};

export default NotFound;