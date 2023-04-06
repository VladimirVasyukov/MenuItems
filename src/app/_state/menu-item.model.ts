export interface menuItem {
  id: string;
  description: string;
  image: string;
  name: string;
  favorite: boolean;
}

export type MenuItemForm = Omit<menuItem, 'id' | 'favorite'>;
