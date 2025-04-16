// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  workouts;
  exercises;
  workoutExercises;
  foods;
  mealPlans;
  workoutLogs;
  progressData;
  messages;
  classSchedules;
  classEnrollments;
  currentIds;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.workouts = /* @__PURE__ */ new Map();
    this.exercises = /* @__PURE__ */ new Map();
    this.workoutExercises = /* @__PURE__ */ new Map();
    this.foods = /* @__PURE__ */ new Map();
    this.mealPlans = /* @__PURE__ */ new Map();
    this.workoutLogs = /* @__PURE__ */ new Map();
    this.progressData = /* @__PURE__ */ new Map();
    this.messages = /* @__PURE__ */ new Map();
    this.classSchedules = /* @__PURE__ */ new Map();
    this.classEnrollments = /* @__PURE__ */ new Map();
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
    this.initializeData();
  }
  initializeData() {
    const user = {
      id: 1,
      username: "rahul_sharma",
      password: "password123",
      // In real app, this would be hashed
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
    const trainer = {
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
    const trainer2 = {
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
    const user2 = {
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
    const user3 = {
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
    const user4 = {
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
    const exercises2 = [
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
    exercises2.forEach((exercise) => {
      this.exercises.set(exercise.id, exercise);
    });
    this.currentIds.exercises = exercises2.length + 1;
    const workouts2 = [
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
    workouts2.forEach((workout) => {
      this.workouts.set(workout.id, workout);
    });
    this.currentIds.workouts = workouts2.length + 1;
    const workoutExercises2 = [
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
    workoutExercises2.forEach((workoutExercise) => {
      this.workoutExercises.set(workoutExercise.id, workoutExercise);
    });
    this.currentIds.workoutExercises = workoutExercises2.length + 1;
    const foods2 = [
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
    foods2.forEach((food) => {
      this.foods.set(food.id, food);
    });
    this.currentIds.foods = 4;
    const today = /* @__PURE__ */ new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const mealPlan = {
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
    const pastDates = [];
    for (let i = 7; i >= 0; i--) {
      const date2 = /* @__PURE__ */ new Date();
      date2.setDate(date2.getDate() - i);
      pastDates.push(date2.toISOString().split("T")[0]);
    }
    const workoutLogs2 = [
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
    workoutLogs2.forEach((workoutLog) => {
      this.workoutLogs.set(workoutLog.id, workoutLog);
    });
    this.currentIds.workoutLogs = 5;
    const progressEntries = [
      { date: new Date(2023, 3, 15), weight: 78 },
      { date: new Date(2023, 3, 22), weight: 77.5 },
      { date: new Date(2023, 3, 29), weight: 76.8 },
      { date: new Date(2023, 4, 6), weight: 76 },
      { date: new Date(2023, 4, 13), weight: 75.5 }
    ];
    progressEntries.forEach((entry, index) => {
      const progressEntry = {
        id: index + 1,
        userId: 1,
        date: entry.date.toISOString().split("T")[0],
        weight: entry.weight,
        bodyFat: null,
        notes: ""
      };
      this.progressData.set(progressEntry.id, progressEntry);
    });
    this.currentIds.progressData = progressEntries.length + 1;
    const messages2 = [
      {
        id: 1,
        senderId: 2,
        // Priya (trainer)
        receiverId: 1,
        // Rahul (user)
        message: "Great job on completing your leg workout yesterday! I've updated your plan for next week with progressive overload. Let me know if you have questions.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1e3),
        // 2 hours ago
        read: false
      },
      {
        id: 2,
        senderId: 3,
        // Amit (trainer)
        receiverId: 1,
        // Rahul (user)
        message: "Remember to increase your water intake during these hot months. I noticed your hydration tracking is lower than recommended.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1e3),
        // 1 day ago
        read: false
      }
    ];
    messages2.forEach((message) => {
      this.messages.set(message.id, message);
    });
    this.currentIds.messages = 3;
    const futureDate1 = /* @__PURE__ */ new Date();
    futureDate1.setDate(futureDate1.getDate() + 1);
    futureDate1.setHours(9, 0, 0, 0);
    const futureDate2 = /* @__PURE__ */ new Date();
    futureDate2.setDate(futureDate2.getDate() + 1);
    futureDate2.setHours(10, 0, 0, 0);
    const classSchedules2 = [
      {
        id: 1,
        trainerId: 2,
        className: "Morning Yoga",
        description: "Start your day with energizing yoga flows",
        startTime: futureDate1,
        endTime: new Date(futureDate1.getTime() + 60 * 60 * 1e3),
        // 1 hour later
        maxParticipants: 10,
        currentParticipants: 5
      },
      {
        id: 2,
        trainerId: 3,
        className: "HIIT Workout",
        description: "High intensity interval training for maximum calorie burn",
        startTime: futureDate2,
        endTime: new Date(futureDate2.getTime() + 45 * 60 * 1e3),
        // 45 minutes later
        maxParticipants: 15,
        currentParticipants: 8
      }
    ];
    classSchedules2.forEach((classSchedule) => {
      this.classSchedules.set(classSchedule.id, classSchedule);
    });
    this.currentIds.classSchedules = 3;
    const enrollments = [
      {
        id: 1,
        classId: 1,
        userId: 1,
        enrollmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3)
        // 2 days ago
      }
    ];
    enrollments.forEach((enrollment) => {
      this.classEnrollments.set(enrollment.id, enrollment);
    });
    this.currentIds.classEnrollments = 2;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentIds.users++;
    const user = {
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
  async updateUser(id, userData) {
    const user = this.users.get(id);
    if (!user) return void 0;
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Workout methods
  async getAllWorkouts() {
    return Array.from(this.workouts.values());
  }
  async getWorkout(id) {
    return this.workouts.get(id);
  }
  async createWorkout(insertWorkout) {
    const id = this.currentIds.workouts++;
    const workout = {
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
  async recommendWorkouts(equipment, muscleGroups) {
    return Array.from(this.workouts.values()).filter((workout) => {
      const hasRequiredEquipment = equipment.length === 0 || (workout.equipmentRequired ?? []).some((eq) => equipment.includes(eq));
      const targetsDesiredMuscles = muscleGroups.length === 0 || (workout.targetMuscleGroups ?? []).some((mg) => muscleGroups.includes(mg));
      return hasRequiredEquipment && targetsDesiredMuscles;
    });
  }
  // Exercise methods
  async getAllExercises() {
    return Array.from(this.exercises.values());
  }
  async getExercise(id) {
    return this.exercises.get(id);
  }
  async createExercise(insertExercise) {
    const id = this.currentIds.exercises++;
    const exercise = {
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
  async getExercisesByMuscleGroup(muscleGroup) {
    return Array.from(this.exercises.values()).filter(
      (exercise) => exercise.muscleGroup === muscleGroup
    );
  }
  // Workout Exercises methods
  async getWorkoutExercises(workoutId) {
    const workoutExercises2 = Array.from(this.workoutExercises.values()).filter(
      (we) => we.workoutId === workoutId
    );
    return workoutExercises2.map((we) => {
      const exercise = this.exercises.get(we.exerciseId);
      if (!exercise) throw new Error(`Exercise not found: ${we.exerciseId}`);
      return { ...we, exercise };
    });
  }
  async addExerciseToWorkout(insertWorkoutExercise) {
    const id = this.currentIds.workoutExercises++;
    const workoutExercise = {
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
  async getAllFoods() {
    return Array.from(this.foods.values());
  }
  async getFood(id) {
    return this.foods.get(id);
  }
  async createFood(insertFood) {
    const id = this.currentIds.foods++;
    const food = {
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
  async getFoodsByCategory(category) {
    return Array.from(this.foods.values()).filter(
      (food) => food.category === category
    );
  }
  // Meal Plan methods
  async getMealPlan(userId, date2) {
    const dateStr = date2.toISOString().split("T")[0];
    return Array.from(this.mealPlans.values()).find(
      (mp) => mp.userId === userId && mp.date === dateStr
    );
  }
  async createMealPlan(insertMealPlan) {
    const id = this.currentIds.mealPlans++;
    const mealPlan = { ...insertMealPlan, id };
    this.mealPlans.set(id, mealPlan);
    return mealPlan;
  }
  async updateMealPlan(id, mealPlanData) {
    const mealPlan = this.mealPlans.get(id);
    if (!mealPlan) return void 0;
    const updatedMealPlan = { ...mealPlan, ...mealPlanData };
    this.mealPlans.set(id, updatedMealPlan);
    return updatedMealPlan;
  }
  // Workout Log methods
  async getUserWorkoutLogs(userId) {
    const workoutLogs2 = Array.from(this.workoutLogs.values()).filter(
      (wl) => wl.userId === userId
    );
    return workoutLogs2.map((wl) => {
      const workout = this.workouts.get(wl.workoutId);
      if (!workout) throw new Error(`Workout not found: ${wl.workoutId}`);
      return { ...wl, workout };
    });
  }
  async createWorkoutLog(insertWorkoutLog) {
    const id = this.currentIds.workoutLogs++;
    const workoutLog = {
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
  async getWorkoutLogsInDateRange(userId, startDate, endDate) {
    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];
    return Array.from(this.workoutLogs.values()).filter(
      (wl) => wl.userId === userId && wl.date >= startDateStr && wl.date <= endDateStr
    );
  }
  async updateWorkoutLog(id, workoutLogData) {
    const workoutLog = this.workoutLogs.get(id);
    if (!workoutLog) return void 0;
    const updatedWorkoutLog = { ...workoutLog, ...workoutLogData };
    this.workoutLogs.set(id, updatedWorkoutLog);
    return updatedWorkoutLog;
  }
  // Progress methods
  async getUserProgressData(userId) {
    return Array.from(this.progressData.values()).filter(
      (pd) => pd.userId === userId
    );
  }
  async createProgressData(insertProgressData) {
    const id = this.currentIds.progressData++;
    const progressData2 = {
      id,
      userId: insertProgressData.userId,
      date: insertProgressData.date,
      weight: insertProgressData.weight ?? null,
      bodyFat: insertProgressData.bodyFat ?? null,
      notes: insertProgressData.notes ?? null
    };
    this.progressData.set(id, progressData2);
    return progressData2;
  }
  async getProgressInDateRange(userId, startDate, endDate) {
    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];
    return Array.from(this.progressData.values()).filter(
      (pd) => pd.userId === userId && pd.date >= startDateStr && pd.date <= endDateStr
    );
  }
  // Message methods
  async getUserMessages(userId) {
    const messages2 = Array.from(this.messages.values()).filter(
      (m) => m.receiverId === userId
    );
    return messages2.map((m) => {
      const sender = this.users.get(m.senderId);
      if (!sender) throw new Error(`Sender not found: ${m.senderId}`);
      return { ...m, sender };
    });
  }
  async createMessage(insertMessage) {
    const id = this.currentIds.messages++;
    const message = {
      ...insertMessage,
      id,
      timestamp: /* @__PURE__ */ new Date(),
      read: false
    };
    this.messages.set(id, message);
    return message;
  }
  async markMessageAsRead(messageId) {
    const message = this.messages.get(messageId);
    if (!message) return void 0;
    const updatedMessage = { ...message, read: true };
    this.messages.set(messageId, updatedMessage);
    return updatedMessage;
  }
  // Class Schedule methods
  async getAllClassSchedules() {
    const schedules = Array.from(this.classSchedules.values());
    return schedules.map((schedule) => {
      const trainer = this.users.get(schedule.trainerId);
      if (!trainer) throw new Error(`Trainer not found: ${schedule.trainerId}`);
      return { ...schedule, trainer };
    });
  }
  async getClassSchedule(id) {
    return this.classSchedules.get(id);
  }
  async createClassSchedule(insertClassSchedule) {
    const id = this.currentIds.classSchedules++;
    const classSchedule = {
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
  async getTrainerClassSchedules(trainerId) {
    return Array.from(this.classSchedules.values()).filter(
      (cs) => cs.trainerId === trainerId
    );
  }
  // Class Enrollment methods
  async enrollInClass(enrollment) {
    const id = this.currentIds.classEnrollments++;
    const classEnrollment = {
      id,
      classId: enrollment.classId,
      userId: enrollment.userId,
      enrollmentDate: /* @__PURE__ */ new Date()
    };
    this.classEnrollments.set(id, classEnrollment);
    const classSchedule = this.classSchedules.get(enrollment.classId);
    if (classSchedule) {
      classSchedule.currentParticipants = (classSchedule.currentParticipants ?? 0) + 1;
      this.classSchedules.set(classSchedule.id, classSchedule);
    }
    return classEnrollment;
  }
  async getUserEnrollments(userId) {
    const enrollments = Array.from(this.classEnrollments.values()).filter(
      (e) => e.userId === userId
    );
    return enrollments.map((enrollment) => {
      const classSchedule = this.classSchedules.get(enrollment.classId);
      if (!classSchedule) throw new Error(`Class not found: ${enrollment.classId}`);
      return { ...enrollment, class: classSchedule };
    });
  }
  // Leaderboard method
  async getLeaderboard() {
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0];
    const userWorkouts = /* @__PURE__ */ new Map();
    Array.from(this.workoutLogs.values()).forEach((log2) => {
      if (log2.date >= thirtyDaysAgoStr && log2.completed) {
        if (!userWorkouts.has(log2.userId)) {
          userWorkouts.set(log2.userId, []);
        }
        userWorkouts.get(log2.userId)?.push(log2);
      }
    });
    const leaderboard = [];
    userWorkouts.forEach((workouts2, userId) => {
      const user = this.users.get(userId);
      if (user) {
        const points = workouts2.reduce((total, workout) => {
          return total + workout.duration * (workout.completed ? 1 : 0.5);
        }, 0);
        leaderboard.push({ user, points });
      }
    });
    return leaderboard.sort((a, b) => b.points - a.points);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";
import bcrypt from "bcrypt";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  profileImage: text("profile_image"),
  weight: integer("weight"),
  height: integer("height"),
  age: integer("age"),
  gender: text("gender"),
  goal: text("goal"),
  // weight loss, muscle gain, etc.
  isTrainer: boolean("is_trainer").default(false),
  plan: text("plan").default("Basic")
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true
});
var workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  // in minutes
  difficulty: text("difficulty").notNull(),
  equipmentRequired: text("equipment_required").array(),
  targetMuscleGroups: text("target_muscle_groups").array(),
  imageUrl: text("image_url")
});
var insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true
});
var exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  muscleGroup: text("muscle_group").notNull(),
  equipmentRequired: text("equipment_required"),
  difficultyLevel: text("difficulty_level").notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url")
});
var insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true
});
var workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull(),
  exerciseId: integer("exercise_id").notNull(),
  sets: integer("sets").notNull(),
  reps: integer("reps").notNull(),
  restTime: integer("rest_time")
  // in seconds
});
var insertWorkoutExerciseSchema = createInsertSchema(workoutExercises).omit({
  id: true
});
var foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  // in grams
  carbs: integer("carbs").notNull(),
  // in grams
  fat: integer("fat").notNull(),
  // in grams
  fiber: integer("fiber"),
  // in grams
  category: text("category").notNull(),
  // breakfast, lunch, dinner, snack
  imageUrl: text("image_url")
});
var insertFoodSchema = createInsertSchema(foods).omit({
  id: true
});
var mealPlans = pgTable("meal_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  meals: jsonb("meals").notNull()
  // array of food items with time
});
var insertMealPlanSchema = createInsertSchema(mealPlans).omit({
  id: true
});
var workoutLogs = pgTable("workout_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  workoutId: integer("workout_id").notNull(),
  date: text("date").notNull(),
  duration: integer("duration").notNull(),
  // in minutes
  caloriesBurned: integer("calories_burned"),
  completed: boolean("completed").default(true)
});
var insertWorkoutLogSchema = createInsertSchema(workoutLogs).omit({
  id: true
});
var progressData = pgTable("progress_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  weight: integer("weight"),
  bodyFat: integer("body_fat"),
  notes: text("notes")
});
var insertProgressDataSchema = createInsertSchema(progressData).omit({
  id: true
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  read: boolean("read").default(false)
});
var insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  timestamp: true
});
var classSchedules = pgTable("class_schedules", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").notNull(),
  className: text("class_name").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  maxParticipants: integer("max_participants").notNull(),
  currentParticipants: integer("current_participants").default(0)
});
var insertClassScheduleSchema = createInsertSchema(classSchedules).omit({
  id: true
});
var classEnrollments = pgTable("class_enrollments", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").notNull(),
  userId: integer("user_id").notNull(),
  enrollmentDate: timestamp("enrollment_date").defaultNow().notNull()
});
var insertClassEnrollmentSchema = createInsertSchema(classEnrollments).omit({
  id: true,
  enrollmentDate: true
});

// server/routes.ts
async function registerRoutes(app2) {
  const authRouter = express.Router();
  authRouter.post("/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userWithHashedPassword = { ...userData, password: hashedPassword };
      const user = await storage.createUser(userWithHashedPassword);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  authRouter.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to authenticate" });
    }
  });
  app2.use("/api/auth", authRouter);
  const userRouter = express.Router();
  userRouter.get("/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  userRouter.patch("/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const userData = req.body;
      if (userData.password) {
        delete userData.password;
      }
      const updatedUser = await storage.updateUser(userId, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  app2.use("/api/users", userRouter);
  const workoutRouter = express.Router();
  workoutRouter.get("/", async (req, res) => {
    try {
      const workouts2 = await storage.getAllWorkouts();
      res.status(200).json(workouts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get workouts" });
    }
  });
  workoutRouter.get("/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const allWorkouts = await storage.getAllWorkouts();
      res.status(200).json(allWorkouts.slice(0, 3));
    } catch (error) {
      res.status(500).json({ message: "Failed to get user workouts" });
    }
  });
  workoutRouter.get("/:id", async (req, res) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkout(workoutId);
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ message: "Failed to get workout" });
    }
  });
  workoutRouter.post("/", async (req, res) => {
    try {
      const workoutData = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout(workoutData);
      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workout data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create workout" });
    }
  });
  workoutRouter.get("/:id/exercises", async (req, res) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workoutExercises2 = await storage.getWorkoutExercises(workoutId);
      res.status(200).json(workoutExercises2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get workout exercises" });
    }
  });
  workoutRouter.post("/recommend", async (req, res) => {
    try {
      const { equipment, muscleGroups } = req.body;
      if (!Array.isArray(equipment) || !Array.isArray(muscleGroups)) {
        return res.status(400).json({ message: "Equipment and muscleGroups must be arrays" });
      }
      const workouts2 = await storage.recommendWorkouts(equipment, muscleGroups);
      res.status(200).json(workouts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to recommend workouts" });
    }
  });
  app2.use("/api/workouts", workoutRouter);
  const exerciseRouter = express.Router();
  exerciseRouter.get("/", async (req, res) => {
    try {
      const muscleGroup = req.query.muscleGroup;
      if (muscleGroup) {
        const exercises3 = await storage.getExercisesByMuscleGroup(muscleGroup);
        return res.status(200).json(exercises3);
      }
      const exercises2 = await storage.getAllExercises();
      res.status(200).json(exercises2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get exercises" });
    }
  });
  exerciseRouter.get("/:id", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Failed to get exercise" });
    }
  });
  exerciseRouter.post("/", async (req, res) => {
    try {
      const exerciseData = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(exerciseData);
      res.status(201).json(exercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid exercise data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create exercise" });
    }
  });
  app2.use("/api/exercises", exerciseRouter);
  const workoutExerciseRouter = express.Router();
  workoutExerciseRouter.post("/", async (req, res) => {
    try {
      const workoutExerciseData = insertWorkoutExerciseSchema.parse(req.body);
      const workoutExercise = await storage.addExerciseToWorkout(workoutExerciseData);
      res.status(201).json(workoutExercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workout exercise data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add exercise to workout" });
    }
  });
  app2.use("/api/workout-exercises", workoutExerciseRouter);
  const foodRouter = express.Router();
  foodRouter.get("/", async (req, res) => {
    try {
      const category = req.query.category;
      if (category) {
        const foods3 = await storage.getFoodsByCategory(category);
        return res.status(200).json(foods3);
      }
      const foods2 = await storage.getAllFoods();
      res.status(200).json(foods2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get foods" });
    }
  });
  foodRouter.get("/:id", async (req, res) => {
    try {
      const foodId = parseInt(req.params.id);
      const food = await storage.getFood(foodId);
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json({ message: "Failed to get food" });
    }
  });
  foodRouter.post("/", async (req, res) => {
    try {
      const foodData = insertFoodSchema.parse(req.body);
      const food = await storage.createFood(foodData);
      res.status(201).json(food);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid food data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create food" });
    }
  });
  app2.use("/api/foods", foodRouter);
  const mealPlanRouter = express.Router();
  mealPlanRouter.get("/:userId/today", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const today = /* @__PURE__ */ new Date();
      const formattedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const mealPlan = await storage.getMealPlan(userId, formattedDate);
      if (!mealPlan) {
        return res.status(404).json({ message: "Meal plan not found for today" });
      }
      res.status(200).json(mealPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to get meal plan" });
    }
  });
  mealPlanRouter.post("/", async (req, res) => {
    try {
      const mealPlanData = insertMealPlanSchema.parse(req.body);
      const mealPlan = await storage.createMealPlan(mealPlanData);
      res.status(201).json(mealPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid meal plan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create meal plan" });
    }
  });
  mealPlanRouter.patch("/:id", async (req, res) => {
    try {
      const mealPlanId = parseInt(req.params.id);
      const mealPlanData = req.body;
      const updatedMealPlan = await storage.updateMealPlan(mealPlanId, mealPlanData);
      if (!updatedMealPlan) {
        return res.status(404).json({ message: "Meal plan not found" });
      }
      res.status(200).json(updatedMealPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meal plan" });
    }
  });
  app2.use("/api/meal-plans", mealPlanRouter);
  const workoutLogRouter = express.Router();
  workoutLogRouter.get("/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const workoutLogs2 = await storage.getUserWorkoutLogs(userId);
      res.status(200).json(workoutLogs2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get workout logs" });
    }
  });
  workoutLogRouter.get("/user/:userId/range", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      const workoutLogs2 = await storage.getWorkoutLogsInDateRange(userId, startDate, endDate);
      res.status(200).json(workoutLogs2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get workout logs" });
    }
  });
  workoutLogRouter.post("/", async (req, res) => {
    try {
      const workoutLogData = insertWorkoutLogSchema.parse(req.body);
      const workoutLog = await storage.createWorkoutLog(workoutLogData);
      res.status(201).json(workoutLog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workout log data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create workout log" });
    }
  });
  workoutLogRouter.patch("/:id/complete", async (req, res) => {
    try {
      const workoutLogId = parseInt(req.params.id);
      const { duration, caloriesBurned } = req.body;
      const updatedWorkoutLog = await storage.updateWorkoutLog(workoutLogId, {
        completed: true,
        duration,
        caloriesBurned
      });
      if (!updatedWorkoutLog) {
        return res.status(404).json({ message: "Workout log not found" });
      }
      res.status(200).json(updatedWorkoutLog);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete workout" });
    }
  });
  app2.use("/api/workout-logs", workoutLogRouter);
  const progressRouter = express.Router();
  progressRouter.get("/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData2 = await storage.getUserProgressData(userId);
      res.status(200).json(progressData2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get progress data" });
    }
  });
  progressRouter.get("/user/:userId/range", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      const progressData2 = await storage.getProgressInDateRange(userId, startDate, endDate);
      res.status(200).json(progressData2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get progress data" });
    }
  });
  progressRouter.post("/", async (req, res) => {
    try {
      const progressData2 = insertProgressDataSchema.parse(req.body);
      const progress = await storage.createProgressData(progressData2);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create progress data" });
    }
  });
  app2.use("/api/progress", progressRouter);
  const messageRouter = express.Router();
  messageRouter.get("/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages2 = await storage.getUserMessages(userId);
      res.status(200).json(messages2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });
  messageRouter.post("/", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });
  messageRouter.patch("/:id/read", async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const updatedMessage = await storage.markMessageAsRead(messageId);
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  app2.use("/api/messages", messageRouter);
  const classScheduleRouter = express.Router();
  classScheduleRouter.get("/", async (req, res) => {
    try {
      const classSchedules2 = await storage.getAllClassSchedules();
      res.status(200).json(classSchedules2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get class schedules" });
    }
  });
  classScheduleRouter.get("/trainer/:trainerId", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const classSchedules2 = await storage.getTrainerClassSchedules(trainerId);
      res.status(200).json(classSchedules2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trainer class schedules" });
    }
  });
  classScheduleRouter.post("/", async (req, res) => {
    try {
      const classScheduleData = insertClassScheduleSchema.parse(req.body);
      const classSchedule = await storage.createClassSchedule(classScheduleData);
      res.status(201).json(classSchedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid class schedule data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create class schedule" });
    }
  });
  app2.use("/api/class-schedules", classScheduleRouter);
  const classEnrollmentRouter = express.Router();
  classEnrollmentRouter.get("/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollments = await storage.getUserEnrollments(userId);
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user enrollments" });
    }
  });
  classEnrollmentRouter.post("/", async (req, res) => {
    try {
      const enrollmentData = insertClassEnrollmentSchema.parse(req.body);
      const classSchedule = await storage.getClassSchedule(enrollmentData.classId);
      if (!classSchedule) {
        return res.status(404).json({ message: "Class not found" });
      }
      if ((classSchedule.currentParticipants ?? 0) >= classSchedule.maxParticipants) {
        return res.status(400).json({ message: "Class is full" });
      }
      const enrollment = await storage.enrollInClass(enrollmentData);
      res.status(201).json(enrollment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid enrollment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to enroll in class" });
    }
  });
  app2.use("/api/class-enrollments", classEnrollmentRouter);
  app2.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Failed to get leaderboard" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
