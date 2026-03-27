export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">Redirecting...</p>
        <p>
          <a className="underline" href="/en">
            Continue to /en
          </a>
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/en');",
        }}
      />
    </main>
  );
}
