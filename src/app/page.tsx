import type { Metadata } from "next";
import OnboardingGate from "@/components/OnboardingGate";

export const metadata: Metadata = {
  title: "The Inference — AI Is Changing Every Industry. We Help You Keep Up.",
};

export default function HomePage() {
  return <OnboardingGate />;
}
