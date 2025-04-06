import * as React from "react";
export const Note = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#515655"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.52 6.244a.92.92 0 0 0-.922-.921H4.402a.92.92 0 0 0-.92.921v11.512a.92.92 0 0 0 .92.921h15.196a.922.922 0 0 0 .921-.921V6.244Z"
    />
    <path
      stroke="#515655"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.03 5.323-.29-1.088a.92.92 0 0 0-1.129-.651l-6.49 1.739M20.52 16.63l.548-.147a.921.921 0 0 0 .652-1.128l-1.2-4.476M4.97 18.677l.291 1.088a.92.92 0 0 0 1.128.651l6.49-1.739M3.481 7.37l-.548.147a.92.92 0 0 0-.651 1.128l1.207 4.504m2.985-5.063h11.052m-11.052 2.61h11.052M6.474 13.304h11.052M6.474 15.914H12"
    />
  </svg>
);
