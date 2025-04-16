import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Food, MealPlan } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Meal {
  id: number;
  type: string;
  foodId: number;
  quantity: number;
  time: string;
}

export default function MealPlan() {
  const { user } = useAuth();
  
  const { data: mealPlan, isLoading: isLoadingMealPlan } = useQuery({
    queryKey: ['/api/meal-plans', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const response = await fetch(`/api/meal-plans/${user.id}/today`);
      if (!response.ok) return null;
      const data = await response.json() as MealPlan;
      return {
        ...data,
        meals: data.meals as unknown as Meal[]
      };
    },
    enabled: !!user
  });

  const { data: foods = [], isLoading: isLoadingFoods } = useQuery({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const response = await fetch('/api/foods');
      if (!response.ok) return [];
      return response.json() as Promise<Food[]>;
    },
    enabled: !!mealPlan
  });

  const isLoadingCombined = isLoadingMealPlan || isLoadingFoods;

  const getFoodById = (id: number): Food | undefined => {
    return foods?.find((food: Food) => food.id === id);
  };

  // Map meal type to icon and color
  const getMealTypeStyles = (type: string) => {
    switch (type) {
      case 'breakfast':
        return { icon: 'fa-coffee', bgClass: 'bg-blue-100', textClass: 'text-secondary' };
      case 'lunch':
        return { icon: 'fa-utensils', bgClass: 'bg-orange-100', textClass: 'text-orange-500' };
      case 'dinner':
        return { icon: 'fa-moon', bgClass: 'bg-purple-100', textClass: 'text-purple-500' };
      case 'snack':
        return { icon: 'fa-apple-alt', bgClass: 'bg-green-100', textClass: 'text-success' };
      default:
        return { icon: 'fa-utensils', bgClass: 'bg-gray-100', textClass: 'text-gray-500' };
    }
  };

  if (isLoadingCombined) {
    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-4">MEAL PLAN</h4>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full mb-2 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!mealPlan || !foods) {
    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-4">MEAL PLAN</h4>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No meal plan available for today.</p>
          <button className="mt-2 text-sm text-primary font-medium">
            Create Meal Plan
          </button>
        </div>
      </div>
    );
  }

  // Group meals by type
  const mealsByType = mealPlan.meals.reduce((acc, meal) => {
    if (!acc[meal.type]) {
      acc[meal.type] = [];
    }
    acc[meal.type].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(mealsByType).map(([type, meals]) => (
            <div key={type} className="space-y-2">
              <h3 className="font-semibold capitalize">{type}</h3>
              <ul className="list-disc pl-4">
                {meals.map((meal) => {
                  const food = foods.find(f => f.id === meal.foodId);
                  return (
                    <li key={meal.id}>
                      <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg mb-2 transition">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium">{food?.name || 'Unknown Food'}</h5>
                          <p className="text-xs text-gray-500">
                            {meal.quantity} serving(s) - {food ? `${food.calories} calories, ${food.protein}g protein` : ''}
                          </p>
                          <p className="text-xs text-gray-500">Time: {meal.time}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
