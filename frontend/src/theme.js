export const themes = {
  user: {
    bg: "bg-gray-950",
    card: "bg-gray-800/80 border border-gray-700",
    accent: "text-cyan-400",
    button: "bg-gradient-to-r from-cyan-500 to-blue-600",
    ring: "focus:ring-4 focus:ring-cyan-500/60",
  },
  admin: {
    bg: "bg-gray-950",
    card: "bg-gray-800/80 border border-gray-700",
    accent: "text-purple-400",
    button: "bg-gradient-to-r from-indigo-500 to-purple-600",
    ring: "focus:ring-4 focus:ring-purple-500/60",
  },
};

export function getThemeByRole(role) {
  return role === "admin" ? themes.admin : themes.user;
}






