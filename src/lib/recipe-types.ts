export type Ingredient = { quantity?: string; item: string };
export type Recipe = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  ingredients: Ingredient[];
  instructions: string[];
  servings: string | null;
  prep_time: string | null;
  cook_time: string | null;
  image_url: string | null;
  source_url: string | null;
  tags: string[] | null;
  cuisine: string | null;
  meal_type: string | null;
  notes: string | null;
  visibility: "public" | "private";
  created_at: string;
  updated_at: string;
};

export const CUISINE_OPTIONS = [
  "American","Italian","Mexican","Chinese","Japanese","Indian","Thai","French","Mediterranean","Greek","Spanish","Korean","Vietnamese","Middle Eastern","Caribbean","African","Other",
] as const;

export const MEAL_TYPE_OPTIONS = [
  "Breakfast","Main Course","Appetizer","Snack","Dessert","Drink","Side","Salad","Soup",
] as const;

export type ParsedRecipe = {
  title: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: string[];
  servings?: string;
  prep_time?: string;
  cook_time?: string;
  image_url?: string;
  tags?: string[];
};
