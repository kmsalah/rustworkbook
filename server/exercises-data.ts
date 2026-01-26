import type { Exercise } from "@shared/schema";

export const exercises: Exercise[] = [
  // ============================================================
  // INTRO EXERCISES (2)
  // ============================================================
  {
    id: "intro1",
    name: "intro1",
    path: "exercises/intro/intro1.rs",
    topic: "intro",
    mode: "compile",
    hint: "Simply click the Run Code button to execute this program and see the output!",
    code: `// Welcome to Rust Workbook!
// Click the Run Code button above to compile and run this program.

fn main() {
    println!("Welcome to your Rust journey!");
}
`,
  },
  {
    id: "intro2",
    name: "intro2",
    path: "exercises/intro/intro2.rs",
    topic: "intro",
    mode: "compile",
    hint: "Look carefully at the macro name. The correct macro for printing a line is println! - check for any typos.",
    code: `// Fix the typo to make this program compile!

fn main() {
    prinltn!("Ready to learn Rust!");
}
`,
  },

  // ============================================================
  // VARIABLES EXERCISES (6)
  // ============================================================
  {
    id: "variables1",
    name: "variables1",
    path: "exercises/variables/variables1.rs",
    topic: "variables",
    mode: "compile",
    hint: "In Rust, you need the 'let' keyword to declare a variable binding.",
    code: `// Make this compile by adding the correct keyword to declare a variable.

fn main() {
    score = 100;
    println!("Your score is {}", score);
}
`,
  },
  {
    id: "variables2",
    name: "variables2",
    path: "exercises/variables/variables2.rs",
    topic: "variables",
    mode: "compile",
    hint: "Variables must be initialized before they can be used. Assign a value to the variable.",
    code: `// This program won't compile because the variable has no value.
// Give it a value to fix the error!

fn main() {
    let temperature;
    if temperature > 30 {
        println!("It's hot outside!");
    } else {
        println!("The weather is pleasant.");
    }
}
`,
  },
  {
    id: "variables3",
    name: "variables3",
    path: "exercises/variables/variables3.rs",
    topic: "variables",
    mode: "compile",
    hint: "By default, variables in Rust are immutable. Use the 'mut' keyword to make a variable mutable.",
    code: `// This code tries to change a variable, but Rust variables are immutable by default.
// Fix it so the reassignment works!

fn main() {
    let count = 1;
    println!("Count: {}", count);
    count = 2; // Don't change this line
    println!("Count: {}", count);
}
`,
  },
  {
    id: "variables4",
    name: "variables4",
    path: "exercises/variables/variables4.rs",
    topic: "variables",
    mode: "compile",
    hint: "You can 'shadow' a variable by using 'let' again with the same name. This creates a new variable.",
    code: `// This code has the same issue as the previous exercise.
// But this time, try fixing it using shadowing instead of mut!

fn main() {
    let level = 1;
    println!("Level: {}", level);
    level = 2;
    println!("Level: {}", level);
}
`,
  },
  {
    id: "variables5",
    name: "variables5",
    path: "exercises/variables/variables5.rs",
    topic: "variables",
    mode: "compile",
    hint: "Shadowing allows you to reuse a variable name with a different value and even a different type! Use 'let' to shadow the variable.",
    code: `// Shadowing lets you change the type of a variable.
// Fix this code so it compiles!

fn main() {
    let message = "HELLO";
    println!("Message: {}", message);
    message = message.len();
    println!("Message length: {}", message);
}
`,
  },
  {
    id: "variables6",
    name: "variables6",
    path: "exercises/variables/variables6.rs",
    topic: "variables",
    mode: "compile",
    hint: "Constants are declared with 'const' instead of 'let'. Constants must have a type annotation and are always immutable.",
    code: `// Declare this as a constant. Constants need the 'const' keyword
// and require an explicit type annotation.

MAX_HEALTH = 100;

fn main() {
    println!("Maximum health: {}", MAX_HEALTH);
}
`,
  },

  // ============================================================
  // FUNCTIONS EXERCISES (5)
  // ============================================================
  {
    id: "functions1",
    name: "functions1",
    path: "exercises/functions/functions1.rs",
    topic: "functions",
    mode: "compile",
    hint: "The main function is trying to call a function that doesn't exist. Define the missing function!",
    code: `// Define the missing function to make this compile!

fn main() {
    greet_user();
}
`,
  },
  {
    id: "functions2",
    name: "functions2",
    path: "exercises/functions/functions2.rs",
    topic: "functions",
    mode: "compile",
    hint: "Function parameters in Rust require type annotations. Specify the type of the parameter.",
    code: `// Add the missing type annotation to the function parameter.

fn main() {
    display_age(25);
}

fn display_age(age:) {
    println!("You are {} years old.", age);
}
`,
  },
  {
    id: "functions3",
    name: "functions3",
    path: "exercises/functions/functions3.rs",
    topic: "functions",
    mode: "compile",
    hint: "The function expects an argument, but it's being called without one. Pass a value when calling the function.",
    code: `// This function expects an argument - provide one!

fn main() {
    print_countdown();
}

fn print_countdown(seconds: u32) {
    for i in (1..=seconds).rev() {
        println!("{}...", i);
    }
    println!("Liftoff!");
}
`,
  },
  {
    id: "functions4",
    name: "functions4",
    path: "exercises/functions/functions4.rs",
    topic: "functions",
    mode: "compile",
    hint: "Functions that return a value need a return type annotation after the arrow (->).",
    code: `// Add the missing return type to the function signature.

fn main() {
    let total = calculate_total(50, 10);
    println!("Total with tax: {}", total);
}

fn calculate_total(price: i32, tax: i32) -> {
    price + tax
}
`,
  },
  {
    id: "functions5",
    name: "functions5",
    path: "exercises/functions/functions5.rs",
    topic: "functions",
    mode: "compile",
    hint: "In Rust, expressions return values but statements don't. A semicolon turns an expression into a statement. Remove the semicolon to return the value.",
    code: `// This function should return a value, but it's returning nothing.
// Hint: Look at the difference between expressions and statements.

fn main() {
    let doubled = double(7);
    println!("7 doubled is {}", doubled);
}

fn double(n: i32) -> i32 {
    n * 2;
}
`,
  },

  // ============================================================
  // IF EXERCISES (3)
  // ============================================================
  {
    id: "if1",
    name: "if1",
    path: "exercises/if/if1.rs",
    topic: "if",
    mode: "test",
    hint: "Use an if-else expression to compare the two values and return the larger one.",
    code: `// Complete the function to return the larger of two numbers.

pub fn maximum(a: i32, b: i32) -> i32 {
    // Return the larger number using an if expression
    a // Fix: should compare and return larger
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_is_larger() {
        assert_eq!(maximum(15, 8), 15);
    }

    #[test]
    fn second_is_larger() {
        assert_eq!(maximum(3, 12), 12);
    }

    #[test]
    fn equal_values() {
        assert_eq!(maximum(5, 5), 5);
    }
}
`,
  },
  {
    id: "if2",
    name: "if2",
    path: "exercises/if/if2.rs",
    topic: "if",
    mode: "test",
    hint: "The else branch returns the wrong message. Return the correct message for low scores.",
    code: `// Fix the else branch to return the correct message.

pub fn grade_message(score: u32) -> &'static str {
    if score >= 90 {
        "Excellent!"
    } else if score >= 70 {
        "Good job!"
    } else {
        "Good job!" // Fix: return correct message
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn excellent_score() {
        assert_eq!(grade_message(95), "Excellent!");
    }

    #[test]
    fn good_score() {
        assert_eq!(grade_message(75), "Good job!");
    }

    #[test]
    fn needs_improvement() {
        assert_eq!(grade_message(50), "Keep practicing!");
    }
}
`,
  },
  {
    id: "if3",
    name: "if3",
    path: "exercises/if/if3.rs",
    topic: "if",
    mode: "test",
    hint: "The weather advice function doesn't handle the cold weather case correctly. Check the category values and messages.",
    code: `// Fix the weather advice logic to return correct messages.

pub fn weather_advice(temp: i32) -> &'static str {
    let category = if temp > 30 {
        1
    } else if temp > 20 {
        2 // Fix: all branches should be same type
    } else if temp > 10 {
        3
    } else {
        4 // Fix: all branches should be same type
    };

    if category == 1 {
        "Stay hydrated!"
    } else if category == 2 {
        "Perfect weather!"
    } else if category == 3 {
        "Bring a jacket!"
    } else {
        "Bundle up!"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hot_weather() {
        assert_eq!(weather_advice(35), "Stay hydrated!");
    }

    #[test]
    fn nice_weather() {
        assert_eq!(weather_advice(25), "Perfect weather!");
    }

    #[test]
    fn cool_weather() {
        assert_eq!(weather_advice(15), "Bring a jacket!");
    }

    #[test]
    fn cold_weather() {
        assert_eq!(weather_advice(5), "Bundle up!");
    }
}
`,
  },

  // ============================================================
  // PRIMITIVE TYPES EXERCISES (6)
  // ============================================================
  {
    id: "primitive_types1",
    name: "primitive_types1",
    path: "exercises/primitive_types/primitive_types1.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "Declare a boolean variable using 'let'. Booleans can be either true or false.",
    code: `// Complete the variable declaration for is_raining.

fn main() {
    let is_sunny = true;
    if is_sunny {
        println!("Wear sunglasses!");
    }

    let // Finish this line to declare is_raining as a boolean
    if is_raining {
        println!("Bring an umbrella!");
    }
}
`,
  },
  {
    id: "primitive_types2",
    name: "primitive_types2",
    path: "exercises/primitive_types/primitive_types2.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "Characters in Rust use single quotes, not double quotes. Declare a char variable.",
    code: `// Declare a character variable. Remember: chars use single quotes!

fn main() {
    let first_letter = 'A';
    if first_letter.is_alphabetic() {
        println!("{} is a letter!", first_letter);
    }

    let // Declare your_initial as a character (use single quotes!)
    if your_initial.is_uppercase() {
        println!("{} is uppercase!", your_initial);
    } else {
        println!("{} is lowercase!", your_initial);
    }
}
`,
  },
  {
    id: "primitive_types3",
    name: "primitive_types3",
    path: "exercises/primitive_types/primitive_types3.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "You can create an array with repeated values using [value; count] syntax. For example, [0; 100] creates an array of 100 zeros.",
    code: `// Create an array with at least 100 elements.
// Hint: Use the [value; count] syntax to create a large array.

fn main() {
    let data = [0; 50]; // Fix this to have at least 100 elements

    if data.len() >= 100 {
        println!("That's a big array with {} elements!", data.len());
    } else {
        println!("Array needs at least 100 elements.");
    }
}
`,
  },
  {
    id: "primitive_types4",
    name: "primitive_types4",
    path: "exercises/primitive_types/primitive_types4.rs",
    topic: "primitive_types",
    mode: "test",
    hint: "Use slice syntax &array[start..end] to get a portion of the array. Remember, the end index is exclusive.",
    code: `// Create a slice containing elements [3, 4, 5] from the array.

#[test]
fn create_slice() {
    let numbers = [1, 2, 3, 4, 5, 6, 7];

    let middle_slice = &numbers[0..1]; // Fix the slice range to get [3, 4, 5]

    assert_eq!([3, 4, 5], middle_slice);
}
`,
  },
  {
    id: "primitive_types5",
    name: "primitive_types5",
    path: "exercises/primitive_types/primitive_types5.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "You can destructure a tuple using pattern matching: let (a, b) = tuple;",
    code: `// Destructure the tuple to extract the name and score.

fn main() {
    let player = ("Alice", 9500);
    let /* add pattern here */ = player;

    println!("{} scored {} points!", name, score);
}
`,
  },
  {
    id: "primitive_types6",
    name: "primitive_types6",
    path: "exercises/primitive_types/primitive_types6.rs",
    topic: "primitive_types",
    mode: "test",
    hint: "Access tuple elements using dot notation: tuple.0, tuple.1, tuple.2, etc.",
    code: `// Access the second element of the tuple.

#[test]
fn access_tuple_element() {
    let coordinates = (10, 25, 50);
    
    let y_value = coordinates.0; // Fix this to get the second element

    assert_eq!(25, y_value, "Should get the second element of the tuple");
}
`,
  },

  // ============================================================
  // VECS EXERCISES (2)
  // ============================================================
  {
    id: "vecs1",
    name: "vecs1",
    path: "exercises/vecs/vecs1.rs",
    topic: "vecs",
    mode: "test",
    hint: "Use the vec! macro to create a vector with initial values: vec![1, 2, 3]",
    code: `// Create a vector that contains the same elements as the array.

fn create_array_and_vec() -> ([i32; 4], Vec<i32>) {
    let arr = [5, 10, 15, 20];
    let v = vec![]; // Add the same values as the array

    (arr, v)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn array_and_vec_are_equal() {
        let (arr, v) = create_array_and_vec();
        assert_eq!(arr, v[..]);
    }
}
`,
  },
  {
    id: "vecs2",
    name: "vecs2",
    path: "exercises/vecs/vecs2.rs",
    topic: "vecs",
    mode: "test",
    hint: "Use *element to dereference and modify the value in iter_mut(), or use element * 3 in the map closure.",
    code: `// Complete both functions to triple each element in the vector.

fn triple_with_loop(mut v: Vec<i32>) -> Vec<i32> {
    for element in v.iter_mut() {
        // Multiply each element by 3
        *element = *element + 0; // Fix this line
    }
    v
}

fn triple_with_map(v: &Vec<i32>) -> Vec<i32> {
    v.iter().map(|element| {
        // Return the element multiplied by 3
        *element + 0 // Fix this expression
    }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_triple_with_loop() {
        let input = vec![2, 4, 6];
        assert_eq!(triple_with_loop(input), vec![6, 12, 18]);
    }

    #[test]
    fn test_triple_with_map() {
        let input = vec![1, 3, 5];
        assert_eq!(triple_with_map(&input), vec![3, 9, 15]);
    }
}
`,
  },

  // ============================================================
  // MOVE SEMANTICS EXERCISES (6)
  // ============================================================
  {
    id: "move_semantics1",
    name: "move_semantics1",
    path: "exercises/move_semantics/move_semantics1.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "The vector returned from build_inventory needs to be mutable so you can push to it.",
    code: `// Make the code compile by ensuring the returned vector can be modified.

fn main() {
    let items = Vec::new();
    let items = build_inventory(items);

    println!("Inventory has {} items: {:?}", items.len(), items);

    items.push("Map");
    println!("Added item. Now {} items: {:?}", items.len(), items);
}

fn build_inventory(vec: Vec<&str>) -> Vec<&str> {
    let mut vec = vec;
    vec.push("Sword");
    vec.push("Shield");
    vec.push("Potion");
    vec
}
`,
  },
  {
    id: "move_semantics2",
    name: "move_semantics2",
    path: "exercises/move_semantics/move_semantics2.rs",
    topic: "move_semantics",
    mode: "test",
    hint: "When you pass a value to a function, ownership moves. Use .clone() to create a copy if you need to use the original after.",
    code: `// Fix this so both assertions pass. The original vector should remain usable.

#[test]
fn main() {
    let colors = vec!["red", "green", "blue"];
    let extended = add_color(colors);

    assert_eq!(colors, vec!["red", "green", "blue"]);
    assert_eq!(extended, vec!["red", "green", "blue", "yellow"]);
}

fn add_color(mut vec: Vec<&str>) -> Vec<&str> {
    vec.push("yellow");
    vec
}
`,
  },
  {
    id: "move_semantics3",
    name: "move_semantics3",
    path: "exercises/move_semantics/move_semantics3.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "Instead of moving the vector, pass a mutable reference using &mut. The function can then modify the original.",
    code: `// Instead of moving the vector, pass a mutable reference.

fn main() {
    let mut tasks = vec!["Buy groceries", "Clean room"];

    add_task(tasks);

    println!("Tasks: {:?}", tasks);
}

fn add_task(vec: Vec<&str>) {
    vec.push("Exercise");
}
`,
  },
  {
    id: "move_semantics4",
    name: "move_semantics4",
    path: "exercises/move_semantics/move_semantics4.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "The function can create and return a new vector instead of taking one as a parameter.",
    code: `// Refactor so get_initial_scores creates and returns its own vector.

fn main() {
    let scores = get_initial_scores();
    println!("Starting scores: {:?}", scores);
}

fn get_initial_scores(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;
    vec.push(100);
    vec.push(95);
    vec.push(88);
    vec
}
`,
  },
  {
    id: "move_semantics5",
    name: "move_semantics5",
    path: "exercises/move_semantics/move_semantics5.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "You cannot have two mutable references to the same data at the same time. Restructure the code to avoid this.",
    code: `// Fix the borrowing issue - you can't have two mutable references at once.

fn main() {
    let mut data = 10;

    let ref1 = &mut data;
    let ref2 = &mut data;

    *ref1 += 5;
    *ref2 += 10;

    println!("Data: {}", data);
}
`,
  },
  {
    id: "move_semantics6",
    name: "move_semantics6",
    path: "exercises/move_semantics/move_semantics6.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "Strings are moved when assigned. Use .clone() or references to use a String multiple times.",
    code: `// Fix the ownership issues so the code compiles.

fn main() {
    let greeting = String::from("Hello");

    let message1 = append_world(greeting);
    let message2 = append_world(greeting);

    println!("{}", message1);
    println!("{}", message2);
}

fn append_world(s: String) -> String {
    s + " World!"
}
`,
  },

  // ============================================================
  // STRUCTS EXERCISES (3)
  // ============================================================
  {
    id: "structs1",
    name: "structs1",
    path: "exercises/structs/structs1.rs",
    topic: "structs",
    mode: "test",
    hint: "Instantiate the struct by providing values for all fields using StructName { field1: value1, field2: value2 }.",
    code: `// Complete the struct instantiation.

struct Book {
    title: String,
    author: String,
    pages: u32,
    available: bool,
}

fn create_book() -> Book {
    // Create and return a Book instance
    Book {
        title: String::new(), // Fix: add a proper title
        author: String::new(), // Fix: add a proper author
        pages: 0, // Fix: set proper page count
        available: true,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn book_has_title() {
        let book = create_book();
        assert!(!book.title.is_empty());
    }

    #[test]
    fn book_has_author() {
        let book = create_book();
        assert!(!book.author.is_empty());
    }

    #[test]
    fn book_has_pages() {
        let book = create_book();
        assert!(book.pages > 0);
    }
}
`,
  },
  {
    id: "structs2",
    name: "structs2",
    path: "exercises/structs/structs2.rs",
    topic: "structs",
    mode: "test",
    hint: "Use struct update syntax: StructName { field: new_value, ..existing_instance }",
    code: `// Use struct update syntax to create a new book based on an existing one.

#[derive(Debug)]
struct Book {
    title: String,
    author: String,
    pages: u32,
    year: u32,
}

fn create_sequel(original: &Book) -> Book {
    // Create a sequel with a new title but same author
    // Use struct update syntax
    Book {
        title: original.title.clone(), // Fix: should be different title
        author: original.author.clone(),
        pages: original.pages,
        year: original.year,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sequel_has_different_title() {
        let original = Book {
            title: String::from("The Adventure"),
            author: String::from("Jane Doe"),
            pages: 300,
            year: 2020,
        };
        let sequel = create_sequel(&original);
        assert_ne!(sequel.title, original.title);
    }

    #[test]
    fn sequel_has_same_author() {
        let original = Book {
            title: String::from("The Adventure"),
            author: String::from("Jane Doe"),
            pages: 300,
            year: 2020,
        };
        let sequel = create_sequel(&original);
        assert_eq!(sequel.author, original.author);
    }
}
`,
  },
  {
    id: "structs3",
    name: "structs3",
    path: "exercises/structs/structs3.rs",
    topic: "structs",
    mode: "test",
    hint: "Implement the methods by filling in the return types and method bodies. Methods take &self to borrow the instance.",
    code: `// Implement the methods for the Rectangle struct.

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }

    fn area(&self) -> u32 {
        // Return the area (width * height)
        todo!()
    }

    fn is_square(&self) -> bool {
        // Return true if width equals height
        todo!()
    }

    fn can_contain(&self, other: &Rectangle) -> bool {
        // Return true if self can fully contain other
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_area() {
        let rect = Rectangle::new(10, 5);
        assert_eq!(rect.area(), 50);
    }

    #[test]
    fn test_is_square() {
        let square = Rectangle::new(5, 5);
        let rect = Rectangle::new(5, 10);
        assert!(square.is_square());
        assert!(!rect.is_square());
    }

    #[test]
    fn test_can_contain() {
        let outer = Rectangle::new(10, 10);
        let inner = Rectangle::new(5, 5);
        assert!(outer.can_contain(&inner));
        assert!(!inner.can_contain(&outer));
    }
}
`,
  },

  // ============================================================
  // ENUMS EXERCISES (3)
  // ============================================================
  {
    id: "enums1",
    name: "enums1",
    path: "exercises/enums/enums1.rs",
    topic: "enums",
    mode: "compile",
    hint: "Define the enum variants inside the curly braces. Each variant is just a name.",
    code: `// Define the variants for the Status enum.

#[derive(Debug)]
enum Status {
    // Define these variants: Pending, InProgress, Completed, Cancelled
}

fn main() {
    println!("{:?}", Status::Pending);
    println!("{:?}", Status::InProgress);
    println!("{:?}", Status::Completed);
    println!("{:?}", Status::Cancelled);
}
`,
  },
  {
    id: "enums2",
    name: "enums2",
    path: "exercises/enums/enums2.rs",
    topic: "enums",
    mode: "compile",
    hint: "Enum variants can hold data: Unit variants, tuple variants like Color(u8, u8, u8), or struct variants like Move { x: i32, y: i32 }.",
    code: `// Define enum variants that can hold different types of data.

#[derive(Debug)]
enum Command {
    // Define:
    // - Quit (no data)
    // - Say (holds a String)
    // - Move (holds x and y as i32)
    // - SetColor (holds three u8 values)
}

impl Command {
    fn describe(&self) {
        println!("{:?}", self);
    }
}

fn main() {
    let commands = [
        Command::Move { x: 10, y: 20 },
        Command::Say(String::from("Hello!")),
        Command::SetColor(255, 128, 0),
        Command::Quit,
    ];

    for cmd in &commands {
        cmd.describe();
    }
}
`,
  },
  {
    id: "enums3",
    name: "enums3",
    path: "exercises/enums/enums3.rs",
    topic: "enums",
    mode: "test",
    hint: "Use a match expression to handle each variant. Destructure the data from each variant in the match arms.",
    code: `// Implement the process method using match.

enum Action {
    Jump(u32),
    Run(i32, i32),
    Attack(String),
    Rest,
}

struct Player {
    x: i32,
    y: i32,
    height: u32,
    health: u32,
    target: String,
}

impl Player {
    fn new() -> Player {
        Player { x: 0, y: 0, height: 0, health: 100, target: String::new() }
    }

    fn jump(&mut self, height: u32) {
        self.height = height;
    }

    fn run(&mut self, dx: i32, dy: i32) {
        self.x += dx;
        self.y += dy;
    }

    fn attack(&mut self, target: String) {
        self.target = target;
    }

    fn rest(&mut self) {
        self.health = 100;
    }

    fn process(&mut self, action: Action) {
        // Use match to handle each Action variant
        // Call the appropriate method for each action
        match action {
            Action::Jump(h) => self.height = 0, // Fix: use the height parameter
            Action::Run(dx, dy) => { /* Fix: call self.run */ }
            Action::Attack(t) => { /* Fix: call self.attack */ }
            Action::Rest => { /* Fix: call self.rest */ }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_player_actions() {
        let mut player = Player::new();
        
        player.process(Action::Jump(50));
        player.process(Action::Run(10, 5));
        player.process(Action::Attack(String::from("Dragon")));
        player.health = 50;
        player.process(Action::Rest);

        assert_eq!(player.height, 50);
        assert_eq!(player.x, 10);
        assert_eq!(player.y, 5);
        assert_eq!(player.target, "Dragon");
        assert_eq!(player.health, 100);
    }
}
`,
  },

  // ============================================================
  // STRINGS EXERCISES (4)
  // ============================================================
  {
    id: "strings1",
    name: "strings1",
    path: "exercises/strings/strings1.rs",
    topic: "strings",
    mode: "compile",
    hint: "String::from() or .to_string() converts a string slice (&str) to an owned String.",
    code: `// Make the function return a String instead of a string slice.

fn main() {
    let status = current_status();
    println!("Status: {}", status);
}

fn current_status() -> String {
    "Active"
}
`,
  },
  {
    id: "strings2",
    name: "strings2",
    path: "exercises/strings/strings2.rs",
    topic: "strings",
    mode: "compile",
    hint: "Use String::from() or the .to_string() method to convert the string literal to a String type.",
    code: `// Fix the type mismatch by converting the string literal to String.

fn main() {
    let mut greeting = String::from("Hello, ");
    let name = "World";
    
    append_name(&mut greeting, name);
    println!("{}", greeting);
}

fn append_name(base: &mut String, addition: &str) {
    base.push_str(addition);
}
`,
  },
  {
    id: "strings3",
    name: "strings3",
    path: "exercises/strings/strings3.rs",
    topic: "strings",
    mode: "compile",
    hint: "String concatenation with + takes ownership of the first String. Consider using format! macro or clone.",
    code: `// Fix the ownership issue when concatenating strings.

fn main() {
    let first = String::from("Hello");
    let second = String::from("World");

    let combined = first + " " + &second;
    
    println!("Combined: {}", combined);
    println!("First was: {}", first);
    println!("Second was: {}", second);
}
`,
  },
  {
    id: "strings4",
    name: "strings4",
    path: "exercises/strings/strings4.rs",
    topic: "strings",
    mode: "compile",
    hint: "Use .replace(), .trim(), .to_uppercase(), or .to_lowercase() to transform strings.",
    code: `// Use string methods to transform the input.

fn main() {
    let messy = "   hElLo WoRLd   ";
    
    let cleaned = trim_and_lowercase(messy);
    println!("Cleaned: '{}'", cleaned);
    
    let replaced = replace_spaces("hello world", "-");
    println!("Replaced: {}", replaced);
}

fn trim_and_lowercase(s: &str) -> String {
    // Remove leading/trailing whitespace and convert to lowercase
}

fn replace_spaces(s: &str, replacement: &str) -> String {
    // Replace all spaces with the replacement string
}
`,
  },

  // ============================================================
  // MODULES EXERCISES (3)
  // ============================================================
  {
    id: "modules1",
    name: "modules1",
    path: "exercises/modules/modules1.rs",
    topic: "modules",
    mode: "compile",
    hint: "Functions in modules are private by default. Use 'pub' to make them accessible from outside the module.",
    code: `// Make the necessary function public.

mod bakery {
    fn secret_recipe() -> String {
        String::from("Special yeast")
    }

    fn make_bread() {
        secret_recipe();
        println!("Fresh bread ready!");
    }
}

fn main() {
    bakery::make_bread();
}
`,
  },
  {
    id: "modules2",
    name: "modules2",
    path: "exercises/modules/modules2.rs",
    topic: "modules",
    mode: "compile",
    hint: "Use 'pub use' to re-export items from submodules, making them accessible through the parent module.",
    code: `// Fix the use statements to properly re-export the constants.

mod menu {
    pub use self::drinks::COFFEE as drink; // Fix the alias name
    pub use self::food::SANDWICH as food; // Fix the alias and add semicolon

    mod drinks {
        pub const COFFEE: &str = "Espresso";
        pub const TEA: &str = "Green Tea";
    }

    mod food {
        pub const SANDWICH: &str = "Club Sandwich";
        pub const SALAD: &str = "Caesar Salad";
    }
}

fn main() {
    println!("Today's specials: {} and {}", 
        menu::drink,
        menu::food
    );
}
`,
  },
  {
    id: "modules3",
    name: "modules3",
    path: "exercises/modules/modules3.rs",
    topic: "modules",
    mode: "compile",
    hint: "Use the 'use' keyword to bring items from std::collections into scope.",
    code: `// Bring HashMap from the standard library into scope.

// Complete this use statement
use std::vec::Vec; // Fix this to import HashMap

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Alice", 100);
    scores.insert("Bob", 95);

    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }
}
`,
  },

  // ============================================================
  // HASHMAPS EXERCISES (3)
  // ============================================================
  {
    id: "hashmaps1",
    name: "hashmaps1",
    path: "exercises/hashmaps/hashmaps1.rs",
    topic: "hashmaps",
    mode: "test",
    hint: "Create a HashMap with HashMap::new() and add items with .insert(key, value).",
    code: `// Create a shopping cart with at least 3 items.

use std::collections::HashMap;

fn shopping_cart() -> HashMap<String, u32> {
    let mut cart = HashMap::new();

    cart.insert(String::from("apples"), 3);

    // Fix: Add at least 2 more items to pass tests

    cart
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn has_at_least_three_items() {
        let cart = shopping_cart();
        assert!(cart.len() >= 3);
    }

    #[test]
    fn total_quantity_at_least_five() {
        let cart = shopping_cart();
        assert!(cart.values().sum::<u32>() >= 5);
    }
}
`,
  },
  {
    id: "hashmaps2",
    name: "hashmaps2",
    path: "exercises/hashmaps/hashmaps2.rs",
    topic: "hashmaps",
    mode: "test",
    hint: "Use .entry().or_insert() to insert a value only if the key doesn't exist.",
    code: `// Count the frequency of each word in the list.

use std::collections::HashMap;

fn word_count(words: &[&str]) -> HashMap<String, u32> {
    let mut counts = HashMap::new();

    for word in words {
        // Use entry API to count occurrences
        let count = counts.entry(word.to_string()).or_insert(0);
        // Fix: increment the count properly (currently does nothing)
    }

    counts
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn count_words() {
        let words = ["hello", "world", "hello", "rust", "hello"];
        let counts = word_count(&words);
        
        assert_eq!(counts.get("hello"), Some(&3));
        assert_eq!(counts.get("world"), Some(&1));
        assert_eq!(counts.get("rust"), Some(&1));
    }
}
`,
  },
  {
    id: "hashmaps3",
    name: "hashmaps3",
    path: "exercises/hashmaps/hashmaps3.rs",
    topic: "hashmaps",
    mode: "test",
    hint: "Use .entry().or_insert() to get a mutable reference, then modify the value.",
    code: `// Build a score tracker that updates existing scores.

use std::collections::HashMap;

#[derive(Default)]
struct ScoreTracker {
    scores: HashMap<String, u32>,
}

impl ScoreTracker {
    fn new() -> Self {
        ScoreTracker { scores: HashMap::new() }
    }

    fn add_score(&mut self, player: &str, points: u32) {
        // Add points to the player's existing score, or start at 0
        let score = self.scores.entry(player.to_string()).or_insert(0);
        // Fix this to add points to the score
    }

    fn get_score(&self, player: &str) -> u32 {
        *self.scores.get(player).unwrap_or(&0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn track_scores() {
        let mut tracker = ScoreTracker::new();
        
        tracker.add_score("Alice", 50);
        tracker.add_score("Bob", 30);
        tracker.add_score("Alice", 25);

        assert_eq!(tracker.get_score("Alice"), 75);
        assert_eq!(tracker.get_score("Bob"), 30);
        assert_eq!(tracker.get_score("Charlie"), 0);
    }
}
`,
  },

  // ============================================================
  // OPTIONS EXERCISES (3)
  // ============================================================
  {
    id: "options1",
    name: "options1",
    path: "exercises/options/options1.rs",
    topic: "options",
    mode: "compile",
    hint: "Use 'if let Some(value) = option' to handle the Some case while ignoring None.",
    code: `// Use if let to extract the value from the Option.

fn main() {
    let username = "rustacean";
    let maybe_user = Some(username);

    // Fix this if let statement - missing 'if let Some(...)'
    if let word = maybe_user {
        println!("Welcome, {}!", word);
    }
}
`,
  },
  {
    id: "options2",
    name: "options2",
    path: "exercises/options/options2.rs",
    topic: "options",
    mode: "test",
    hint: "Use pattern matching or methods like .map() and .unwrap_or() to transform Option values.",
    code: `// Implement functions that work with Option types.

fn double_if_some(value: Option<i32>) -> Option<i32> {
    // Return Some(doubled) if value is Some, None otherwise
    value.map(|v| v + 1) // Fix: should double, not add 1
}

fn value_or_default(value: Option<i32>, default: i32) -> i32 {
    // Return the value if Some, otherwise return the default
    value.unwrap_or(0) // Fix: should use the default parameter
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_double_some() {
        assert_eq!(double_if_some(Some(5)), Some(10));
    }

    #[test]
    fn test_double_none() {
        assert_eq!(double_if_some(None), None);
    }

    #[test]
    fn test_value_present() {
        assert_eq!(value_or_default(Some(42), 0), 42);
    }

    #[test]
    fn test_value_missing() {
        assert_eq!(value_or_default(None, 100), 100);
    }
}
`,
  },
  {
    id: "options3",
    name: "options3",
    path: "exercises/options/options3.rs",
    topic: "options",
    mode: "compile",
    hint: "Use match or if let to handle both Some and None cases appropriately.",
    code: `// Fix the function to properly handle the Option.

struct Config {
    debug_mode: bool,
    max_connections: u32,
}

fn get_config(maybe_config: Option<Config>) -> String {
    // Return a description based on the config
    // If None, return "Using default configuration"
    // If Some, return "Debug: {}, Max Connections: {}"
    
    let description = match maybe_config {
        // Handle both cases
    };
    
    description
}

fn main() {
    let config = Some(Config { debug_mode: true, max_connections: 100 });
    println!("{}", get_config(config));
    
    let no_config: Option<Config> = None;
    println!("{}", get_config(no_config));
}
`,
  },

  // ============================================================
  // ERROR HANDLING EXERCISES (6)
  // ============================================================
  {
    id: "errors1",
    name: "errors1",
    path: "exercises/error_handling/errors1.rs",
    topic: "error_handling",
    mode: "test",
    hint: "Change the return type from Option to Result. Use Ok() for success and Err() for failure.",
    code: `// Change this function to return a Result with an error message.

pub fn create_greeting(name: String) -> Option<String> {
    if name.is_empty() {
        None
    } else {
        Some(format!("Hello, {}!", name))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_greeting() {
        assert_eq!(
            create_greeting("Alice".into()),
            Ok("Hello, Alice!".into())
        );
    }

    #[test]
    fn returns_error_for_empty() {
        assert_eq!(
            create_greeting("".into()).unwrap_err(),
            "Name cannot be empty".to_string()
        );
    }
}
`,
  },
  {
    id: "errors2",
    name: "errors2",
    path: "exercises/error_handling/errors2.rs",
    topic: "error_handling",
    mode: "test",
    hint: "Handle the potential parse error from the string. Consider what happens if the input isn't a valid number.",
    code: `// Handle the parsing error properly.

fn parse_and_double(input: &str) -> Result<i32, String> {
    // Parse the input string and return double the value
    // Return an error message if parsing fails
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_number() {
        assert_eq!(parse_and_double("21"), Ok(42));
    }

    #[test]
    fn invalid_number() {
        assert!(parse_and_double("not a number").is_err());
    }
}
`,
  },
  {
    id: "errors3",
    name: "errors3",
    path: "exercises/error_handling/errors3.rs",
    topic: "error_handling",
    mode: "compile",
    hint: "The main function can return Result<(), Box<dyn std::error::Error>> to propagate errors.",
    code: `// Make main return a Result so we can use the ? operator.

use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    s.parse::<i32>()
}

fn main() {
    let number = parse_number("42")?;
    println!("Parsed number: {}", number);
    
    let invalid = parse_number("abc")?;
    println!("This won't print: {}", invalid);
}
`,
  },
  {
    id: "errors4",
    name: "errors4",
    path: "exercises/error_handling/errors4.rs",
    topic: "error_handling",
    mode: "test",
    hint: "Use map_err() to convert one error type to another, or use the ? operator with a compatible error type.",
    code: `// Create a custom error type and convert other errors into it.

#[derive(Debug, PartialEq)]
enum ValidationError {
    EmptyInput,
    InvalidNumber(String),
    OutOfRange(i32),
}

fn validate_age(input: &str) -> Result<u8, ValidationError> {
    // Return errors for:
    // - Empty input -> EmptyInput
    // - Non-numeric input -> InvalidNumber
    // - Number < 0 or > 150 -> OutOfRange
    // - Otherwise return the age as u8
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_age() {
        assert_eq!(validate_age("25"), Ok(25));
    }

    #[test]
    fn empty_input() {
        assert_eq!(validate_age(""), Err(ValidationError::EmptyInput));
    }

    #[test]
    fn invalid_number() {
        assert!(matches!(validate_age("abc"), Err(ValidationError::InvalidNumber(_))));
    }

    #[test]
    fn out_of_range() {
        assert!(matches!(validate_age("200"), Err(ValidationError::OutOfRange(_))));
    }
}
`,
  },
  {
    id: "errors5",
    name: "errors5",
    path: "exercises/error_handling/errors5.rs",
    topic: "error_handling",
    mode: "compile",
    hint: "Use Box<dyn std::error::Error> as the error type to handle multiple error types.",
    code: `// Handle multiple error types with a boxed error trait object.

use std::error::Error;
use std::num::ParseIntError;

fn read_and_parse(input: &str) -> Result<i32, Box<dyn Error>> {
    // This function might fail in different ways
    if input.is_empty() {
        // Return an error for empty input
        return Err("Input cannot be empty".into());
    }
    
    let number: i32 = input.parse()?;
    Ok(number * 2)
}

fn main() -> Result<(), Box<dyn Error>> {
    let result = read_and_parse("42")?;
    println!("Result: {}", result);
    Ok(())
}
`,
  },
  {
    id: "errors6",
    name: "errors6",
    path: "exercises/error_handling/errors6.rs",
    topic: "error_handling",
    mode: "test",
    hint: "Implement the std::error::Error trait for your custom error type, along with Display and Debug.",
    code: `// Create a proper custom error type that implements Error.

use std::fmt;
use std::error::Error;

#[derive(Debug)]
struct DivisionError {
    dividend: i32,
    divisor: i32,
}

// Implement Display for DivisionError
impl fmt::Display for DivisionError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Write: "Cannot divide {} by {}"
        write!(f, "Cannot divide {} by {}", 0, 0) // Fix the values
    }
}

// Implement Error for DivisionError
impl Error for DivisionError {}

fn divide(a: i32, b: i32) -> Result<i32, DivisionError> {
    if b == 0 {
        Err(DivisionError { dividend: a, divisor: b })
    } else {
        Ok(a / b)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn successful_division() {
        assert_eq!(divide(10, 2), Ok(5));
    }

    #[test]
    fn division_by_zero() {
        let err = divide(10, 0).unwrap_err();
        assert_eq!(err.to_string(), "Cannot divide 10 by 0");
    }
}
`,
  },

  // ============================================================
  // GENERICS EXERCISES (3)
  // ============================================================
  {
    id: "generics1",
    name: "generics1",
    path: "exercises/generics/generics1.rs",
    topic: "generics",
    mode: "compile",
    hint: "Use a type parameter like <T> to make the function work with any type.",
    code: `// Make this function generic so it works with any type.

fn first_element(list: &[i32]) -> &i32 {
    &list[0]
}

fn main() {
    let numbers = [1, 2, 3, 4, 5];
    let strings = ["hello", "world"];
    
    println!("First number: {}", first_element(&numbers));
    println!("First string: {}", first_element(&strings));
}
`,
  },
  {
    id: "generics2",
    name: "generics2",
    path: "exercises/generics/generics2.rs",
    topic: "generics",
    mode: "test",
    hint: "Add type parameters to the struct definition and implement methods that work with any type.",
    code: `// Make the Wrapper struct generic.

struct Wrapper {
    value: u32,
}

impl Wrapper {
    fn new(value: u32) -> Self {
        Wrapper { value }
    }

    fn get(&self) -> &u32 {
        &self.value
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stores_number() {
        let w = Wrapper::new(42);
        assert_eq!(*w.get(), 42);
    }

    #[test]
    fn stores_string() {
        let w = Wrapper::new(String::from("hello"));
        assert_eq!(*w.get(), "hello");
    }

    #[test]
    fn stores_vector() {
        let w = Wrapper::new(vec![1, 2, 3]);
        assert_eq!(*w.get(), vec![1, 2, 3]);
    }
}
`,
  },
  {
    id: "generics3",
    name: "generics3",
    path: "exercises/generics/generics3.rs",
    topic: "generics",
    mode: "test",
    hint: "Use trait bounds with the syntax fn name<T: TraitName>(param: T) to constrain what types can be used.",
    code: `// Add the necessary trait bounds to make the function work.

use std::fmt::Display;

fn print_largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    println!("The largest is {}", largest);
    largest
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn largest_number() {
        let numbers = [3, 7, 2, 9, 5];
        assert_eq!(*print_largest(&numbers), 9);
    }

    #[test]
    fn largest_char() {
        let chars = ['a', 'z', 'm', 'b'];
        assert_eq!(*print_largest(&chars), 'z');
    }
}
`,
  },

  // ============================================================
  // TRAITS EXERCISES (5)
  // ============================================================
  {
    id: "traits1",
    name: "traits1",
    path: "exercises/traits/traits1.rs",
    topic: "traits",
    mode: "test",
    hint: "Implement the trait method to append \"!!!\" to the string.",
    code: `// Implement the trait for String.

trait AddExcitement {
    fn add_excitement(self) -> Self;
}

impl AddExcitement for String {
    fn add_excitement(self) -> Self {
        // Append "!!!" to the string
        todo!()
    }
}

fn main() {
    let boring = String::from("Hello");
    let exciting = boring.add_excitement();
    println!("{}", exciting);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_excitement() {
        assert_eq!(String::from("Wow").add_excitement(), String::from("Wow!!!"));
    }

    #[test]
    fn chains_excitement() {
        assert_eq!(
            String::from("Hi").add_excitement().add_excitement(),
            String::from("Hi!!!!!!")
        );
    }
}
`,
  },
  {
    id: "traits2",
    name: "traits2",
    path: "exercises/traits/traits2.rs",
    topic: "traits",
    mode: "test",
    hint: "Implement the trait for a different type (Vec<T>) using the same pattern.",
    code: `// Implement the trait for Vec<T>.

trait AddExcitement {
    fn add_excitement(self) -> Self;
}

impl AddExcitement for String {
    fn add_excitement(self) -> Self {
        self + "!!!"
    }
}

// Implement AddExcitement for Vec<T> to add the element 42 to the end
impl AddExcitement for Vec<i32> {
    fn add_excitement(self) -> Self {
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn string_excitement() {
        assert_eq!(String::from("Hi").add_excitement(), "Hi!!!");
    }

    #[test]
    fn vec_excitement() {
        assert_eq!(vec![1, 2, 3].add_excitement(), vec![1, 2, 3, 42]);
    }
}
`,
  },
  {
    id: "traits3",
    name: "traits3",
    path: "exercises/traits/traits3.rs",
    topic: "traits",
    mode: "compile",
    hint: "Traits can have default implementations. Just provide a function body in the trait definition.",
    code: `// Add a default implementation for the trait method.

pub trait Describable {
    fn describe(&self) -> String;
    
    fn detailed_description(&self) -> String {
        // Provide a default that uses describe()
    }
}

struct Product {
    name: String,
    price: f64,
}

impl Describable for Product {
    fn describe(&self) -> String {
        format!("{}", self.name)
    }
}

fn main() {
    let item = Product { name: String::from("Widget"), price: 9.99 };
    println!("Short: {}", item.describe());
    println!("Detailed: {}", item.detailed_description());
}
`,
  },
  {
    id: "traits4",
    name: "traits4",
    path: "exercises/traits/traits4.rs",
    topic: "traits",
    mode: "test",
    hint: "Use 'impl Trait' syntax or trait bounds to accept any type that implements the trait.",
    code: `// Make the function accept any type that implements the trait.

pub trait Printable {
    fn format(&self) -> String;
}

struct Number(i32);
struct Text(String);

impl Printable for Number {
    fn format(&self) -> String {
        format!("Number: {}", self.0)
    }
}

impl Printable for Text {
    fn format(&self) -> String {
        format!("Text: {}", self.0)
    }
}

// Fix this function to accept any Printable type
fn print_it(item: impl Printable) {
    println!("{}", item.format());
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn prints_number() {
        print_it(Number(42));
    }

    #[test]
    fn prints_text() {
        print_it(Text(String::from("hello")));
    }
}
`,
  },
  {
    id: "traits5",
    name: "traits5",
    path: "exercises/traits/traits5.rs",
    topic: "traits",
    mode: "test",
    hint: "Multiple trait bounds can be combined with + syntax: fn name<T: Trait1 + Trait2>(param: T)",
    code: `// Combine multiple trait bounds.

use std::fmt::{Debug, Display};

fn debug_and_display<T: Debug>(item: T) {
    println!("Debug: {:?}", item);
    println!("Display: {}", item); // Fix: need Display bound too
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn works_with_numbers() {
        debug_and_display(42);
    }

    #[test]
    fn works_with_strings() {
        debug_and_display("hello");
    }
}
`,
  },

  // ============================================================
  // LIFETIMES EXERCISES (3)
  // ============================================================
  {
    id: "lifetimes1",
    name: "lifetimes1",
    path: "exercises/lifetimes/lifetimes1.rs",
    topic: "lifetimes",
    mode: "compile",
    hint: "Add lifetime annotations to show the compiler how the input and output references are related.",
    code: `// Add lifetime annotations to fix the compilation error.

fn get_longer(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let short = String::from("Hi");
    let long = "Hello there";

    let result = get_longer(&short, long);
    println!("Longer string: {}", result);
}
`,
  },
  {
    id: "lifetimes2",
    name: "lifetimes2",
    path: "exercises/lifetimes/lifetimes2.rs",
    topic: "lifetimes",
    mode: "compile",
    hint: "Structs that hold references need lifetime annotations to ensure the references remain valid.",
    code: `// Add lifetime annotations to the struct.

struct TextHolder {
    content: &str,
}

impl TextHolder {
    fn new(text: &str) -> TextHolder {
        TextHolder { content: text }
    }

    fn content(&self) -> &str {
        self.content
    }
}

fn main() {
    let text = String::from("Hello, world!");
    let holder = TextHolder::new(&text);
    println!("Held text: {}", holder.content());
}
`,
  },
  {
    id: "lifetimes3",
    name: "lifetimes3",
    path: "exercises/lifetimes/lifetimes3.rs",
    topic: "lifetimes",
    mode: "compile",
    hint: "When a struct has multiple references, they might need different lifetime parameters.",
    code: `// Fix the lifetime annotations so this compiles.

struct Pair<'a> {
    first: &'a str,
    second: &'a str,
}

fn main() {
    let word1 = String::from("Hello");
    let result;
    
    {
        let word2 = String::from("World");
        let pair = Pair { first: &word1, second: &word2 };
        result = pair.first;
    }
    
    println!("Result: {}", result);
}
`,
  },

  // ============================================================
  // TESTS EXERCISES (4)
  // ============================================================
  {
    id: "tests1",
    name: "tests1",
    path: "exercises/tests/tests1.rs",
    topic: "tests",
    mode: "test",
    hint: "The assert! macro expects a boolean value - pass true to make the test pass.",
    code: `// Make the test pass!

#[cfg(test)]
mod tests {
    #[test]
    fn simple_assertion() {
        assert!();
    }
}
`,
  },
  {
    id: "tests2",
    name: "tests2",
    path: "exercises/tests/tests2.rs",
    topic: "tests",
    mode: "test",
    hint: "Use assert_eq! to check that two values are equal.",
    code: `// Complete the test to verify the add function works correctly.

fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_positive_numbers() {
        assert_eq!(0, add(2, 3)); // Fix the expected value
    }

    #[test]
    fn add_negative_numbers() {
        assert_eq!(0, add(-5, -3)); // Fix the expected value
    }
}
`,
  },
  {
    id: "tests3",
    name: "tests3",
    path: "exercises/tests/tests3.rs",
    topic: "tests",
    mode: "test",
    hint: "Use the #[should_panic] attribute to test that a function panics.",
    code: `// Write a test that expects a panic.

fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Cannot divide by zero!");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn divides_correctly() {
        assert_eq!(divide(10, 2), 5);
    }

    // Add the correct attribute to make this test pass
    #[test]
    fn panics_on_zero() {
        divide(10, 0);
    }
}
`,
  },
  {
    id: "tests4",
    name: "tests4",
    path: "exercises/tests/tests4.rs",
    topic: "tests",
    mode: "test",
    hint: "Use Result<(), String> as the test return type and return Ok(()) for success or Err(...) for failure.",
    code: `// Write a test that returns a Result.

fn parse_positive(s: &str) -> Result<u32, String> {
    match s.parse::<u32>() {
        Ok(n) => Ok(n),
        Err(_) => Err(format!("'{}' is not a positive number", s)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // Convert this to use Result instead of assert!
    #[test]
    fn parses_valid_number() -> Result<(), String> {
        let result = parse_positive("42")?;
        assert_eq!(result, 42);
        Ok(())
    }
}
`,
  },

  // ============================================================
  // ITERATORS EXERCISES (5)
  // ============================================================
  {
    id: "iterators1",
    name: "iterators1",
    path: "exercises/iterators/iterators1.rs",
    topic: "iterators",
    mode: "compile",
    hint: "Use .iter() to create an iterator, and .next() returns Some(value) or None.",
    code: `// Complete the iterator operations.

fn main() {
    let colors = vec!["red", "green", "blue", "yellow", "purple"];

    let mut color_iter = colors.iter();   // Iterator created!

    assert_eq!(color_iter.next(), Some(&"red"));
    assert_eq!(color_iter.next(), Some(&"red"));     // Fix this value
    assert_eq!(color_iter.next(), Some(&"blue"));
    assert_eq!(color_iter.next(), Some(&"blue"));     // Fix this value
    assert_eq!(color_iter.next(), Some(&"purple"));
    assert_eq!(color_iter.next(), Some(&"purple"));     // Fix: what comes after the last?
}
`,
  },
  {
    id: "iterators2",
    name: "iterators2",
    path: "exercises/iterators/iterators2.rs",
    topic: "iterators",
    mode: "test",
    hint: "Use .map() to transform each element and .collect() to gather results into a collection.",
    code: `// Use iterator methods to transform the data.

fn uppercase_all(input: &[&str]) -> Vec<String> {
    // Convert each string to uppercase using iterator methods
    input.iter().map(|s| s.to_string()).collect() // Fix to uppercase
}

fn sum_positives(numbers: &[i32]) -> i32 {
    // Sum only the positive numbers using filter and sum
    numbers.iter().sum() // Fix to filter positives first
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn uppercases_strings() {
        let input = ["hello", "world"];
        assert_eq!(uppercase_all(&input), vec!["HELLO", "WORLD"]);
    }

    #[test]
    fn sums_positives() {
        let numbers = [1, -2, 3, -4, 5];
        assert_eq!(sum_positives(&numbers), 9);
    }
}
`,
  },
  {
    id: "iterators3",
    name: "iterators3",
    path: "exercises/iterators/iterators3.rs",
    topic: "iterators",
    mode: "test",
    hint: "Use .fold() to accumulate a result, or chain multiple iterator methods together.",
    code: `// Use fold to process the iterator.

fn factorial(n: u64) -> u64 {
    // Calculate factorial using fold: 1 * 2 * 3 * ... * n
    (1..=n).fold(1, |acc, x| acc + x) // Fix the operation
}

fn concatenate(words: &[&str]) -> String {
    // Join words with spaces using fold
    words.iter().fold(String::new(), |acc, w| acc + w) // Fix to add spaces
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calculates_factorial() {
        assert_eq!(factorial(5), 120);
        assert_eq!(factorial(1), 1);
        assert_eq!(factorial(0), 1);
    }

    #[test]
    fn concatenates_words() {
        assert_eq!(concatenate(&["Hello", "World"]), "Hello World");
        assert_eq!(concatenate(&["One"]), "One");
    }
}
`,
  },
  {
    id: "iterators4",
    name: "iterators4",
    path: "exercises/iterators/iterators4.rs",
    topic: "iterators",
    mode: "test",
    hint: "Implement the Iterator trait by defining the Item type and the next() method.",
    code: `// Implement the Iterator trait for a custom type.

struct Counter {
    current: u32,
    max: u32,
}

impl Counter {
    fn new(max: u32) -> Counter {
        Counter { current: 0, max }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // Return the current value and increment, or None if done
        if self.current < self.max {
            self.current += 1;
            Some(0) // Fix to return the correct value
        } else {
            None
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn counts_to_three() {
        let counter = Counter::new(3);
        let values: Vec<u32> = counter.collect();
        assert_eq!(values, vec![1, 2, 3]);
    }

    #[test]
    fn counts_to_zero() {
        let counter = Counter::new(0);
        let values: Vec<u32> = counter.collect();
        assert_eq!(values, vec![]);
    }
}
`,
  },
  {
    id: "iterators5",
    name: "iterators5",
    path: "exercises/iterators/iterators5.rs",
    topic: "iterators",
    mode: "test",
    hint: "Use .zip() to combine iterators, .enumerate() for indices, and .take()/.skip() to limit results.",
    code: `// Use advanced iterator methods.

fn pair_with_index(items: &[&str]) -> Vec<(usize, &str)> {
    // Return tuples of (index, item) using enumerate
    items.iter().map(|s| (0, *s)).collect() // Fix: use enumerate instead
}

fn combine_lists(a: &[i32], b: &[i32]) -> Vec<(i32, i32)> {
    // Zip two lists together into tuples
    a.iter().map(|x| (*x, 0)).collect() // Fix: use zip with b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn pairs_with_indices() {
        let items = ["a", "b", "c"];
        let result = pair_with_index(&items);
        assert_eq!(result, vec![(0, "a"), (1, "b"), (2, "c")]);
    }

    #[test]
    fn combines_lists() {
        let a = [1, 2, 3];
        let b = [10, 20, 30];
        assert_eq!(combine_lists(&a, &b), vec![(1, 10), (2, 20), (3, 30)]);
    }
}
`,
  },

  // ============================================================
  // SMART POINTERS EXERCISES (4)
  // ============================================================
  {
    id: "box1",
    name: "box1",
    path: "exercises/smart_pointers/box1.rs",
    topic: "smart_pointers",
    mode: "test",
    hint: "Box provides heap allocation. Wrap the recursive type in Box<T> to give it a fixed size.",
    code: `// Fix the recursive type by using Box.

#[derive(PartialEq, Debug)]
pub enum List {
    Node(i32, List),
    Empty,
}

fn create_list() -> List {
    List::Node(1, List::Node(2, List::Node(3, List::Empty)))
}

fn main() {
    println!("Created list: {:?}", create_list());
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_list() {
        let list = create_list();
        assert_ne!(list, List::Empty);
    }
}
`,
  },
  {
    id: "rc1",
    name: "rc1",
    path: "exercises/smart_pointers/rc1.rs",
    topic: "smart_pointers",
    mode: "compile",
    hint: "Use Rc::clone(&rc) to create a new reference-counted pointer to the same data.",
    code: `// Use Rc to share ownership between multiple owners.

use std::rc::Rc;

struct SharedData {
    value: i32,
}

fn main() {
    let data = Rc::new(SharedData { value: 42 });
    
    println!("Reference count: {}", Rc::strong_count(&data));
    
    let reference1 = Rc::clone(&data); // Create another reference
    println!("Reference count: {}", Rc::strong_count(&data));
    
    let reference2 = Rc::clone(&data); // Create another reference
    println!("Reference count: {}", Rc::strong_count(&data));
    
    println!("All references point to value: {}", data.value);
    println!("ref1 value: {}", reference1.value);
    println!("ref2 value: {}", reference2.value);
}
`,
  },
  {
    id: "arc1",
    name: "arc1",
    path: "exercises/smart_pointers/arc1.rs",
    topic: "smart_pointers",
    mode: "compile",
    hint: "Arc is like Rc but safe to share between threads. Use Arc::clone() to share across threads.",
    code: `// Use Arc to share data between threads.

use std::sync::Arc;
use std::thread;

fn main() {
    let shared_numbers = Arc::new(vec![1, 2, 3, 4, 5]);
    let mut handles = vec![];

    for i in 0..3 {
        let numbers = Arc::clone(&shared_numbers); // Clone the Arc for this thread
        
        let handle = thread::spawn(move || {
            let sum: i32 = numbers.iter().sum();
            println!("Thread {} calculated sum: {}", i, sum);
        });
        
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Main thread can still access: {:?}", shared_numbers);
}
`,
  },
  {
    id: "cow1",
    name: "cow1",
    path: "exercises/smart_pointers/cow1.rs",
    topic: "smart_pointers",
    mode: "test",
    hint: "Cow (Clone on Write) delays cloning until mutation is needed. Use Cow::Borrowed for references and Cow::Owned for owned data.",
    code: `// Use Cow to avoid unnecessary cloning.

use std::borrow::Cow;

fn process_text(input: &str) -> Cow<str> {
    // If input contains "bad", replace it with "good"
    // Otherwise return the input without cloning
    if input.contains("bad") {
        Cow::Borrowed(input) // Fix: should return Owned with replacement
    } else {
        Cow::Borrowed(input)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_borrowed_when_unchanged() {
        let result = process_text("hello world");
        assert!(matches!(result, Cow::Borrowed(_)));
    }

    #[test]
    fn returns_owned_when_modified() {
        let result = process_text("this is bad");
        assert!(matches!(result, Cow::Owned(_)));
        assert_eq!(result, "this is good");
    }
}
`,
  },

  // ============================================================
  // THREADS EXERCISES (3)
  // ============================================================
  {
    id: "threads1",
    name: "threads1",
    path: "exercises/threads/threads1.rs",
    topic: "threads",
    mode: "compile",
    hint: "Use handle.join().unwrap() to wait for a thread to complete and get its result.",
    code: `// Collect results from spawned threads.

use std::thread;
use std::time::Duration;

fn main() {
    let mut handles = vec![];

    for i in 1..=5 {
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(100));
            println!("Thread {} finished", i);
            i * 10
        });
        handles.push(handle);
    }

    let mut results: Vec<i32> = vec![];
    for handle in handles {
        // Collect the result from each thread
        let result = handle.join().unwrap();
        results.push(result);
    }

    if results.len() != 5 {
        panic!("Not all threads completed!");
    }

    println!("Results: {:?}", results);
    assert_eq!(results.iter().sum::<i32>(), 150);
}
`,
  },
  {
    id: "threads2",
    name: "threads2",
    path: "exercises/threads/threads2.rs",
    topic: "threads",
    mode: "compile",
    hint: "Use Mutex to safely share mutable data between threads, and Arc to share the Mutex.",
    code: `// Use Mutex to safely share data between threads.

use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter); // Clone the Arc
        
        let handle = thread::spawn(move || {
            // Lock the mutex and increment the counter
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", *counter.lock().unwrap());
    assert_eq!(*counter.lock().unwrap(), 10);
}
`,
  },
  {
    id: "threads3",
    name: "threads3",
    path: "exercises/threads/threads3.rs",
    topic: "threads",
    mode: "compile",
    hint: "Use mpsc (multi-producer, single-consumer) channels to send messages between threads.",
    code: `// Use channels to communicate between threads.

use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();
    let mut handles = vec![];

    for i in 1..=3 {
        let tx_clone = tx.clone(); // Clone the sender
        
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(i * 100));
            // Send a message
            tx_clone.send(format!("Message from thread {}", i)).unwrap();
        });
        
        handles.push(handle);
    }

    drop(tx); // Drop original sender so rx.iter() will end

    let mut messages = vec![];
    for message in rx {
        println!("Received: {}", message);
        messages.push(message);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    assert_eq!(messages.len(), 3);
}
`,
  },

  // ============================================================
  // MACROS EXERCISES (4)
  // ============================================================
  {
    id: "macros1",
    name: "macros1",
    path: "exercises/macros/macros1.rs",
    topic: "macros",
    mode: "compile",
    hint: "Macro invocations require an exclamation mark: macro_name!()",
    code: `// Call the macro correctly.

macro_rules! greet {
    () => {
        println!("Hello from a macro!");
    };
}

fn main() {
    greet();
}
`,
  },
  {
    id: "macros2",
    name: "macros2",
    path: "exercises/macros/macros2.rs",
    topic: "macros",
    mode: "compile",
    hint: "Macros must be defined before they are used. Move the macro definition above main.",
    code: `// Fix the macro order.

fn main() {
    say_hello!();
}

macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}
`,
  },
  {
    id: "macros3",
    name: "macros3",
    path: "exercises/macros/macros3.rs",
    topic: "macros",
    mode: "compile",
    hint: "To export a macro from a module, use #[macro_export] or call it with the module path.",
    code: `// Make the macro available outside its module.

mod macros {
    macro_rules! create_greeting {
        ($name:expr) => {
            format!("Hello, {}!", $name)
        };
    }
}

fn main() {
    let greeting = create_greeting!("World");
    println!("{}", greeting);
}
`,
  },
  {
    id: "macros4",
    name: "macros4",
    path: "exercises/macros/macros4.rs",
    topic: "macros",
    mode: "compile",
    hint: "Use repetition syntax $(...)* or $(...)+ to match multiple arguments. Separate arms with semicolons.",
    code: `// Fix the macro syntax for multiple patterns.

macro_rules! calculate {
    ($a:expr) => {
        $a
    }
    ($a:expr, $b:expr) => {
        $a + $b
    }
    ($a:expr, $b:expr, $c:expr) => {
        $a + $b + $c
    }
}

fn main() {
    println!("One: {}", calculate!(5));
    println!("Two: {}", calculate!(5, 10));
    println!("Three: {}", calculate!(5, 10, 15));
}
`,
  },

  // ============================================================
  // CLIPPY EXERCISES (3)
  // ============================================================
  {
    id: "clippy1",
    name: "clippy1",
    path: "exercises/clippy/clippy1.rs",
    topic: "clippy",
    mode: "compile",
    hint: "Clippy warns about common mistakes. Fix the floating point comparison and approximate PI value.",
    code: `// Fix the Clippy warnings in this code.

fn main() {
    let pi = 3.14;
    let radius = 5.0;
    
    let area = pi * radius * radius;
    println!("Area: {}", area);
    
    // This comparison is problematic with floating point numbers
    if pi == 3.14 {
        println!("Pi is approximately 3.14");
    }
}
`,
  },
  {
    id: "clippy2",
    name: "clippy2",
    path: "exercises/clippy/clippy2.rs",
    topic: "clippy",
    mode: "compile",
    hint: "Use Option methods like .is_some() or if let instead of matching against Some(_).",
    code: `// Improve this code based on Clippy suggestions.

fn main() {
    let maybe_value: Option<i32> = Some(42);
    
    // This can be simplified
    match maybe_value {
        Some(_) => println!("Got a value!"),
        None => {}
    }
    
    // This can also be simplified
    let result = match maybe_value {
        Some(v) => v,
        None => 0,
    };
    
    println!("Result: {}", result);
}
`,
  },
  {
    id: "clippy3",
    name: "clippy3",
    path: "exercises/clippy/clippy3.rs",
    topic: "clippy",
    mode: "compile",
    hint: "Avoid creating references to references and use iter methods instead of manual loops where possible.",
    code: `// Clean up this code using Clippy's suggestions.

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // Unnecessary collect and iteration
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    let mut sum = 0;
    for n in doubled.iter() {
        sum += n;
    }
    
    println!("Sum of doubled: {}", sum);
    
    // Simpler way exists
    let has_three = numbers.iter().find(|&&x| x == 3).is_some();
    println!("Has three: {}", has_three);
}
`,
  },

  // ============================================================
  // CONVERSIONS EXERCISES (5)
  // ============================================================
  {
    id: "from_into",
    name: "from_into",
    path: "exercises/conversions/from_into.rs",
    topic: "conversions",
    mode: "test",
    hint: "Implement the From trait. Split the string on comma, parse the parts, and handle errors by returning default.",
    code: `// Implement the From trait for type conversion.

#[derive(Debug, PartialEq)]
struct Player {
    name: String,
    score: u32,
}

impl Default for Player {
    fn default() -> Player {
        Player {
            name: String::from("Unknown"),
            score: 0,
        }
    }
}

impl From<&str> for Player {
    fn from(s: &str) -> Player {
        // Parse "name,score" format
        // Return default on any parsing error
    }
}

fn main() {
    let p1 = Player::from("Alice,100");
    let p2: Player = "Bob,250".into();
    println!("{:?}", p1);
    println!("{:?}", p2);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_valid_input() {
        let player = Player::from("Alice,100");
        assert_eq!(player.name, "Alice");
        assert_eq!(player.score, 100);
    }

    #[test]
    fn returns_default_for_invalid() {
        let player = Player::from("invalid");
        assert_eq!(player, Player::default());
    }
}
`,
  },
  {
    id: "from_str",
    name: "from_str",
    path: "exercises/conversions/from_str.rs",
    topic: "conversions",
    mode: "test",
    hint: "Implement FromStr to enable .parse(). Return a Result with your custom error type.",
    code: `// Implement FromStr for parsing strings.

use std::str::FromStr;

#[derive(Debug, PartialEq)]
struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

#[derive(Debug, PartialEq)]
struct ParseColorError;

impl FromStr for Color {
    type Err = ParseColorError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        // Parse "r,g,b" format (e.g., "255,128,0")
        // Return Err(ParseColorError) on failure
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_valid_color() {
        let color: Color = "255,128,64".parse().unwrap();
        assert_eq!(color, Color { red: 255, green: 128, blue: 64 });
    }

    #[test]
    fn rejects_invalid_format() {
        let result: Result<Color, _> = "not,a,color".parse();
        assert!(result.is_err());
    }
}
`,
  },
  {
    id: "try_from_into",
    name: "try_from_into",
    path: "exercises/conversions/try_from_into.rs",
    topic: "conversions",
    mode: "test",
    hint: "TryFrom is for fallible conversions. Return Ok for valid conversions, Err otherwise.",
    code: `// Implement TryFrom for fallible conversion.

use std::convert::TryFrom;

#[derive(Debug, PartialEq)]
struct Percentage(u8);

#[derive(Debug, PartialEq)]
struct PercentageError;

impl TryFrom<i32> for Percentage {
    type Error = PercentageError;

    fn try_from(value: i32) -> Result<Self, Self::Error> {
        // Only accept values 0-100
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_percentage() {
        assert_eq!(Percentage::try_from(50), Ok(Percentage(50)));
        assert_eq!(Percentage::try_from(0), Ok(Percentage(0)));
        assert_eq!(Percentage::try_from(100), Ok(Percentage(100)));
    }

    #[test]
    fn invalid_percentage() {
        assert_eq!(Percentage::try_from(-1), Err(PercentageError));
        assert_eq!(Percentage::try_from(101), Err(PercentageError));
    }
}
`,
  },
  {
    id: "as_ref_mut",
    name: "as_ref_mut",
    path: "exercises/conversions/as_ref_mut.rs",
    topic: "conversions",
    mode: "test",
    hint: "AsRef and AsMut allow functions to accept multiple types that can be referenced as a target type.",
    code: `// Use AsRef to accept multiple string types.

fn count_characters<T: AsRef<str>>(text: T) -> usize {
    // Return the character count
    text.as_ref().len() // Fix: should count chars, not bytes
}

fn append_exclamation<T: AsMut<String>>(mut text: T) {
    // Append "!" to the string
    text.as_mut().push('?'); // Fix: wrong character
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn counts_from_string() {
        assert_eq!(count_characters(String::from("hello")), 5);
    }

    #[test]
    fn counts_from_str() {
        assert_eq!(count_characters("hello"), 5);
    }

    #[test]
    fn appends_to_string() {
        let mut s = String::from("Hello");
        append_exclamation(&mut s);
        assert_eq!(s, "Hello!");
    }
}
`,
  },
  {
    id: "using_as",
    name: "using_as",
    path: "exercises/conversions/using_as.rs",
    topic: "conversions",
    mode: "test",
    hint: "Use 'as' for primitive type casting. Be careful of precision loss with floats and overflow with integers.",
    code: `// Use the 'as' keyword for primitive conversions.

fn average(numbers: &[i32]) -> f64 {
    // Calculate the average as a floating point number
    if numbers.is_empty() {
        return 0.0;
    }
    numbers.iter().sum::<i32>() as f64 // Fix: divide by length
}

fn safe_divide(a: u32, b: u32) -> u32 {
    // Perform division, handling b=0 by returning 0
    a / b // Fix: handle b=0 case
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calculates_average() {
        assert_eq!(average(&[1, 2, 3, 4, 5]), 3.0);
        assert_eq!(average(&[10, 20]), 15.0);
    }

    #[test]
    fn handles_integer_division() {
        assert_eq!(safe_divide(10, 3), 3);
        assert_eq!(safe_divide(10, 0), 0);
    }
}
`,
  },
];
