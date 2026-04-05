import { AlertTriangle } from "lucide-react";

interface AlertBannerProps {
  message: string;
  type?: "error" | "warning" | "info";
}

export default function AlertBanner({ message, type = "error" }: AlertBannerProps) {
  const styles = {
    error: "bg-white border-danger-200 text-danger-700",
    warning: "bg-white border-warning-200 text-warning-700",
    info: "bg-white border-primary-200 text-primary-700",
  };

  const iconColors = {
    error: "text-danger-500",
    warning: "text-warning-500",
    info: "text-primary-500",
  };

  return (
    <div className={`rounded-xl border p-4 shadow-sm flex items-start gap-3 ${styles[type]}`}>
      <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[type]}`} />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
