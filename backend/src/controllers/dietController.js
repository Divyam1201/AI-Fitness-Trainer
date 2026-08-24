import { dietModel } from "../models/dietModel.js";
import { catchError } from "../utils/AppErrorHandler.js";

const handlegetUserDietPlan=catchError(async(req,res)=>{})

const handleAddUserNewDietPlan = catchError(async (userData={clerkUserId: "user_3IJ94J4y0FJ2CuF9XDMDcSGDwtD",
            vapiCallId: "01a032a6-0bdf-700d-8c30-aca47922e3bc",
            ...{
               "dailyCalorieTarget": 2100,
    "macros": {
      "proteinGm": 130,
      "carbsGm": 265,
      "fatsGm": 58
    },
    "meals": [
      {
        "day": "Day 1",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Vegan Protein Oats",
                "calories": 450,
                "proteinGm": 32,
                "carbsGm": 55,
                "fatsGm": 10,
                "ingredients": "40g Rolled Oats, 1 scoop Vegan Pea Protein Powder, 200ml Soy Milk, 50g Blueberries"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Hummus & Carrots",
                "calories": 200,
                "proteinGm": 6,
                "carbsGm": 22,
                "fatsGm": 10,
                "ingredients": "50g Hummus, 150g Baby Carrots"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Tempeh & Quinoa Bowl",
                "calories": 550,
                "proteinGm": 35,
                "carbsGm": 60,
                "fatsGm": 18,
                "ingredients": "120g Tempeh, 150g Cooked Quinoa, 100g Steamed Broccoli, 1 tsp Olive Oil"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Peanut Butter Banana Toast",
                "calories": 350,
                "proteinGm": 12,
                "carbsGm": 48,
                "fatsGm": 14,
                "ingredients": "1 slice Whole Wheat Bread, 15g Peanut Butter, 1 Medium Banana"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Red Lentil Dahl",
                "calories": 550,
                "proteinGm": 45,
                "carbsGm": 80,
                "fatsGm": 6,
                "ingredients": "100g Red Lentils (Dry), 150g Cooked Brown Rice, 100g Fresh Spinach, Garlic, Ginger, Spices"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 2",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Tofu Scramble on Toast",
                "calories": 450,
                "proteinGm": 30,
                "carbsGm": 45,
                "fatsGm": 16,
                "ingredients": "150g Firm Tofu, 2 slices Whole Wheat Toast, 1/4 Avocado, Turmeric, Nutritional Yeast"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Protein Shake & Apple",
                "calories": 250,
                "proteinGm": 26,
                "carbsGm": 30,
                "fatsGm": 3,
                "ingredients": "1 scoop Vegan Protein Powder, 1 Medium Apple, Water"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Seitan & Rice Stir-Fry",
                "calories": 600,
                "proteinGm": 45,
                "carbsGm": 75,
                "fatsGm": 13,
                "ingredients": "120g Seitan, 180g Cooked Jasmine Rice, 100g Mixed Bell Peppers, 1 tbsp Soy Sauce, 1 tsp Sesame Oil"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Edamame & Rice Cakes",
                "calories": 250,
                "proteinGm": 14,
                "carbsGm": 35,
                "fatsGm": 6,
                "ingredients": "100g Shelled Edamame, 2 Plain Brown Rice Cakes"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Black Bean & Sweet Potato Chili",
                "calories": 550,
                "proteinGm": 15,
                "carbsGm": 80,
                "fatsGm": 20,
                "ingredients": "150g Canned Black Beans, 150g Sweet Potato, 100g Crushed Tomatoes, 10g Pumpkin Seeds"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 3",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Chia Seed Pudding",
                "calories": 400,
                "proteinGm": 20,
                "carbsGm": 50,
                "fatsGm": 14,
                "ingredients": "30g Chia Seeds, 250ml Soy Milk, 1 scoop Vegan Protein Powder, 100g Strawberries"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Mixed Nuts & Pear",
                "calories": 250,
                "proteinGm": 6,
                "carbsGm": 30,
                "fatsGm": 14,
                "ingredients": "20g Raw Almonds, 1 Medium Pear"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Chickpea Salad Bowl",
                "calories": 600,
                "proteinGm": 25,
                "carbsGm": 85,
                "fatsGm": 18,
                "ingredients": "200g Chickpeas, 100g Cucumber, 100g Cherry Tomatoes, 20g Tahini, Lemon Juice"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Soy Yogurt with Berries",
                "calories": 300,
                "proteinGm": 18,
                "carbsGm": 40,
                "fatsGm": 6,
                "ingredients": "200g Unsweetened Soy Yogurt, 80g Raspberries, 15g Hemp Seeds"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Tofu Vegetable Curry",
                "calories": 550,
                "proteinGm": 61,
                "carbsGm": 60,
                "fatsGm": 6,
                "ingredients": "150g Smoked Tofu, 150g Cauliflower, 150g Cooked Brown Rice, 50g Coconut Milk (Light)"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 4",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Vegan Protein Oats",
                "calories": 450,
                "proteinGm": 32,
                "carbsGm": 55,
                "fatsGm": 10,
                "ingredients": "40g Rolled Oats, 1 scoop Vegan Pea Protein Powder, 200ml Soy Milk, 50g Blueberries"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Hummus & Carrots",
                "calories": 200,
                "proteinGm": 6,
                "carbsGm": 22,
                "fatsGm": 10,
                "ingredients": "50g Hummus, 150g Baby Carrots"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Tempeh & Quinoa Bowl",
                "calories": 550,
                "proteinGm": 35,
                "carbsGm": 60,
                "fatsGm": 18,
                "ingredients": "120g Tempeh, 150g Cooked Quinoa, 100g Steamed Broccoli, 1 tsp Olive Oil"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Peanut Butter Banana Toast",
                "calories": 350,
                "proteinGm": 12,
                "carbsGm": 48,
                "fatsGm": 14,
                "ingredients": "1 slice Whole Wheat Bread, 15g Peanut Butter, 1 Medium Banana"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Red Lentil Dahl",
                "calories": 550,
                "proteinGm": 45,
                "carbsGm": 80,
                "fatsGm": 6,
                "ingredients": "100g Red Lentils (Dry), 150g Cooked Brown Rice, 100g Fresh Spinach, Garlic, Ginger, Spices"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 5",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Tofu Scramble on Toast",
                "calories": 450,
                "proteinGm": 30,
                "carbsGm": 45,
                "fatsGm": 16,
                "ingredients": "150g Firm Tofu, 2 slices Whole Wheat Toast, 1/4 Avocado, Turmeric, Nutritional Yeast"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Protein Shake & Apple",
                "calories": 250,
                "proteinGm": 26,
                "carbsGm": 30,
                "fatsGm": 3,
                "ingredients": "1 scoop Vegan Protein Powder, 1 Medium Apple, Water"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Seitan & Rice Stir-Fry",
                "calories": 600,
                "proteinGm": 45,
                "carbsGm": 75,
                "fatsGm": 13,
                "ingredients": "120g Seitan, 180g Cooked Jasmine Rice, 100g Mixed Bell Peppers, 1 tbsp Soy Sauce, 1 tsp Sesame Oil"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Edamame & Rice Cakes",
                "calories": 250,
                "proteinGm": 14,
                "carbsGm": 35,
                "fatsGm": 6,
                "ingredients": "100g Shelled Edamame, 2 Plain Brown Rice Cakes"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Black Bean & Sweet Potato Chili",
                "calories": 550,
                "proteinGm": 15,
                "carbsGm": 80,
                "fatsGm": 20,
                "ingredients": "150g Canned Black Beans, 150g Sweet Potato, 100g Crushed Tomatoes, 10g Pumpkin Seeds"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 6",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Chia Seed Pudding",
                "calories": 400,
                "proteinGm": 20,
                "carbsGm": 50,
                "fatsGm": 14,
                "ingredients": "30g Chia Seeds, 250ml Soy Milk, 1 scoop Vegan Protein Powder, 100g Strawberries"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Mixed Nuts & Pear",
                "calories": 250,
                "proteinGm": 6,
                "carbsGm": 30,
                "fatsGm": 14,
                "ingredients": "20g Raw Almonds, 1 Medium Pear"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Chickpea Salad Bowl",
                "calories": 600,
                "proteinGm": 25,
                "carbsGm": 85,
                "fatsGm": 18,
                "ingredients": "200g Chickpeas, 100g Cucumber, 100g Cherry Tomatoes, 20g Tahini, Lemon Juice"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Soy Yogurt with Berries",
                "calories": 300,
                "proteinGm": 18,
                "carbsGm": 40,
                "fatsGm": 6,
                "ingredients": "200g Unsweetened Soy Yogurt, 80g Raspberries, 15g Hemp Seeds"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Tofu Vegetable Curry",
                "calories": 550,
                "proteinGm": 61,
                "carbsGm": 60,
                "fatsGm": 6,
                "ingredients": "150g Smoked Tofu, 150g Cauliflower, 150g Cooked Brown Rice, 50g Coconut Milk (Light)"
              }
            ]
          }
        ]
      },
      {
        "day": "Day 7",
        "dayMeals": [
          {
            "mealType": "Breakfast",
            "items": [
              {
                "name": "Vegan Protein Oats",
                "calories": 450,
                "proteinGm": 32,
                "carbsGm": 55,
                "fatsGm": 10,
                "ingredients": "40g Rolled Oats, 1 scoop Vegan Pea Protein Powder, 200ml Soy Milk, 50g Blueberries"
              }
            ]
          },
          {
            "mealType": "Mid-Morning Snack",
            "items": [
              {
                "name": "Hummus & Carrots",
                "calories": 200,
                "proteinGm": 6,
                "carbsGm": 22,
                "fatsGm": 10,
                "ingredients": "50g Hummus, 150g Baby Carrots"
              }
            ]
          },
          {
            "mealType": "Lunch",
            "items": [
              {
                "name": "Tempeh & Quinoa Bowl",
                "calories": 550,
                "proteinGm": 35,
                "carbsGm": 60,
                "fatsGm": 18,
                "ingredients": "120g Tempeh, 150g Cooked Quinoa, 100g Steamed Broccoli, 1 tsp Olive Oil"
              }
            ]
          },
          {
            "mealType": "Afternoon Snack",
            "items": [
              {
                "name": "Peanut Butter Banana Toast",
                "calories": 350,
                "proteinGm": 12,
                "carbsGm": 48,
                "fatsGm": 14,
                "ingredients": "1 slice Whole Wheat Bread, 15g Peanut Butter, 1 Medium Banana"
              }
            ]
          },
          {
            "mealType": "Dinner",
            "items": [
              {
                "name": "Red Lentil Dahl",
                "calories": 550,
                "proteinGm": 45,
                "carbsGm": 80,
                "fatsGm": 6,
                "ingredients": "100g Red Lentils (Dry), 150g Cooked Brown Rice, 100g Fresh Spinach, Garlic, Ginger, Spices"
              }
            ]
          }
        ]
      }
    ]
            },
            status: "active"}) => {
  const existingPlan = await dietModel.updateMany(
    { clerkUserId: userData.clerkUserId, status: "active" },
    { $set: { status: "inactive" } },
  );
  const addPlan = await dietModel.create(userData);
  console.log(addPlan)
});
export { handlegetUserDietPlan, handleAddUserNewDietPlan };