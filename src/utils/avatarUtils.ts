const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500'
];

export function getAvatarColor(username: string): string {
  const index = username.toLowerCase().charCodeAt(0) % COLORS.length;
  return COLORS[index];
}

export function getInitials(username: string): string {
  return username.charAt(0).toUpperCase();
} 