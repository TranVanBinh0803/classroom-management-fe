
export interface NavElement {
  label: string;
  link?: string;
  icon?: React.ElementType;
  children?: NavElement[];
}