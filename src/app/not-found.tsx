"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-8">
            <h1 className="mb-4 text-6xl font-bold tracking-tight">404</h1>
            <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a
              different location.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
