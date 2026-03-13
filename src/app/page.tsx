export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Redirecting to Chinese site...</p>
        <p>
          <a className="underline" href="/zh">
            Continue to /zh
          </a>
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/zh');",
        }}
      />
    </main>
  );
}
