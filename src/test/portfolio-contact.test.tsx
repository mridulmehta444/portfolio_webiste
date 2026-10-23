import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
vi.mock("@/lib/portfolio", () => ({
  portfolio: { email: "mehtamridul444@gmail.com", phone: "+91 7888428209", contactEndpoint: null },
}));
import { portfolio } from "@/lib/portfolio";
import { Contact } from "@/components/portfolio/contact";
afterEach(() => {
  cleanup();
  portfolio.contactEndpoint = null;
  vi.unstubAllGlobals();
});
describe("Portfolio contact", () => {
  it("always shows the Send a Message form", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: "Send a Message" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });
  it("validates before sending", async () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
  });
  it("falls back to a pre-filled email when no endpoint is configured", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Portfolio test" } });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Opportunity" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to discuss a project." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Opening your email app"),
    );
  });
  it("reports receipt only after a confirmed response", async () => {
    portfolio.contactEndpoint = "/configured-contact";
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetcher);
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Portfolio test" } });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Opportunity" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to discuss a project." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Your message has been received."),
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
describe("EmailJS delivery", () => {
  it("sends via EmailJS and confirms only after an OK response", async () => {
    (portfolio as any).emailjs = { serviceId: "s", templateId: "t", publicKey: "k" };
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetcher);
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hi" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("has been sent"));
    expect(fetcher.mock.calls[0]?.[0]).toBe("https://api.emailjs.com/api/v1.0/email/send");
    (portfolio as any).emailjs = null;
  });
});
