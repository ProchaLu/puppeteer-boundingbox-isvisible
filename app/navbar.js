'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  return (
    <nav>
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        TOGGLE ABOUT LINK
      </button>
      <div>
        <Link data-test-id="link-page" href="/">
          Page
        </Link>{' '}
        <Link
          style={{
            visibility: toggle ? 'visible' : 'hidden',
          }}
          data-test-id="link-about"
          href="/about"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
