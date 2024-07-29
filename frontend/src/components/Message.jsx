/* eslint-disable react/prop-types */
const variantClasses = {
  info: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
};

export default function Message({ variant = "info", children }) {
  const classes = variantClasses[variant] || variantClasses.info;
  return (
    <div className={`p-4 mb-4 rounded ${classes}`} role="alert">
      {children}
    </div>
  );
}
