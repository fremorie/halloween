type SpeakerIconProps = {
  isSoundMuted: boolean;
};

export function SpeakerIcon({ isSoundMuted }: SpeakerIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="relative size-6"
    >
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      {isSoundMuted ? (
        <path d="M16.5 9.5l5 5m0-5l-5 5" />
      ) : (
        <>
          <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
          <path d="M18.5 7a7 7 0 0 1 0 10" />
        </>
      )}
    </svg>
  );
}
