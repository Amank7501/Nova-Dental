import {
  AlignCenter,
  Anchor,
  BadgeIndianRupee,
  Baby,
  GraduationCap,
  HeartPulse,
  Palette,
  Scissors,
  Shield,
  Siren,
  Sparkles,
  Stethoscope,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  AlignCenter,
  Anchor,
  BadgeIndianRupee,
  Baby,
  GraduationCap,
  HeartPulse,
  Palette,
  Scissors,
  Shield,
  Siren,
  Sparkles,
  Stethoscope,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Stethoscope;
}
