import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { Food, MealPlan } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const queryClient = new QueryClient();

export default function DietPlanner() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [goal, setGoal] = useState<string>("weight_loss");
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [calorieTarget, setCalorieTarget] = useState<number>(2000);
  const [selectedMeals, setSelectedMeals] = useState<{ [key: string]: Food[] }>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  
  const { data: foods, isLoading } = useQuery<Food[]>({
    queryKey: ['/api/foods'],
    enabled: !!user,
  });

  const generateMealPlanMutation = useMutation({
    mutationFn: async (data: { userId: number; meals: any[] }) => {
      const response = await apiRequest('POST', '/api/meal-plans', {
        userId: data.userId,
        date: new Date().toISOString().split('T')[0],
        meals: data.meals.map(meal => ({
          foodId: meal.foodId,
          time: meal.time,
          type: meal.type,
          quantity: meal.quantity
        }))
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate the meal plan query to refresh the dashboard
      queryClient.invalidateQueries({ queryKey: ['/api/meal-plans', user?.id] });
      toast({
        title: "Success",
        description: "Meal plan generated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleRestrictionToggle = (restriction: string) => {
    setRestrictions(prev => 
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const getFoodsByCategory = (category: string): Food[] => {
    if (!foods) return [];
    return foods.filter(food => food.category === category);
  };

  const handleAddMeal = (mealType: string, food: Food) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: [...prev[mealType], food]
    }));
  };

  const handleRemoveMeal = (mealType: string, foodId: number) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }));
  };

  const handleGenerateMealPlan = () => {
    if (!user) return;

    // Format meals for the API
    const formattedMeals = Object.entries(selectedMeals).map(([type, foods]) => 
      foods.map(food => ({
        foodId: food.id,
        time: getMealTime(type),
        type,
        quantity: 1,
        food: food // Include the full food object for display
      }))
    ).flat();

    generateMealPlanMutation.mutate({
      userId: user.id,
      meals: formattedMeals
    });
  };

  const getMealTime = (type: string): string => {
    switch (type) {
      case 'breakfast': return '8:00 AM';
      case 'lunch': return '1:00 PM';
      case 'dinner': return '7:00 PM';
      case 'snacks': return '3:00 PM';
      default: return '12:00 PM';
    }
  };

  return (
    <MainLayout title="Diet Planner">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Diet Preferences</CardTitle>
              <CardDescription>Customize your meal plan based on your goals and dietary needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select defaultValue={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Dietary Restrictions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto"].map(restriction => (
                    <Button
                      key={restriction}
                      variant={restrictions.includes(restriction) ? "default" : "outline"}
                      onClick={() => handleRestrictionToggle(restriction)}
                      className="justify-start"
                    >
                      <span className={restrictions.includes(restriction) ? "text-white" : ""}>{restriction}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="calories">Daily Calorie Target</Label>
                  <span className="text-sm font-medium">{calorieTarget} kcal</span>
                </div>
                <Slider
                  id="calories"
                  min={1200}
                  max={3500}
                  step={50}
                  value={[calorieTarget]}
                  onValueChange={(values) => setCalorieTarget(values[0])}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerateMealPlan}
                disabled={generateMealPlanMutation.isPending}
              >
                {generateMealPlanMutation.isPending ? "Generating..." : "Generate Meal Plan"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Meals</CardTitle>
              <CardDescription>Based on your preferences and nutritional needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="breakfast">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                </TabsList>
                
                {["breakfast", "lunch", "dinner", "snacks"].map(mealType => (
                  <TabsContent key={mealType} value={mealType} className="space-y-4">
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getFoodsByCategory(mealType).length > 0 ? (
                          getFoodsByCategory(mealType).map((food: Food) => (
                            <div key={food.id} className="flex items-center p-3 bg-white border rounded-lg hover:border-primary transition">
                              <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-4">
                                <i className="fas fa-utensils text-primary"></i>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{food.name}</h4>
                                <p className="text-xs text-gray-500">
                                  {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleAddMeal(mealType, food)}
                              >
                                <i className="fas fa-plus mr-1"></i> Add
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No {mealType} options available.</p>
                            <Button variant="link" className="mt-2">
                              Add custom meal
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Selected meals for this type */}
                    {selectedMeals[mealType].length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Selected {mealType} meals:</h5>
                        {selectedMeals[mealType].map(food => (
                          <div key={food.id} className="flex items-center p-2 bg-gray-50 rounded-lg mb-2">
                            <span className="flex-1">{food.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveMeal(mealType, food.id)}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
