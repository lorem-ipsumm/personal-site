"use client";

import Header from "../components/Header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show a success state
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight">CONTACT</h1>

          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind, want to collaborate, or simply wish to connect?
              I'd love to hear from you. Send me a message and I'll get back to you
              as soon as possible.
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-lg border border-border/40 bg-muted/20 p-6">
              <h3 className="mb-2 font-semibold">Thank you for reaching out!</h3>
              <p className="text-muted-foreground text-sm">
                Your message has been sent successfully. I'll get back to you within
                24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-border/40 bg-background focus:border-foreground/20"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-border/40 bg-background focus:border-foreground/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border-border/40 bg-background focus:border-foreground/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="flex w-full rounded-md border border-border/40 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Send Message →
              </Button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-border/40">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              OTHER WAYS TO CONNECT
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Email:</span> hello@yoursite.com
              </p>
              <p>
                <span className="font-medium">Response Time:</span> Within 24-48 hours
              </p>
              <p>
                <span className="font-medium">Best For:</span> Project inquiries,
                collaborations, speaking opportunities
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
