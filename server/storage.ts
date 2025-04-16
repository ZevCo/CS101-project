import {
  User, InsertUser, users,
  Workout, InsertWorkout, workouts,
  Exercise, InsertExercise, exercises,
  WorkoutExercise, InsertWorkoutExercise, workoutExercises,
  Food, InsertFood, foods,
  MealPlan, InsertMealPlan, mealPlans,
  WorkoutLog, InsertWorkoutLog, workoutLogs,
  ProgressData, InsertProgressData, progressData,
  Message, InsertMessage, messages,
  ClassSchedule, InsertClassSchedule, classSchedules,
  ClassEnrollment, InsertClassEnrollment, classEnrollments
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Workout methods
  getAllWorkouts(): Promise<Workout[]>;
  getWorkout(id: number): Promise<Workout | undefined>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  recommendWorkouts(equipment: string[], muscleGroups: string[]): Promise<Workout[]>;

  // Exercise methods
  getAllExercises(): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]>;

  // Workout Exercises methods
  getWorkoutExercises(workoutId: number): Promise<(WorkoutExercise & { exercise: Exercise })[]>;
  addExerciseToWorkout(workoutExercise: InsertWorkoutExercise): Promise<WorkoutExercise>;

  // Food methods
  getAllFoods(): Promise<Food[]>;
  getFood(id: number): Promise<Food | undefined>;
  createFood(food: InsertFood): Promise<Food>;
  getFoodsByCategory(category: string): Promise<Food[]>;

  // Meal Plan methods
  getMealPlan(userId: number, date: Date): Promise<MealPlan | undefined>;
  createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan>;
  updateMealPlan(id: number, mealPlan: Partial<MealPlan>): Promise<MealPlan | undefined>;

  // Workout Log methods
  getUserWorkoutLogs(userId: number): Promise<(WorkoutLog & { workout: Workout })[]>;
  createWorkoutLog(workoutLog: InsertWorkoutLog): Promise<WorkoutLog>;
  getWorkoutLogsInDateRange(userId: number, startDate: Date, endDate: Date): Promise<WorkoutLog[]>;
  updateWorkoutLog(id: number, workoutLogData: Partial<WorkoutLog>): Promise<WorkoutLog | undefined>;

  // Progress methods
  getUserProgressData(userId: number): Promise<ProgressData[]>;
  createProgressData(progressData: InsertProgressData): Promise<ProgressData>;
  getProgressInDateRange(userId: number, startDate: Date, endDate: Date): Promise<ProgressData[]>;

  // Message methods
  getUserMessages(userId: number): Promise<(Message & { sender: User })[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(messageId: number): Promise<Message | undefined>;

  // Class Schedule methods
  getAllClassSchedules(): Promise<(ClassSchedule & { trainer: User })[]>;
  getClassSchedule(id: number): Promise<ClassSchedule | undefined>;
  createClassSchedule(classSchedule: InsertClassSchedule): Promise<ClassSchedule>;
  getTrainerClassSchedules(trainerId: number): Promise<ClassSchedule[]>;

  // Class Enrollment methods
  enrollInClass(enrollment: InsertClassEnrollment): Promise<ClassEnrollment>;
  getUserEnrollments(userId: number): Promise<(ClassEnrollment & { class: ClassSchedule })[]>;
  getLeaderboard(): Promise<{ user: User; points: number }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workouts: Map<number, Workout>;
  private exercises: Map<number, Exercise>;
  private workoutExercises: Map<number, WorkoutExercise>;
  private foods: Map<number, Food>;
  private mealPlans: Map<number, MealPlan>;
  private workoutLogs: Map<number, WorkoutLog>;
  private progressData: Map<number, ProgressData>;
  private messages: Map<number, Message>;
  private classSchedules: Map<number, ClassSchedule>;
  private classEnrollments: Map<number, ClassEnrollment>;
  
  private currentIds: {
    users: number;
    workouts: number;
    exercises: number;
    workoutExercises: number;
    foods: number;
    mealPlans: number;
    workoutLogs: number;
    progressData: number;
    messages: number;
    classSchedules: number;
    classEnrollments: number;
  };

  constructor() {
    this.users = new Map();
    this.workouts = new Map();
    this.exercises = new Map();
    this.workoutExercises = new Map();
    this.foods = new Map();
    this.mealPlans = new Map();
    this.workoutLogs = new Map();
    this.progressData = new Map();
    this.messages = new Map();
    this.classSchedules = new Map();
    this.classEnrollments = new Map();
    
    this.currentIds = {
      users: 1,
      workouts: 1,
      exercises: 1,
      workoutExercises: 1,
      foods: 1,
      mealPlans: 1,
      workoutLogs: 1,
      progressData: 1,
      messages: 1,
      classSchedules: 1,
      classEnrollments: 1
    };

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add a sample user
    const user: User = {
      id: 1,
      username: "rahul_sharma",
      password: "password123", // In real app, this would be hashed
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@example.com",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 75,
      height: 175,
      age: 28,
      gender: "male",
      goal: "weight_loss",
      isTrainer: false,
      plan: "Premium"
    };
    this.users.set(1, user);
    this.currentIds.users = 2;

    // Add a trainer user
    const trainer: User = {
      id: 2,
      username: "priya_patel",
      password: "password123",
      firstName: "Priya",
      lastName: "Patel",
      email: "priya@example.com",
      profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 58,
      height: 165,
      age: 30,
      gender: "female",
      goal: "fitness",
      isTrainer: true,
      plan: "Trainer"
    };
    this.users.set(2, trainer);

    // Add another trainer
    const trainer2: User = {
      id: 3,
      username: "amit_kumar",
      password: "password123",
      firstName: "Amit",
      lastName: "Kumar",
      email: "amit@example.com",
      profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 72,
      height: 178,
      age: 35,
      gender: "male",
      goal: "fitness",
      isTrainer: true,
      plan: "Trainer"
    };
    this.users.set(3, trainer2);

    // Add more sample users for leaderboard
    const user2: User = {
      id: 4,
      username: "neha_gupta",
      password: "password123",
      firstName: "Neha",
      lastName: "Gupta",
      email: "neha@example.com",
      profileImage: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 62,
      height: 163,
      age: 27,
      gender: "female",
      goal: "weight_loss",
      isTrainer: false,
      plan: "Premium"
    };
    this.users.set(4, user2);

    const user3: User = {
      id: 5,
      username: "vikram_singh",
      password: "password123",
      firstName: "Vikram",
      lastName: "Singh",
      email: "vikram@example.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 80,
      height: 180,
      age: 32,
      gender: "male",
      goal: "muscle_gain",
      isTrainer: false,
      plan: "Premium"
    };
    this.users.set(5, user3);

    const user4: User = {
      id: 6,
      username: "ananya_desai",
      password: "password123",
      firstName: "Ananya",
      lastName: "Desai",
      email: "ananya@example.com",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      weight: 55,
      height: 160,
      age: 25,
      gender: "female",
      goal: "fitness",
      isTrainer: false,
      plan: "Basic"
    };
    this.users.set(6, user4);
    this.currentIds.users = 7;

    // Add sample exercises
    const exercises: Exercise[] = [
      {
        id: 1,
        name: "Barbell Squat",
        description: "A compound exercise that targets the quadriceps, hamstrings, and glutes",
        muscleGroup: "legs",
        equipmentRequired: "barbell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 2,
        name: "Barbell Bench Press",
        description: "A compound exercise that targets the chest, shoulders, and triceps",
        muscleGroup: "chest",
        equipmentRequired: "barbell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 3,
        name: "Barbell Deadlift",
        description: "A compound exercise that targets the posterior chain",
        muscleGroup: "back",
        equipmentRequired: "barbell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 4,
        name: "Barbell Overhead Press",
        description: "A compound exercise that targets the shoulders and triceps",
        muscleGroup: "shoulders",
        equipmentRequired: "barbell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 5,
        name: "Kettlebell Swing",
        description: "A dynamic exercise that targets the posterior chain and core",
        muscleGroup: "full_body",
        equipmentRequired: "kettlebell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 6,
        name: "Kettlebell Turkish Get-Up",
        description: "A complex movement that improves mobility and stability",
        muscleGroup: "full_body",
        equipmentRequired: "kettlebell",
        difficultyLevel: "advanced",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 7,
        name: "Kettlebell Clean and Press",
        description: "A compound movement that targets multiple muscle groups",
        muscleGroup: "full_body",
        equipmentRequired: "kettlebell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 8,
        name: "Dumbbell Shoulder Press",
        description: "An isolation exercise for the shoulders",
        muscleGroup: "shoulders",
        equipmentRequired: "dumbbell",
        difficultyLevel: "beginner",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 9,
        name: "Dumbbell Row",
        description: "A compound exercise that targets the back muscles",
        muscleGroup: "back",
        equipmentRequired: "dumbbell",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 10,
        name: "Dumbbell Lunges",
        description: "A compound exercise that targets the legs",
        muscleGroup: "legs",
        equipmentRequired: "dumbbell",
        difficultyLevel: "beginner",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 11,
        name: "Pull-up",
        description: "A bodyweight exercise that targets the back and arms",
        muscleGroup: "back",
        equipmentRequired: "pull-up bar",
        difficultyLevel: "intermediate",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 12,
        name: "Push-up",
        description: "A bodyweight exercise that targets the chest and arms",
        muscleGroup: "chest",
        equipmentRequired: "none",
        difficultyLevel: "beginner",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 13,
        name: "Bodyweight Squat",
        description: "A fundamental lower body exercise",
        muscleGroup: "legs",
        equipmentRequired: "none",
        difficultyLevel: "beginner",
        imageUrl: null,
        videoUrl: null
      },
      {
        id: 14,
        name: "Plank",
        description: "A core stability exercise",
        muscleGroup: "core",
        equipmentRequired: "none",
        difficultyLevel: "beginner",
        imageUrl: null,
        videoUrl: null
      }
    ];

    exercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });
    this.currentIds.exercises = exercises.length + 1;

    // Add sample workouts
    const workouts: Workout[] = [
      {
        id: 1,
        name: "Barbell Strength",
        description: "A full-body barbell workout focusing on compound movements",
        duration: 60,
        difficulty: "intermediate",
        equipmentRequired: ["barbell"],
        targetMuscleGroups: ["legs", "chest", "back", "shoulders"],
        imageUrl: null
      },
      {
        id: 2,
        name: "Kettlebell Power",
        description: "A dynamic kettlebell workout focusing on power and endurance",
        duration: 45,
        difficulty: "intermediate",
        equipmentRequired: ["kettlebell"],
        targetMuscleGroups: ["full_body", "core"],
        imageUrl: null
      },
      {
        id: 3,
        name: "Dumbbell Pump",
        description: "A dumbbell-focused workout for muscle growth",
        duration: 50,
        difficulty: "beginner",
        equipmentRequired: ["dumbbell"],
        targetMuscleGroups: ["chest", "back", "shoulders", "legs"],
        imageUrl: null
      },
      {
        id: 4,
        name: "Bodyweight Basics",
        description: "A no-equipment workout focusing on fundamental movements",
        duration: 30,
        difficulty: "beginner",
        equipmentRequired: ["none"],
        targetMuscleGroups: ["chest", "back", "legs", "core"],
        imageUrl: null
      },
      {
        id: 5,
        name: "Barbell Powerlifting",
        description: "A powerlifting-focused workout with the big three lifts",
        duration: 90,
        difficulty: "advanced",
        equipmentRequired: ["barbell"],
        targetMuscleGroups: ["legs", "chest", "back"],
        imageUrl: null
      },
      {
        id: 6,
        name: "Kettlebell Flow",
        description: "A fluid kettlebell workout focusing on movement patterns",
        duration: 40,
        difficulty: "intermediate",
        equipmentRequired: ["kettlebell"],
        targetMuscleGroups: ["full_body", "core"],
        imageUrl: null
      }
    ];

    workouts.forEach(workout => {
      this.workouts.set(workout.id, workout);
    });
    this.currentIds.workouts = workouts.length + 1;

    // Add workout exercises
    const workoutExercises: WorkoutExercise[] = [
      // Barbell Strength Workout
      {
        id: 1,
        workoutId: 1,
        exerciseId: 1,
        sets: 4,
        reps: 8,
        restTime: 90
      },
      {
        id: 2,
        workoutId: 1,
        exerciseId: 2,
        sets: 4,
        reps: 8,
        restTime: 90
      },
      {
        id: 3,
        workoutId: 1,
        exerciseId: 3,
        sets: 4,
        reps: 6,
        restTime: 120
      },
      {
        id: 4,
        workoutId: 1,
        exerciseId: 4,
        sets: 3,
        reps: 10,
        restTime: 60
      },
      // Kettlebell Power Workout
      {
        id: 5,
        workoutId: 2,
        exerciseId: 5,
        sets: 4,
        reps: 15,
        restTime: 60
      },
      {
        id: 6,
        workoutId: 2,
        exerciseId: 6,
        sets: 3,
        reps: 5,
        restTime: 90
      },
      {
        id: 7,
        workoutId: 2,
        exerciseId: 7,
        sets: 4,
        reps: 8,
        restTime: 60
      },
      // Dumbbell Pump Workout
      {
        id: 8,
        workoutId: 3,
        exerciseId: 8,
        sets: 4,
        reps: 10,
        restTime: 60
      },
      {
        id: 9,
        workoutId: 3,
        exerciseId: 9,
        sets: 4,
        reps: 12,
        restTime: 60
      },
      {
        id: 10,
        workoutId: 3,
        exerciseId: 10,
        sets: 3,
        reps: 12,
        restTime: 60
      },
      // Bodyweight Basics Workout
      {
        id: 11,
        workoutId: 4,
        exerciseId: 11,
        sets: 3,
        reps: 8,
        restTime: 60
      },
      {
        id: 12,
        workoutId: 4,
        exerciseId: 12,
        sets: 3,
        reps: 12,
        restTime: 60
      },
      {
        id: 13,
        workoutId: 4,
        exerciseId: 13,
        sets: 3,
        reps: 15,
        restTime: 60
      },
      {
        id: 14,
        workoutId: 4,
        exerciseId: 14,
        sets: 3,
        reps: 30,
        restTime: 60
      }
    ];

    workoutExercises.forEach(workoutExercise => {
      this.workoutExercises.set(workoutExercise.id, workoutExercise);
    });
    this.currentIds.workoutExercises = workoutExercises.length + 1;

    // Add sample foods
    const foods: Food[] = [
      {
        id: 1,
        name: "Masala Oats with Vegetables",
        calories: 250,
        protein: 10,
        carbs: 40,
        fat: 5,
        fiber: 6,
        category: "breakfast",
        imageUrl: ""
      },
      {
        id: 2,
        name: "Brown Rice with Dal and Mixed Vegetables",
        calories: 400,
        protein: 15,
        carbs: 70,
        fat: 4,
        fiber: 8,
        category: "lunch",
        imageUrl: ""
      },
      {
        id: 3,
        name: "Vegetable Curry with Chapati",
        calories: 450,
        protein: 12,
        carbs: 65,
        fat: 10,
        fiber: 7,
        category: "dinner",
        imageUrl: ""
      }
    ];

    foods.forEach(food => {
      this.foods.set(food.id, food);
    });
    this.currentIds.foods = 4;

    // Add sample meal plan
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    
    const mealPlan: MealPlan = {
      id: 1,
      userId: 1,
      date: formattedDate,
      meals: [
        { foodId: 1, time: "8:00 AM", type: "breakfast", quantity: 1 },
        { foodId: 2, time: "1:00 PM", type: "lunch", quantity: 1 },
        { foodId: 3, time: "8:00 PM", type: "dinner", quantity: 1 }
      ]
    };
    this.mealPlans.set(1, mealPlan);
    this.currentIds.mealPlans = 2;

    // Add sample workout logs for the current week
    const pastDates = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      pastDates.push(date.toISOString().split('T')[0]); // Convert to YYYY-MM-DD format
    }

    const workoutLogs: WorkoutLog[] = [
      {
        id: 1,
        userId: 1,
        workoutId: 1,
        date: pastDates[2],
        duration: 45,
        caloriesBurned: 320,
        completed: true
      },
      {
        id: 2,
        userId: 1,
        workoutId: 1,
        date: pastDates[4],
        duration: 50,
        caloriesBurned: 350,
        completed: true
      },
      {
        id: 3,
        userId: 1,
        workoutId: 1,
        date: pastDates[5],
        duration: 45,
        caloriesBurned: 320,
        completed: true
      },
      {
        id: 4,
        userId: 1,
        workoutId: 1,
        date: pastDates[7],
        duration: 48,
        caloriesBurned: 330,
        completed: true
      }
    ];

    workoutLogs.forEach(workoutLog => {
      this.workoutLogs.set(workoutLog.id, workoutLog);
    });
    this.currentIds.workoutLogs = 5;

    // Add sample progress data for the past month
    const progressEntries = [
      { date: new Date(2023, 3, 15), weight: 78 },
      { date: new Date(2023, 3, 22), weight: 77.5 },
      { date: new Date(2023, 3, 29), weight: 76.8 },
      { date: new Date(2023, 4, 6), weight: 76 },
      { date: new Date(2023, 4, 13), weight: 75.5 }
    ];

    progressEntries.forEach((entry, index) => {
      const progressEntry: ProgressData = {
        id: index + 1,
        userId: 1,
        date: entry.date.toISOString().split('T')[0],
        weight: entry.weight,
        bodyFat: null,
        notes: ""
      };
      this.progressData.set(progressEntry.id, progressEntry);
    });
    this.currentIds.progressData = progressEntries.length + 1;

    // Add sample messages
    const messages: Message[] = [
      {
        id: 1,
        senderId: 2, // Priya (trainer)
        receiverId: 1, // Rahul (user)
        message: "Great job on completing your leg workout yesterday! I've updated your plan for next week with progressive overload. Let me know if you have questions.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: 2,
        senderId: 3, // Amit (trainer)
        receiverId: 1, // Rahul (user)
        message: "Remember to increase your water intake during these hot months. I noticed your hydration tracking is lower than recommended.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false
      }
    ];

    messages.forEach(message => {
      this.messages.set(message.id, message);
    });
    this.currentIds.messages = 3;

    // Add sample class schedules
    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 1);
    futureDate1.setHours(9, 0, 0, 0);
    
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 1);
    futureDate2.setHours(10, 0, 0, 0);

    const classSchedules: ClassSchedule[] = [
      {
        id: 1,
        trainerId: 2,
        className: "Morning Yoga",
        description: "Start your day with energizing yoga flows",
        startTime: futureDate1,
        endTime: new Date(futureDate1.getTime() + 60 * 60 * 1000), // 1 hour later
        maxParticipants: 10,
        currentParticipants: 5
      },
      {
        id: 2,
        trainerId: 3,
        className: "HIIT Workout",
        description: "High intensity interval training for maximum calorie burn",
        startTime: futureDate2,
        endTime: new Date(futureDate2.getTime() + 45 * 60 * 1000), // 45 minutes later
        maxParticipants: 15,
        currentParticipants: 8
      }
    ];

    classSchedules.forEach(classSchedule => {
      this.classSchedules.set(classSchedule.id, classSchedule);
    });
    this.currentIds.classSchedules = 3;

    // Add sample class enrollments
    const enrollments: ClassEnrollment[] = [
      {
        id: 1,
        classId: 1,
        userId: 1,
        enrollmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ];

    enrollments.forEach(enrollment => {
      this.classEnrollments.set(enrollment.id, enrollment);
    });
    this.currentIds.classEnrollments = 2;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      firstName: insertUser.firstName,
      lastName: insertUser.lastName,
      email: insertUser.email,
      profileImage: insertUser.profileImage ?? null,
      weight: insertUser.weight ?? null,
      height: insertUser.height ?? null,
      age: insertUser.age ?? null,
      gender: insertUser.gender ?? null,
      goal: insertUser.goal ?? null,
      isTrainer: insertUser.isTrainer ?? null,
      plan: insertUser.plan ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Workout methods
  async getAllWorkouts(): Promise<Workout[]> {
    return Array.from(this.workouts.values());
  }

  async getWorkout(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = this.currentIds.workouts++;
    const workout: Workout = {
      id,
      name: insertWorkout.name,
      description: insertWorkout.description,
      duration: insertWorkout.duration,
      difficulty: insertWorkout.difficulty,
      imageUrl: insertWorkout.imageUrl ?? null,
      equipmentRequired: insertWorkout.equipmentRequired ?? null,
      targetMuscleGroups: insertWorkout.targetMuscleGroups ?? null
    };
    this.workouts.set(id, workout);
    return workout;
  }

  async recommendWorkouts(equipment: string[], muscleGroups: string[]): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(workout => {
      const hasRequiredEquipment = equipment.length === 0 || 
        (workout.equipmentRequired ?? []).some(eq => equipment.includes(eq));
      
      const targetsDesiredMuscles = muscleGroups.length === 0 || 
        (workout.targetMuscleGroups ?? []).some(mg => muscleGroups.includes(mg));
      
      return hasRequiredEquipment && targetsDesiredMuscles;
    });
  }

  // Exercise methods
  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.currentIds.exercises++;
    const exercise: Exercise = {
      id,
      name: insertExercise.name,
      description: insertExercise.description,
      muscleGroup: insertExercise.muscleGroup,
      difficultyLevel: insertExercise.difficultyLevel,
      imageUrl: insertExercise.imageUrl ?? null,
      equipmentRequired: insertExercise.equipmentRequired ?? null,
      videoUrl: insertExercise.videoUrl ?? null
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(
      exercise => exercise.muscleGroup === muscleGroup
    );
  }

  // Workout Exercises methods
  async getWorkoutExercises(workoutId: number): Promise<(WorkoutExercise & { exercise: Exercise })[]> {
    const workoutExercises = Array.from(this.workoutExercises.values()).filter(
      we => we.workoutId === workoutId
    );

    return workoutExercises.map(we => {
      const exercise = this.exercises.get(we.exerciseId);
      if (!exercise) throw new Error(`Exercise not found: ${we.exerciseId}`);
      return { ...we, exercise };
    });
  }

  async addExerciseToWorkout(insertWorkoutExercise: InsertWorkoutExercise): Promise<WorkoutExercise> {
    const id = this.currentIds.workoutExercises++;
    const workoutExercise: WorkoutExercise = {
      id,
      workoutId: insertWorkoutExercise.workoutId,
      exerciseId: insertWorkoutExercise.exerciseId,
      sets: insertWorkoutExercise.sets,
      reps: insertWorkoutExercise.reps,
      restTime: insertWorkoutExercise.restTime ?? null
    };
    this.workoutExercises.set(id, workoutExercise);
    return workoutExercise;
  }

  // Food methods
  async getAllFoods(): Promise<Food[]> {
    return Array.from(this.foods.values());
  }

  async getFood(id: number): Promise<Food | undefined> {
    return this.foods.get(id);
  }

  async createFood(insertFood: InsertFood): Promise<Food> {
    const id = this.currentIds.foods++;
    const food: Food = {
      id,
      name: insertFood.name,
      calories: insertFood.calories,
      protein: insertFood.protein,
      carbs: insertFood.carbs,
      fat: insertFood.fat,
      fiber: insertFood.fiber ?? null,
      category: insertFood.category,
      imageUrl: insertFood.imageUrl ?? null
    };
    this.foods.set(id, food);
    return food;
  }

  async getFoodsByCategory(category: string): Promise<Food[]> {
    return Array.from(this.foods.values()).filter(
      food => food.category === category
    );
  }

  // Meal Plan methods
  async getMealPlan(userId: number, date: Date): Promise<MealPlan | undefined> {
    const dateStr = date.toISOString().split('T')[0];
    return Array.from(this.mealPlans.values()).find(
      mp => mp.userId === userId && mp.date === dateStr
    );
  }

  async createMealPlan(insertMealPlan: InsertMealPlan): Promise<MealPlan> {
    const id = this.currentIds.mealPlans++;
    const mealPlan: MealPlan = { ...insertMealPlan, id };
    this.mealPlans.set(id, mealPlan);
    return mealPlan;
  }

  async updateMealPlan(id: number, mealPlanData: Partial<MealPlan>): Promise<MealPlan | undefined> {
    const mealPlan = this.mealPlans.get(id);
    if (!mealPlan) return undefined;
    
    const updatedMealPlan = { ...mealPlan, ...mealPlanData };
    this.mealPlans.set(id, updatedMealPlan);
    return updatedMealPlan;
  }

  // Workout Log methods
  async getUserWorkoutLogs(userId: number): Promise<(WorkoutLog & { workout: Workout })[]> {
    const workoutLogs = Array.from(this.workoutLogs.values()).filter(
      wl => wl.userId === userId
    );

    return workoutLogs.map(wl => {
      const workout = this.workouts.get(wl.workoutId);
      if (!workout) throw new Error(`Workout not found: ${wl.workoutId}`);
      return { ...wl, workout };
    });
  }

  async createWorkoutLog(insertWorkoutLog: InsertWorkoutLog): Promise<WorkoutLog> {
    const id = this.currentIds.workoutLogs++;
    const workoutLog: WorkoutLog = {
      id,
      userId: insertWorkoutLog.userId,
      workoutId: insertWorkoutLog.workoutId,
      date: insertWorkoutLog.date,
      duration: insertWorkoutLog.duration,
      caloriesBurned: insertWorkoutLog.caloriesBurned ?? null,
      completed: insertWorkoutLog.completed ?? null
    };
    this.workoutLogs.set(id, workoutLog);
    return workoutLog;
  }

  async getWorkoutLogsInDateRange(userId: number, startDate: Date, endDate: Date): Promise<WorkoutLog[]> {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    return Array.from(this.workoutLogs.values()).filter(
      wl => wl.userId === userId && 
        wl.date >= startDateStr && 
        wl.date <= endDateStr
    );
  }

  async updateWorkoutLog(id: number, workoutLogData: Partial<WorkoutLog>): Promise<WorkoutLog | undefined> {
    const workoutLog = this.workoutLogs.get(id);
    if (!workoutLog) return undefined;
    
    const updatedWorkoutLog = { ...workoutLog, ...workoutLogData };
    this.workoutLogs.set(id, updatedWorkoutLog);
    return updatedWorkoutLog;
  }

  // Progress methods
  async getUserProgressData(userId: number): Promise<ProgressData[]> {
    return Array.from(this.progressData.values()).filter(
      pd => pd.userId === userId
    );
  }

  async createProgressData(insertProgressData: InsertProgressData): Promise<ProgressData> {
    const id = this.currentIds.progressData++;
    const progressData: ProgressData = {
      id,
      userId: insertProgressData.userId,
      date: insertProgressData.date,
      weight: insertProgressData.weight ?? null,
      bodyFat: insertProgressData.bodyFat ?? null,
      notes: insertProgressData.notes ?? null
    };
    this.progressData.set(id, progressData);
    return progressData;
  }

  async getProgressInDateRange(userId: number, startDate: Date, endDate: Date): Promise<ProgressData[]> {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    return Array.from(this.progressData.values()).filter(
      pd => pd.userId === userId && 
        pd.date >= startDateStr && 
        pd.date <= endDateStr
    );
  }

  // Message methods
  async getUserMessages(userId: number): Promise<(Message & { sender: User })[]> {
    const messages = Array.from(this.messages.values()).filter(
      m => m.receiverId === userId
    );

    return messages.map(m => {
      const sender = this.users.get(m.senderId);
      if (!sender) throw new Error(`Sender not found: ${m.senderId}`);
      return { ...m, sender };
    });
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentIds.messages++;
    const message: Message = { 
      ...insertMessage, 
      id, 
      timestamp: new Date(),
      read: false 
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(messageId: number): Promise<Message | undefined> {
    const message = this.messages.get(messageId);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.messages.set(messageId, updatedMessage);
    return updatedMessage;
  }

  // Class Schedule methods
  async getAllClassSchedules(): Promise<(ClassSchedule & { trainer: User })[]> {
    const schedules = Array.from(this.classSchedules.values());

    return schedules.map(schedule => {
      const trainer = this.users.get(schedule.trainerId);
      if (!trainer) throw new Error(`Trainer not found: ${schedule.trainerId}`);
      return { ...schedule, trainer };
    });
  }

  async getClassSchedule(id: number): Promise<ClassSchedule | undefined> {
    return this.classSchedules.get(id);
  }

  async createClassSchedule(insertClassSchedule: InsertClassSchedule): Promise<ClassSchedule> {
    const id = this.currentIds.classSchedules++;
    const classSchedule: ClassSchedule = {
      id,
      className: insertClassSchedule.className,
      description: insertClassSchedule.description ?? null,
      trainerId: insertClassSchedule.trainerId,
      startTime: insertClassSchedule.startTime,
      endTime: insertClassSchedule.endTime,
      maxParticipants: insertClassSchedule.maxParticipants,
      currentParticipants: insertClassSchedule.currentParticipants ?? null
    };
    this.classSchedules.set(id, classSchedule);
    return classSchedule;
  }

  async getTrainerClassSchedules(trainerId: number): Promise<ClassSchedule[]> {
    return Array.from(this.classSchedules.values()).filter(
      cs => cs.trainerId === trainerId
    );
  }

  // Class Enrollment methods
  async enrollInClass(enrollment: InsertClassEnrollment): Promise<ClassEnrollment> {
    const id = this.currentIds.classEnrollments++;
    const classEnrollment: ClassEnrollment = { 
      id,
      classId: enrollment.classId,
      userId: enrollment.userId,
      enrollmentDate: new Date()
    };
    this.classEnrollments.set(id, classEnrollment);
    
    // Update current participants count
    const classSchedule = this.classSchedules.get(enrollment.classId);
    if (classSchedule) {
      classSchedule.currentParticipants = (classSchedule.currentParticipants ?? 0) + 1;
      this.classSchedules.set(classSchedule.id, classSchedule);
    }
    
    return classEnrollment;
  }

  async getUserEnrollments(userId: number): Promise<(ClassEnrollment & { class: ClassSchedule })[]> {
    const enrollments = Array.from(this.classEnrollments.values()).filter(
      e => e.userId === userId
    );

    return enrollments.map(enrollment => {
      const classSchedule = this.classSchedules.get(enrollment.classId);
      if (!classSchedule) throw new Error(`Class not found: ${enrollment.classId}`);
      return { ...enrollment, class: classSchedule };
    });
  }

  // Leaderboard method
  async getLeaderboard(): Promise<{ user: User; points: number }[]> {
    // Calculate points based on workout completions in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    
    const userWorkouts = new Map<number, WorkoutLog[]>();
    
    // Group workout logs by user
    Array.from(this.workoutLogs.values()).forEach(log => {
      if (log.date >= thirtyDaysAgoStr && log.completed) {
        if (!userWorkouts.has(log.userId)) {
          userWorkouts.set(log.userId, []);
        }
        userWorkouts.get(log.userId)?.push(log);
      }
    });
    
    // Calculate points for each user
    const leaderboard: { user: User; points: number }[] = [];
    
    userWorkouts.forEach((workouts, userId) => {
      const user = this.users.get(userId);
      if (user) {
        // Calculate points based on workout duration and completion
        const points = workouts.reduce((total, workout) => {
          return total + (workout.duration * (workout.completed ? 1 : 0.5));
        }, 0);
        
        leaderboard.push({ user, points });
      }
    });
    
    // Sort by points in descending order
    return leaderboard.sort((a, b) => b.points - a.points);
  }
}

export const storage = new MemStorage();
