export function GroupIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 104 104"
    >
      <defs>
        <rect id="path-1" width="90" height="72" x="0" y="0" rx="10" />
        <filter
          id="filter-2"
          width="152.2%"
          height="165.3%"
          x="-26.1%"
          y="-27.1%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology
            in="SourceAlpha"
            radius="0.25"
            result="shadowSpreadOuter1"
          />
          <feOffset
            dy="1"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="1"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feMorphology
            in="SourceAlpha"
            radius="1"
            result="shadowSpreadOuter2"
          />
          <feOffset
            dy="2"
            in="shadowSpreadOuter2"
            result="shadowOffsetOuter2"
          />
          <feGaussianBlur
            in="shadowOffsetOuter2"
            result="shadowBlurOuter2"
            stdDeviation="4"
          />
          <feColorMatrix
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
            values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"
          />
          <feMorphology
            in="SourceAlpha"
            radius="2"
            result="shadowSpreadOuter3"
          />
          <feOffset
            dy="4"
            in="shadowSpreadOuter3"
            result="shadowOffsetOuter3"
          />
          <feGaussianBlur
            in="shadowOffsetOuter3"
            result="shadowBlurOuter3"
            stdDeviation="8"
          />
          <feColorMatrix
            in="shadowBlurOuter3"
            result="shadowMatrixOuter3"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="shadowMatrixOuter2" />
            <feMergeNode in="shadowMatrixOuter3" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <use fill="#000" filter="url(#filter-2)" xlinkHref="#path-1" />
          <use fill="#F0F2F5" xlinkHref="#path-1" />
        </g>
        <path fill="#FFF" d="M25 15h65v47c0 5.523-4.477 10-10 10H25V15z" />
        <path stroke="#E6EAF0" strokeLinecap="square" d="M0.5 15.5L90.5 15.5" />
        <rect width="14" height="3" x="4" y="26" fill="#D7DDE6" rx="1.5" />
        <rect width="9" height="3" x="4" y="32" fill="#D7DDE6" rx="1.5" />
        <rect width="9" height="3" x="4" y="42" fill="#E6EAF0" rx="1.5" />
        <rect width="9" height="3" x="4" y="21" fill="#E6EAF0" rx="1.5" />
        <rect width="9" height="3" x="4" y="53" fill="#D7DDE6" rx="1.5" />
        <rect width="14" height="3" x="4" y="47" fill="#D7DDE6" rx="1.5" />
        <path
          stroke="#E6EAF0"
          strokeLinecap="square"
          d="M25.5 15.5L25.5 72.5"
        />
      </g>
    </svg>
  );
}
