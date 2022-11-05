import React from 'react';
import Link from 'next/link';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="container">
        <p className="error-code">404: Page Not Found</p>
        <p className="error-text">This page could not be found.<br/>The page has been deleted or you've entered a URL that doesn't exist on this site.</p>
        <Link href="../"><a className="back-link">&#x003C; Return to main page</a></Link>
      </div>
    </div>
  );
}