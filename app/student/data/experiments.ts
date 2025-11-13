export interface TestCase {
  input: string;
  expected_output: string;
}

export interface ExperimentStep {
  step_no: number;
  title: string;
  instruction: string;
  starter_code: string;
  solution_code: string;
  test_cases: TestCase[];
}

export interface Experiment {
  id: string;
  experiment_title: string;
  subject: string;
  language: string;
  total_steps: number;
  steps: ExperimentStep[];
  pdfUrl?: string;
  videoUrl?: string;
  description?: string;
}

export const mockExperiments: Experiment[] = [
  {
    id: "exp-001",
    experiment_title: "Introduction to Variables and Data Types",
    subject: "Python Programming",
    language: "python",
    total_steps: 3,
    description: "Learn the fundamentals of Python variables, data types, and basic operations. This experiment covers strings, integers, floats, and basic arithmetic operations.",
    pdfUrl: "https://www.orimi.com/pdf-test.pdf",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    steps: [
      {
        step_no: 1,
        title: "Declare and Print Variables",
        instruction: "Create variables for name (string), age (integer), and height (float). Print them in a formatted way.",
        starter_code: `# TODO: Create a variable 'name' with your name
# TODO: Create a variable 'age' with your age
# TODO: Create a variable 'height' with your height in meters

# TODO: Print all variables with labels
`,
        solution_code: `name = "John Doe"
age = 20
height = 1.75

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
`,
        test_cases: [
          {
            input: "",
            expected_output: "Name: John Doe\nAge: 20\nHeight: 1.75m"
          }
        ]
      },
      {
        step_no: 2,
        title: "Perform Basic Arithmetic",
        instruction: "Create two numbers and perform addition, subtraction, multiplication, and division.",
        starter_code: `num1 = 10
num2 = 5

# TODO: Calculate sum
# TODO: Calculate difference
# TODO: Calculate product
# TODO: Calculate quotient

# TODO: Print all results
`,
        solution_code: `num1 = 10
num2 = 5

sum_result = num1 + num2
diff_result = num1 - num2
prod_result = num1 * num2
quot_result = num1 / num2

print(f"Sum: {sum_result}")
print(f"Difference: {diff_result}")
print(f"Product: {prod_result}")
print(f"Quotient: {quot_result}")
`,
        test_cases: [
          {
            input: "",
            expected_output: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2.0"
          }
        ]
      },
      {
        step_no: 3,
        title: "String Manipulation",
        instruction: "Take a string and perform operations like uppercase, lowercase, and length.",
        starter_code: `text = "Hello World"

# TODO: Convert to uppercase
# TODO: Convert to lowercase
# TODO: Get length of string

# TODO: Print all results
`,
        solution_code: `text = "Hello World"

upper_text = text.upper()
lower_text = text.lower()
length = len(text)

print(f"Uppercase: {upper_text}")
print(f"Lowercase: {lower_text}")
print(f"Length: {length}")
`,
        test_cases: [
          {
            input: "",
            expected_output: "Uppercase: HELLO WORLD\nLowercase: hello world\nLength: 11"
          }
        ]
      }
    ]
  },
  {
    id: "exp-002",
    experiment_title: "Loops and Iterations",
    subject: "Python Programming",
    language: "python",
    total_steps: 2,
    description: "Master the concept of loops in Python. Learn how to use for loops to iterate through ranges and perform repetitive calculations efficiently.",
    pdfUrl: "https://www.orimi.com/pdf-test.pdf",
    videoUrl: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ",
    steps: [
      {
        step_no: 1,
        title: "For Loop Basics",
        instruction: "Use a for loop to print numbers from 1 to 10.",
        starter_code: `# TODO: Write a for loop to print numbers 1 to 10
`,
        solution_code: `for i in range(1, 11):
    print(i)
`,
        test_cases: [
          {
            input: "",
            expected_output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
          }
        ]
      },
      {
        step_no: 2,
        title: "Sum of Numbers",
        instruction: "Calculate the sum of numbers from 1 to 100 using a loop.",
        starter_code: `# TODO: Initialize sum variable
# TODO: Use a loop to calculate sum
# TODO: Print the result
`,
        solution_code: `total = 0
for i in range(1, 101):
    total += i
print(f"Sum: {total}")
`,
        test_cases: [
          {
            input: "",
            expected_output: "Sum: 5050"
          }
        ]
      }
    ]
  },
  {
    id: "exp-003",
    experiment_title: "Functions in Java",
    subject: "Java Programming",
    language: "java",
    total_steps: 2,
    description: "Understand how to create and use functions (methods) in Java. Learn about parameters, return types, and function calls.",
    pdfUrl: "https://www.orimi.com/pdf-test.pdf",
    videoUrl: "https://www.youtube.com/watch?v=vvanI8NRlSI",
    steps: [
      {
        step_no: 1,
        title: "Create a Simple Function",
        instruction: "Create a function that takes two numbers and returns their sum.",
        starter_code: `public class Main {
    // TODO: Create a function named 'add' that takes two integers and returns their sum
    
    public static void main(String[] args) {
        // TODO: Call the add function with 5 and 3
        // TODO: Print the result
    }
}
`,
        solution_code: `public class Main {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("Sum: " + result);
    }
}
`,
        test_cases: [
          {
            input: "",
            expected_output: "Sum: 8"
          }
        ]
      },
      {
        step_no: 2,
        title: "Function with Return Type",
        instruction: "Create a function that checks if a number is even.",
        starter_code: `public class Main {
    // TODO: Create a function named 'isEven' that takes an integer and returns boolean
    
    public static void main(String[] args) {
        // TODO: Test with number 10
        // TODO: Test with number 7
    }
}
`,
        solution_code: `public class Main {
    public static boolean isEven(int num) {
        return num % 2 == 0;
    }
    
    public static void main(String[] args) {
        System.out.println("10 is even: " + isEven(10));
        System.out.println("7 is even: " + isEven(7));
    }
}
`,
        test_cases: [
          {
            input: "",
            expected_output: "10 is even: true\n7 is even: false"
          }
        ]
      }
    ]
  }
];

export const subjects = [
  { id: "python-prog", name: "Python Programming", experimentCount: 2 },
  { id: "java-prog", name: "Java Programming", experimentCount: 1 },
  { id: "data-structures", name: "Data Structures", experimentCount: 0 },
  { id: "web-dev", name: "Web Development", experimentCount: 0 }
];
