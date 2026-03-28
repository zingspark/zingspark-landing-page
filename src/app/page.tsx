export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/en');",
        }}
      />
    </>
  );
}
