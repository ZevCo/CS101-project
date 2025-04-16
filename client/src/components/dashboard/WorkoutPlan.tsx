import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Workout, Exercise, WorkoutExercise } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import TimerModal from "@/components/timer/TimerModal";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WorkoutPlan() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [activeWorkoutLogId, setActiveWorkoutLogId] = useState<number | null>(null);
  
  // Get today's workout for the user
  const { data: workout, isLoading: isLoadingWorkout } = useQuery({
    queryKey: ['/api/workouts/today', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/workouts/today?userId=${user?.id}`);
      return response.json();
    }
  });

  // Get the exercises for the workout
  const { data: exercises, isLoading: isLoadingExercises } = useQuery({
    queryKey: ['/api/workouts/exercises', workout?.id],
    enabled: !!workout?.id,
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/workouts/${workout?.id}/exercises`);
      return response.json();
    }
  });

  // Mutation for starting a workout
  const startWorkoutMutation = useMutation({
    mutationFn: async (workoutId: number) => {
      const response = await apiRequest('POST', '/api/workout-logs', {
        userId: user?.id,
        workoutId,
        date: new Date().toISOString().split('T')[0],
        duration: 0,
        completed: false
      });
      return response.json();
    },
    onSuccess: (data) => {
      setActiveWorkoutLogId(data.id);
      toast({
        title: "Workout Started",
        description: "Your workout has been started. Go crush it!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start workout. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Mutation for completing a workout
  const completeWorkoutMutation = useMutation({
    mutationFn: async ({ workoutLogId, duration, caloriesBurned }: { 
      workoutLogId: number; 
      duration: number; 
      caloriesBurned: number;
    }) => {
      const response = await apiRequest('PATCH', `/api/workout-logs/${workoutLogId}/complete`, {
        duration,
        caloriesBurned
      });
      return response.json();
    },
    onSuccess: () => {
      setActiveWorkoutLogId(null);
      toast({
        title: "Workout Completed",
        description: "Great job! Your workout has been logged.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/workout-logs'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to complete workout. Please try again.",
        variant: "destructive",
      });
    }
  });

  const isLoading = isLoadingWorkout || isLoadingExercises;

  // Open the timer modal
  const openTimerModal = () => {
    setIsTimerModalOpen(true);
  };

  // Start workout handler
  const handleStartWorkout = () => {
    if (workout) {
      startWorkoutMutation.mutate(workout.id);
      setIsTimerModalOpen(true);
    }
  };

  // Handle workout completion
  const handleCompleteWorkout = (duration: number, caloriesBurned: number) => {
    if (activeWorkoutLogId) {
      completeWorkoutMutation.mutate({
        workoutLogId: activeWorkoutLogId,
        duration,
        caloriesBurned
      });
    }
    setIsTimerModalOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">TODAY'S WORKOUT</h4>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  // If no workout is available
  if (!workout) {
    return (
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">TODAY'S WORKOUT</h4>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-3">No workout scheduled for today.</p>
            <Button asChild>
              <a href="/workouts">Find a Workout</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-4">TODAY'S WORKOUT</h4>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{workout.name}</CardTitle>
              <CardDescription>{workout.description}</CardDescription>
            </div>
            <Badge variant="secondary">{workout.duration} mins</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {exercises && exercises.map((item: WorkoutExercise) => (
              <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                <div className="mr-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600">
                  <i className={`fas ${item.exercise.muscleGroup === 'cardio' ? 'fa-running' : 'fa-dumbbell'}`}></i>
                </div>
                <div>
                  <h6 className="text-sm font-medium">{item.exercise.name}</h6>
                  <p className="text-xs text-gray-500">{item.sets} sets × {item.reps} reps</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleStartWorkout}
              disabled={!!activeWorkoutLogId}
              className="flex-1"
            >
              {activeWorkoutLogId ? "Workout in Progress" : "Start Workout"}
            </Button>
            <Button 
              onClick={openTimerModal}
              variant="outline"
            >
              <i className="fas fa-clock mr-1"></i> Set Timer
            </Button>
          </div>
        </CardContent>
      </Card>

      <TimerModal 
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        onComplete={handleCompleteWorkout}
        workoutName={workout.name}
      />
    </div>
  );
}
