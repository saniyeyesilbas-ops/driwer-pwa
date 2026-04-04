interface AlertBannerProps {
  message: string;
  type?: "error" | "warning" | "info";
}

export default function AlertBanner({ message, type = "error" }: AlertBannerProps) {
  const bgColors = {
    error: "bg-danger-50 border-danger-200 text-danger-700",
    warning: "bg-warning-50 border-warning-200 text-warning-700",
    info: "bg-primary-50 border-primary-200 text-primary-700",
  };

  return (
    <div className={`rounded-lg border p-3 ${bgColors[type]}`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
