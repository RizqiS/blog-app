import { Suspense } from "react";

export default function EventsBlog() {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <section>
        <h2 className="text-center">So on</h2>
      </section>
    </Suspense>
  );
}
