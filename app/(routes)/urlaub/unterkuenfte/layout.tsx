import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unterkünfte auf Amrum | Kniep Haus auf Amrum",
  description: "Finden Sie die perfekte Unterkunft für Ihren Aufenthalt auf Amrum - Hotels, Ferienhäuser, Ferienwohnungen und Pensionen.",
};

export default function UnterkuenfteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 