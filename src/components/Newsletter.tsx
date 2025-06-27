"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="border-border/40 bg-muted/20 border-t py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-md">
          <h3 className="mb-2 text-lg font-semibold tracking-tight">
            NEWSLETTER
          </h3>

          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            Subscribe to receive thoughtful essays on design, philosophy, and
            digital culture.
          </p>

          {isSubscribed ? (
            <div className="text-muted-foreground text-sm">
              Thank you for subscribing! ✓
            </div>
          ) : (
            <div className="space-y-3">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className="border-border/40 bg-background focus:border-foreground/20 text-sm"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isLoading}
                  className="border-border/40 hover:bg-foreground hover:text-background text-sm font-medium tracking-wide disabled:opacity-50"
                >
                  {isLoading ? "..." : "SUBSCRIBE →"}
                </Button>
              </form>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
