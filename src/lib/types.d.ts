export interface Locals {
	user_id: string;
}

export interface Recipe {
	name: string;
	public: boolean;
	steps?: string[];
	tipo?: string;
	calories?: number;
	carbohydrates?: number;
	fat?: number;
	protein?: number;
	servings?: string;
	mealType?: string;
	ingredients?: Ingredient[];
	time?: string;
}

export interface Ingredient {
	name: string;
	tipo?: string;
	amount: string;
}

// interface RecipeIds {
// 	ids: string[];
// }

// type MyHeaders = Record<string, string[]>;
