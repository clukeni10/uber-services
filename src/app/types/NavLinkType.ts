export interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface NavItemProps {
  link: NavLink;
  collapsed: boolean;
  isActive: boolean;
}