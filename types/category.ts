export interface Category {
  id: string;

  user_id: string;

  name: string;

  category_type: string;

  color: string | null;

  icon: string | null;

  sort_order: number;

  is_archived: boolean;

  created_at: string;
}