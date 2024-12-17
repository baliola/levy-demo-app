export interface INavigationItem {
  name: string;
  href: string;
  blank: boolean;
  current: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hidden?: boolean
  permission?: string
}