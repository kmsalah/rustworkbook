import type { Exercise } from "@shared/schema";

export const exercises: Exercise[] = [
  // Intro exercises
  {
    id: "intro1",
    name: "intro1",
    path: "exercises/intro/intro1.rs",
    topic: "intro",
    mode: "compile",
    hint: "This is a simple introduction exercise. Just run it to see the welcome message!",
    code: `// Click the ▶ Run Code button above to get started!

fn main() {
    println!("Hello and welcome to the Rust Workbook!");
}
`,
  },
  {
    id: "intro2",
    name: "intro2",
    path: "exercises/intro/intro2.rs",
    topic: "intro",
    mode: "compile",
    hint: "Add the missing keyword to make the code compile.",
    code: `// intro2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Make me compile!

fn main() {
    printlln!("Hello there!");
}
`,
  },
  
  // Variables exercises
  {
    id: "variables1",
    name: "variables1",
    path: "exercises/variables/variables1.rs",
    topic: "variables",
    mode: "compile",
    hint: "The declaration on line 8 is missing a keyword that is needed in Rust to create a new variable binding.",
    code: `// variables1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Make me compile!

fn main() {
    x = 5;
    println!("x has the value {}", x);
}
`,
  },
  {
    id: "variables2",
    name: "variables2",
    path: "exercises/variables/variables2.rs",
    topic: "variables",
    mode: "compile",
    hint: "What happens if you annotate the first line in the main function with a type annotation?",
    code: `// variables2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let x;
    if x == 10 {
        println!("x is ten!");
    } else {
        println!("x is not ten!");
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
    hint: "In Rust, variable bindings are immutable by default. But here we're trying to reassign a different value to x! There's a keyword we can use to make a variable binding mutable instead.",
    code: `// variables3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let x = 3;
    println!("Number {}", x);
    x = 5; // don't change this line
    println!("Number {}", x);
}
`,
  },
  {
    id: "variables4",
    name: "variables4",
    path: "exercises/variables/variables4.rs",
    topic: "variables",
    mode: "compile",
    hint: "Oops! The compiler found an issue. The x variable isn't the same in all branches.",
    code: `// variables4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let x = 3;
    println!("Number {}", x);
    x = 5;
    println!("Number {}", x);
}
`,
  },
  {
    id: "variables5",
    name: "variables5",
    path: "exercises/variables/variables5.rs",
    topic: "variables",
    mode: "compile",
    hint: "Shadowing allows you to reuse a variable name, with a different value and even different type. When you shadow a variable, you're creating a new variable with the same name.",
    code: `// variables5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let number = "T-H-R-E-E";
    println!("Spell a Number : {}", number);
    number = 3;
    println!("Number plus two is : {}", number + 2);
}
`,
  },
  {
    id: "variables6",
    name: "variables6",
    path: "exercises/variables/variables6.rs",
    topic: "variables",
    mode: "compile",
    hint: "We know about variables and mutability, but there is one more important type of variable available: constants. Constants are always immutable and they are declared with keyword 'const' rather than keyword 'let'. Constants types must also always be annotated.",
    code: `// variables6.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

NUMBER = 3;

fn main() {
    println!("Number {}", NUMBER);
}
`,
  },
  
  // Functions exercises
  {
    id: "functions1",
    name: "functions1",
    path: "exercises/functions/functions1.rs",
    topic: "functions",
    mode: "compile",
    hint: "This main function is calling a function that it expects to exist, but the function doesn't exist. It expects to see the definition of the function.",
    code: `// functions1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    call_me();
}
`,
  },
  {
    id: "functions2",
    name: "functions2",
    path: "exercises/functions/functions2.rs",
    topic: "functions",
    mode: "compile",
    hint: "Rust requires that all parts of a function's signature have type annotations, but call_me is missing the type annotation of num.",
    code: `// functions2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    call_me(3);
}

fn call_me(num:) {
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}
`,
  },
  {
    id: "functions3",
    name: "functions3",
    path: "exercises/functions/functions3.rs",
    topic: "functions",
    mode: "compile",
    hint: "This time, the function *declaration* is okay, but there's something wrong with the place where we're calling the function. What could that be?",
    code: `// functions3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    call_me();
}

fn call_me(num: u32) {
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}
`,
  },
  {
    id: "functions4",
    name: "functions4",
    path: "exercises/functions/functions4.rs",
    topic: "functions",
    mode: "compile",
    hint: "The function signature needs to specify the type of the return value after the arrow (->).",
    code: `// functions4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let original_price = 51;
    println!("Your sale price is {}", sale_price(original_price));
}

fn sale_price(price: i32) -> {
    if is_even(price) {
        price - 10
    } else {
        price - 3
    }
}

fn is_even(num: i32) -> bool {
    num % 2 == 0
}
`,
  },
  {
    id: "functions5",
    name: "functions5",
    path: "exercises/functions/functions5.rs",
    topic: "functions",
    mode: "compile",
    hint: "Rust distinguishes between expressions and statements. Expressions return a value, statements don't. A semicolon turns an expression into a statement. Can you figure out which parts of this code are expressions vs statements?",
    code: `// functions5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let answer = square(3);
    println!("The square of 3 is {}", answer);
}

fn square(num: i32) -> i32 {
    num * num;
}
`,
  },

  // If exercises
  {
    id: "if1",
    name: "if1",
    path: "exercises/if/if1.rs",
    topic: "if",
    mode: "compile",
    hint: "It's possible to do this in one line if you would like! Some similar examples from other languages: C: a > b ? a : b, JS: a > b ? a : b, Python: a if a > b else b",
    code: `// if1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub fn bigger(a: i32, b: i32) -> i32 {
    // Complete this function to return the bigger number!
    // Do NOT use:
    // - another function call
    // - additional variables
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ten_is_bigger_than_eight() {
        assert_eq!(10, bigger(10, 8));
    }

    #[test]
    fn fortytwo_is_bigger_than_thirtytwo() {
        assert_eq!(42, bigger(32, 42));
    }
}
`,
  },
  {
    id: "if2",
    name: "if2",
    path: "exercises/if/if2.rs",
    topic: "if",
    mode: "compile",
    hint: "For that first compiler error, it's important to note that in Rust, every conditional block must return the same type. Also, within a function, the last expression is automatically returned.",
    code: `// if2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub fn foo_if_fizz(fizzish: &str) -> &str {
    if fizzish == "fizz" {
        "foo"
    } else {
        1
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn foo_for_fizz() {
        assert_eq!(foo_if_fizz("fizz"), "foo")
    }

    #[test]
    fn bar_for_fuzz() {
        assert_eq!(foo_if_fizz("fuzz"), "bar")
    }

    #[test]
    fn default_to_baz() {
        assert_eq!(foo_if_fizz("literally anything"), "baz")
    }
}
`,
  },
  {
    id: "if3",
    name: "if3",
    path: "exercises/if/if3.rs",
    topic: "if",
    mode: "compile",
    hint: "In Rust, every arm of an if expression returns the same type. Double check your conditions and the types of values returned in each arm.",
    code: `// if3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub fn animal_habitat(animal: &str) -> &'static str {
    let identifier = if animal == "crab" {
        1
    } else if animal == "gopher" {
        2.0
    } else if animal == "snake" {
        3
    } else {
        "Unknown"
    };

    if identifier == 1 {
        "Beach"
    } else if identifier == 2 {
        "Burrow"
    } else if identifier == 3 {
        "Desert"
    } else {
        "Unknown"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn gopher_lives_in_burrow() {
        assert_eq!(animal_habitat("gopher"), "Burrow");
    }

    #[test]
    fn snake_lives_in_desert() {
        assert_eq!(animal_habitat("snake"), "Desert");
    }

    #[test]
    fn crab_lives_on_beach() {
        assert_eq!(animal_habitat("crab"), "Beach");
    }

    #[test]
    fn unknown_animal() {
        assert_eq!(animal_habitat("dinosaur"), "Unknown");
    }
}
`,
  },

  // Primitive types
  {
    id: "primitive_types1",
    name: "primitive_types1",
    path: "exercises/primitive_types/primitive_types1.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "There is no boilerplate needed for this exercise. Try looking at the test to see what the expected type is.",
    code: `// primitive_types1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    // Booleans (true or false)
    let is_morning = true;
    if is_morning {
        println!("Good morning!");
    }

    let // Finish the rest of this line like the example! Or make it be false!
    if is_evening {
        println!("Good evening!");
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
    hint: "No hints this time ;)",
    code: `// primitive_types2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    // Characters (char)
    // Note the _single_ quotes, these are different from the double quotes
    // you've been seeing around.

    let my_first_initial = 'C';
    if my_first_initial.is_alphabetic() {
        println!("Alphabetical!");
    } else if my_first_initial.is_numeric() {
        println!("Numerical!");
    } else {
        println!("Neither alphabetic nor numeric!");
    }

    let // Finish this line like the example! What's your favorite character?
    // Try a letter, try a number, try a special character, try a character
    // from a different language than your own, try an emoji!
    if your_character.is_alphabetic() {
        println!("Alphabetical!");
    } else if your_character.is_numeric() {
        println!("Numerical!");
    } else {
        println!("Neither alphabetic nor numeric!");
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
    hint: "There's a shorthand to initialize an array with a certain size that does not require you to type out every single element. Look at the Rust docs.",
    code: `// primitive_types3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let a = ???

    if a.len() >= 100 {
        println!("Wow, that's a big array!");
    } else {
        println!("Meh, I eat arrays like that for breakfast.");
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
    hint: "Take a look at the 'Understanding Ownership -> Slices' section of the book: https://doc.rust-lang.org/book/ch04-03-slices.html and use the starting and ending indices of the items in the Array that you want to end up in the slice. In Rust, the first element of an array is at index 0.",
    code: `// primitive_types4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[test]
fn slice_out_of_array() {
    let a = [1, 2, 3, 4, 5];

    let nice_slice = ???

    assert_eq!([2, 3, 4], nice_slice)
}
`,
  },
  {
    id: "primitive_types5",
    name: "primitive_types5",
    path: "exercises/primitive_types/primitive_types5.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "Tuples are a way to group a number of values with different types. You can access the values with numerical indices, e.g. tuple.0 or tuple.1.",
    code: `// primitive_types5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let cat = ("Furry McFurson", 3.5);
    let /* your pattern here */ = cat;

    println!("{} is {} years old.", name, age);
}
`,
  },
  {
    id: "primitive_types6",
    name: "primitive_types6",
    path: "exercises/primitive_types/primitive_types6.rs",
    topic: "primitive_types",
    mode: "test",
    hint: "You can index into a tuple with numerical notation, and an index is a number.",
    code: `// primitive_types6.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[test]
fn indexing_tuple() {
    let numbers = (1, 2, 3);
    // Replace below ??? with the tuple indexing syntax.
    let second = ???;

    assert_eq!(2, second, "This is not the 2nd number in the tuple!")
}
`,
  },

  // Vecs
  {
    id: "vecs1",
    name: "vecs1",
    path: "exercises/vecs/vecs1.rs",
    topic: "vecs",
    mode: "compile",
    hint: "In Rust, there are two ways to define a Vector. 1. One way is to use the vec! macro. 2. The other way is to use the Vec::new() function to create a new vector and fill it with the push() method.",
    code: `// vecs1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Your task is to create a Vec which holds the exact same elements
// as in the array a.

fn array_and_vec() -> ([i32; 4], Vec<i32>) {
    let a = [10, 20, 30, 40]; // a plain array
    let v = // TODO: declare your vector here with the macro for vectors

    (a, v)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_array_and_vec_similarity() {
        let (a, v) = array_and_vec();
        assert_eq!(a, v[..]);
    }
}
`,
  },
  {
    id: "vecs2",
    name: "vecs2",
    path: "exercises/vecs/vecs2.rs",
    topic: "vecs",
    mode: "compile",
    hint: "Vec is generic over the type of its elements. So if you want a vector of integers, use Vec<i32>! Also, vectors can make use of iterators, try using an iterator instead of indexing.",
    code: `// vecs2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// A Vec of even numbers is given. Your task is to complete the loop
// so that each number in the Vec is multiplied by 2.

fn vec_loop(mut v: Vec<i32>) -> Vec<i32> {
    for element in v.iter_mut() {
        // TODO: Fill this up so that each element in the Vec v is
        // multiplied by 2.
        ???
    }

    // At this point, v should be equal to [4, 8, 12, 16, 20].
    v
}

fn vec_map(v: &Vec<i32>) -> Vec<i32> {
    v.iter().map(|element| {
        // TODO: Do the same thing as above - but instead of mutating the
        // Vec, you can just return the new number!
        ???
    }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_vec_loop() {
        let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
        let ans = vec_loop(v.clone());

        assert_eq!(ans, v.iter().map(|x| x * 2).collect::<Vec<i32>>());
    }

    #[test]
    fn test_vec_map() {
        let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
        let ans = vec_map(&v);

        assert_eq!(ans, v.iter().map(|x| x * 2).collect::<Vec<i32>>());
    }
}
`,
  },

  // Move semantics
  {
    id: "move_semantics1",
    name: "move_semantics1",
    path: "exercises/move_semantics/move_semantics1.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "So you've got the vec! macro and the new function from the Vec<T> type to create vectors. The problem is that the vec! macro is creating a vector and moving it to fill_vec, but the vector is not returned from the fill_vec function.",
    code: `// move_semantics1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let vec0 = Vec::new();

    let vec1 = fill_vec(vec0);

    println!("{} has length {} content \`{:?}\`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content \`{:?}\`", "vec1", vec1.len(), vec1);
}

fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;

    vec.push(22);
    vec.push(44);
    vec.push(66);

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
    hint: "When you pass a value to a function, the value is moved and can no longer be used. One way to fix this is to make a copy of the value by cloning it.",
    code: `// move_semantics2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[test]
fn main() {
    let vec0 = vec![22, 44, 66];

    let vec1 = fill_vec(vec0);

    assert_eq!(vec0, vec![22, 44, 66]);
    assert_eq!(vec1, vec![22, 44, 66, 88]);
}

fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;

    vec.push(88);

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
    hint: "The difference between this and the previous exercise is that the first line of fill_vec is no longer let mut vec = vec;. You can create a mutable reference to vec0 with &mut vec0.",
    code: `// move_semantics3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let vec0 = vec![22, 44, 66];

    let mut vec1 = fill_vec(vec0);

    assert_eq!(vec1, vec![22, 44, 66, 88]);
}

fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    vec.push(88);

    vec
}
`,
  },
  {
    id: "move_semantics4",
    name: "move_semantics4",
    path: "exercises/move_semantics/move_semantics4.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "Stop reading whenever you feel like you have enough direction :) Here are some additional hints: Carefully reason through the changes required. Start by asking what the ownership rules are. Then change the function signature to fix the issue. Note that it doesn't need to be a reference.",
    code: `// move_semantics4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let vec0 = vec![22, 44, 66];

    let mut vec1 = fill_vec(vec0);

    assert_eq!(vec1, vec![22, 44, 66, 88]);
}

// Write a function that takes a vector of integers, appends 88 to it,
// and returns the modified vector.
// TODO: Fix the function signature and body.
fn fill_vec() {
    vec.push(88);
}
`,
  },
  {
    id: "move_semantics5",
    name: "move_semantics5",
    path: "exercises/move_semantics/move_semantics5.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "The main function is calling fill_vec with a reference to vec0, so vec0 cannot be moved. You could make a second mutable reference to vec0, but the first one is still in scope and you can't have two mutable references to the same variable. The solution is to make only one mutable reference to vec0.",
    code: `// move_semantics5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let mut x = 100;
    let y = &mut x;
    let z = &mut x;
    *y += 100;
    *z += 1000;
    assert_eq!(x, 1200);
}
`,
  },
  {
    id: "move_semantics6",
    name: "move_semantics6",
    path: "exercises/move_semantics/move_semantics6.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "To find the answer, you can consult the documentation for the String type: https://doc.rust-lang.org/std/string/struct.String.html#method.capacity. Of note, the allocation happens when the string is created with String::from().",
    code: `// move_semantics6.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let data = "Rust is great!".to_string();

    get_char(data);

    string_uppercase(&data);
}

// Should not take ownership
fn get_char(data: String) -> char {
    data.chars().last().unwrap()
}

// Should take ownership
fn string_uppercase(mut data: &String) {
    data = &data.to_uppercase();

    println!("{}", data);
}
`,
  },

  // Structs
  {
    id: "structs1",
    name: "structs1",
    path: "exercises/structs/structs1.rs",
    topic: "structs",
    mode: "compile",
    hint: "Rust has more than one type of struct. Three actually, all variants are used to package related data together. For this exercise, you need to create a classic C struct.",
    code: `// structs1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Address all the TODOs to make the tests pass!

struct ColorClassicStruct {
    // TODO: Something goes here
}

struct ColorTupleStruct(/* TODO: Something goes here */);

#[derive(Debug)]
struct UnitStruct;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classic_c_structs() {
        // TODO: Instantiate a classic c struct!
        // let green =

        assert_eq!(green.name, "green");
        assert_eq!(green.hex, "#00FF00");
    }

    #[test]
    fn tuple_structs() {
        // TODO: Instantiate a tuple struct!
        // let green =

        assert_eq!(green.0, "green");
        assert_eq!(green.1, "#00FF00");
    }

    #[test]
    fn unit_structs() {
        // TODO: Instantiate a unit struct!
        // let unit_struct =
        let message = format!("{:?}s are fun!", unit_struct);

        assert_eq!(message, "UnitStructs are fun!");
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
    hint: "Create structs with both update syntax strategies.",
    code: `// structs2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[derive(Debug)]
struct Order {
    name: String,
    year: u32,
    made_by_phone: bool,
    made_by_mobile: bool,
    made_by_email: bool,
    item_number: u32,
    count: u32,
}

fn create_order_template() -> Order {
    Order {
        name: String::from("Bob"),
        year: 2019,
        made_by_phone: false,
        made_by_mobile: false,
        made_by_email: true,
        item_number: 123,
        count: 0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn your_order() {
        let order_template = create_order_template();
        // TODO: Create your own order using the update syntax and template above!
        // let your_order =
        assert_eq!(your_order.name, "Hacker in Rust");
        assert_eq!(your_order.year, order_template.year);
        assert_eq!(your_order.made_by_phone, order_template.made_by_phone);
        assert_eq!(your_order.made_by_mobile, order_template.made_by_mobile);
        assert_eq!(your_order.made_by_email, order_template.made_by_email);
        assert_eq!(your_order.item_number, order_template.item_number);
        assert_eq!(your_order.count, 1);
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
    hint: "For is_international: What makes a package international? Seems related to the country code.",
    code: `// structs3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Structs contain data, but can also have methods associated with them.
// In this exercise, implement two methods for the Package struct.

#[derive(Debug)]
struct Package {
    sender_country: String,
    recipient_country: String,
    weight_in_grams: u32,
}

impl Package {
    fn new(sender_country: String, recipient_country: String, weight_in_grams: u32) -> Package {
        if weight_in_grams < 10 {
            panic!("Can not ship a package with weight below 10 grams.")
        } else {
            Package {
                sender_country,
                recipient_country,
                weight_in_grams,
            }
        }
    }

    // Implement the is_international method here.
    fn is_international(&self) -> ??? {
        // Something goes here...
    }

    // Implement the get_fees method here.
    fn get_fees(&self, cents_per_gram: u32) -> ??? {
        // Something goes here...
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn fail_creating_weightless_package() {
        let sender_country = String::from("Spain");
        let recipient_country = String::from("Austria");

        Package::new(sender_country, recipient_country, 5);
    }

    #[test]
    fn create_international_package() {
        let sender_country = String::from("Spain");
        let recipient_country = String::from("Russia");

        let package = Package::new(sender_country, recipient_country, 1200);

        assert!(package.is_international());
    }

    #[test]
    fn create_local_package() {
        let sender_country = String::from("Canada");
        let recipient_country = sender_country.clone();

        let package = Package::new(sender_country, recipient_country, 1200);

        assert!(!package.is_international());
    }

    #[test]
    fn calculate_transport_fees() {
        let sender_country = String::from("Spain");
        let recipient_country = String::from("Spain");

        let cents_per_gram = 3;

        let package = Package::new(sender_country, recipient_country, 1500);

        assert_eq!(package.get_fees(cents_per_gram), 4500);
        assert_eq!(package.get_fees(cents_per_gram * 2), 9000);
    }
}
`,
  },

  // Enums
  {
    id: "enums1",
    name: "enums1",
    path: "exercises/enums/enums1.rs",
    topic: "enums",
    mode: "compile",
    hint: "Hint: The declaration of the Message enum is just missing something in front of the first curly bracket.",
    code: `// enums1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[derive(Debug)]
enum Message {
    // TODO: define a few types of messages as used below
}

fn main() {
    println!("{:?}", Message::Quit);
    println!("{:?}", Message::Echo);
    println!("{:?}", Message::Move);
    println!("{:?}", Message::ChangeColor);
}
`,
  },
  {
    id: "enums2",
    name: "enums2",
    path: "exercises/enums/enums2.rs",
    topic: "enums",
    mode: "compile",
    hint: "You can create enumerations that have different variants with different types, such as no data, anonymous structs, a single string, tuples, etc.",
    code: `// enums2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[derive(Debug)]
enum Message {
    // TODO: define the different variants used below
}

impl Message {
    fn call(&self) {
        println!("{:?}", self);
    }
}

fn main() {
    let messages = [
        Message::Move { x: 10, y: 30 },
        Message::Echo(String::from("hello world")),
        Message::ChangeColor(200, 255, 255),
        Message::Quit,
    ];

    for message in &messages {
        message.call();
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
    hint: "You can use a match statement to handle the different cases. You can also use if let or while let to destructure enums.",
    code: `// enums3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Address all the TODOs to make the tests pass!

enum Message {
    ChangeColor(u8, u8, u8),
    Echo(String),
    Move(Point),
    Quit,
}

struct Point {
    x: u8,
    y: u8,
}

struct State {
    color: (u8, u8, u8),
    position: Point,
    quit: bool,
    message: String,
}

impl State {
    fn change_color(&mut self, color: (u8, u8, u8)) {
        self.color = color;
    }

    fn quit(&mut self) {
        self.quit = true;
    }

    fn echo(&mut self, s: String) {
        self.message = s
    }

    fn move_position(&mut self, p: Point) {
        self.position = p;
    }

    fn process(&mut self, message: Message) {
        // TODO: create a match expression to process the different message variants
        // Remember: When passing a tuple as a function argument, you'll need extra parentheses:
        // e.g. self.change_color((r, g, b))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_match_message_call() {
        let mut state = State {
            quit: false,
            position: Point { x: 0, y: 0 },
            color: (0, 0, 0),
            message: "hello world".to_string(),
        };
        state.process(Message::ChangeColor(255, 0, 255));
        state.process(Message::Echo(String::from("Hello world!")));
        state.process(Message::Move(Point { x: 10, y: 15 }));
        state.process(Message::Quit);

        assert_eq!(state.color, (255, 0, 255));
        assert_eq!(state.position.x, 10);
        assert_eq!(state.position.y, 15);
        assert_eq!(state.quit, true);
        assert_eq!(state.message, "Hello world!");
    }
}
`,
  },

  // Strings
  {
    id: "strings1",
    name: "strings1",
    path: "exercises/strings/strings1.rs",
    topic: "strings",
    mode: "compile",
    hint: "The current_favorite_color function is currently returning a string slice with the 'static lifetime. Make it return a String instead.",
    code: `// strings1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let answer = current_favorite_color();
    println!("My current favorite color is {}", answer);
}

fn current_favorite_color() -> String {
    "blue"
}
`,
  },

  // Options
  {
    id: "options1",
    name: "options1",
    path: "exercises/options/options1.rs",
    topic: "options",
    mode: "compile",
    hint: "Options can have a Some value, with an inner value, or a None value, without an inner value. There's multiple ways to get at the inner value, you can use unwrap, or pattern match. Unwrapping is the easiest, but how do you do it safely so that it doesn't panic in your face later?",
    code: `// options1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let target = "rustlings";
    let optional_target = Some(target);

    // TODO: Make this an if let statement whose value is "Some" type
    word = optional_target {
        assert_eq!(word, target);
    }
}
`,
  },

  // Error handling
  {
    id: "errors1",
    name: "errors1",
    path: "exercises/error_handling/errors1.rs",
    topic: "error_handling",
    mode: "compile",
    hint: "Most errors aren't serious enough to require the program to stop entirely. Sometimes, when a function fails, it's for a reason that you can easily interpret and respond to. For example, if you try to open a file and that operation fails because the file doesn't exist, you might want to create the file instead of terminating the process.",
    code: `// errors1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub fn generate_nametag_text(name: String) -> Option<String> {
    if name.is_empty() {
        // Empty names aren't allowed.
        None
    } else {
        Some(format!("Hi! My name is {}", name))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generates_nametag_text_for_a_nonempty_name() {
        assert_eq!(
            generate_nametag_text("Beyoncé".into()),
            Some("Hi! My name is Beyoncé".into())
        );
    }

    #[test]
    fn explains_why_generating_nametag_text_fails() {
        assert_eq!(
            generate_nametag_text("".into())
            // Don't change this line
            .unwrap(),
            "Empty names aren't allowed".into()
        );
    }
}
`,
  },
  
  // Modules exercises (Chapter 14)
  {
    id: "modules1",
    name: "modules1",
    path: "exercises/modules/modules1.rs",
    topic: "modules",
    mode: "compile",
    hint: "Everything is private in Rust by default. Use the 'pub' keyword to make the make_sausage function public.",
    code: `// modules1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Make me compile!

mod sausage_factory {
    // Don't let anybody outside of this module see this!
    fn get_secret_recipe() -> String {
        String::from("Ginger")
    }

    fn make_sausage() {
        get_secret_recipe();
        println!("sausage!");
    }
}

fn main() {
    sausage_factory::make_sausage();
}
`,
  },
  {
    id: "modules2",
    name: "modules2",
    path: "exercises/modules/modules2.rs",
    topic: "modules",
    mode: "compile",
    hint: "The 'use' keyword with 'as' allows you to bring module paths into scope and rename them. Replace the ??? with appropriate names.",
    code: `// modules2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Fix these 'use' statements to make the code compile.

mod delicious_snacks {
    // TODO: Fix these use statements
    use self::fruits::PEAR as ???
    use self::veggies::CUCUMBER as ???

    mod fruits {
        pub const PEAR: &'static str = "Pear";
        pub const APPLE: &'static str = "Apple";
    }

    mod veggies {
        pub const CUCUMBER: &'static str = "Cucumber";
        pub const CARROT: &'static str = "Carrot";
    }
}

fn main() {
    println!(
        "favorite snacks: {} and {}",
        delicious_snacks::fruit,
        delicious_snacks::veggie
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
    hint: "Use the 'use' keyword to bring SystemTime and UNIX_EPOCH from the std::time module into scope.",
    code: `// modules3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Bring SystemTime and UNIX_EPOCH from the std::time module into your scope.

// TODO: Complete this use statement
use ???

fn main() {
    match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(n) => println!("1970-01-01 00:00:00 UTC was {} seconds ago!", n.as_secs()),
        Err(_) => panic!("SystemTime before UNIX EPOCH!"),
    }
}
`,
  },
  
  // Hashmaps exercises (Chapter 15)
  {
    id: "hashmaps1",
    name: "hashmaps1",
    path: "exercises/hashmaps/hashmaps1.rs",
    topic: "hashmaps",
    mode: "test",
    hint: "Take a look at the test code. Use HashMap from std::collections to store fruits.",
    code: `// hashmaps1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// A basket of fruits in the form of a hash map needs to be defined.

use std::collections::HashMap;

fn fruit_basket() -> HashMap<String, u32> {
    let mut basket = // TODO: declare your hash map here.

    basket.insert(String::from("banana"), 2);

    // TODO: Put more fruits in your basket here.

    basket
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn at_least_three_types_of_fruits() {
        let basket = fruit_basket();
        assert!(basket.len() >= 3);
    }

    #[test]
    fn at_least_five_fruits() {
        let basket = fruit_basket();
        assert!(basket.values().sum::<u32>() >= 5);
    }
}
`,
  },
  {
    id: "lifetimes1",
    name: "lifetimes1",
    path: "exercises/lifetimes/lifetimes1.rs",
    topic: "lifetimes",
    mode: "compile",
    hint: "Add lifetime annotations to help the compiler understand the relationship between the input and output references.",
    code: `// lifetimes1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Fix this function with proper lifetime annotations.

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}
`,
  },
  {
    id: "tests1",
    name: "tests1",
    path: "exercises/tests/tests1.rs",
    topic: "tests",
    mode: "test",
    hint: "You don't even need to write any code to test -- make the assert pass with a boolean value!",
    code: `// tests1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Tests are important to ensure that your code does what you think it should do.

#[cfg(test)]
mod tests {
    #[test]
    fn you_can_assert() {
        assert!();
    }
}
`,
  },
  {
    id: "iterators1",
    name: "iterators1",
    path: "exercises/iterators/iterators1.rs",
    topic: "iterators",
    mode: "compile",
    hint: "Step 1: Apply the .iter() method to create an iterator. Step 2: Use Some() to wrap the expected values.",
    code: `// iterators1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Iterators are essential for working with collections.

fn main() {
    let my_fav_fruits = vec!["banana", "custard apple", "avocado", "peach", "raspberry"];

    let mut my_iterable_fav_fruits = ???;   // TODO: Step 1

    assert_eq!(my_iterable_fav_fruits.next(), Some(&"banana"));
    assert_eq!(my_iterable_fav_fruits.next(), ???);     // TODO: Step 2
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"avocado"));
    assert_eq!(my_iterable_fav_fruits.next(), ???);     // TODO: Step 3
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"raspberry"));
    assert_eq!(my_iterable_fav_fruits.next(), ???);     // TODO: Step 4
}
`,
  },
  {
    id: "threads1",
    name: "threads1",
    path: "exercises/threads/threads1.rs",
    topic: "threads",
    mode: "compile",
    hint: "Use handle.join().unwrap() to wait for each thread and collect its return value.",
    code: `// threads1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Spawn multiple threads and collect their results.

use std::thread;
use std::time::{Duration, Instant};

fn main() {
    let mut handles = vec![];
    for i in 0..10 {
        handles.push(thread::spawn(move || {
            let start = Instant::now();
            thread::sleep(Duration::from_millis(250));
            println!("thread {} is complete", i);
            start.elapsed().as_millis()
        }));
    }

    let mut results: Vec<u128> = vec![];
    for handle in handles {
        // TODO: Collect the results from each thread
    }

    if results.len() != 10 {
        panic!("Oh no! All the spawned threads did not finish!");
    }

    for (i, result) in results.into_iter().enumerate() {
        println!("thread {} took {}ms", i, result);
    }
}
`,
  },
  {
    id: "box1",
    name: "box1",
    path: "exercises/smart_pointers/box1.rs",
    topic: "smart_pointers",
    mode: "test",
    hint: "Box provides indirection and a pointer to the heap for recursive types. Wrap the List type in Box to fix the infinite size issue.",
    code: `// box1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Fix the recursive type by using Box.

#[derive(PartialEq, Debug)]
pub enum List {
    Cons(i32, List),
    Nil,
}

fn main() {
    println!("This is an empty cons list: {:?}", create_empty_list());
    println!("This is a non-empty cons list: {:?}", create_non_empty_list());
}

pub fn create_empty_list() -> List {
    List::Nil
}

pub fn create_non_empty_list() -> List {
    List::Cons(1, create_empty_list())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_empty_list() {
        assert_eq!(List::Nil, create_empty_list())
    }

    #[test]
    fn test_create_non_empty_list() {
        assert_ne!(create_empty_list(), create_non_empty_list())
    }
}
`,
  },
  {
    id: "macros1",
    name: "macros1",
    path: "exercises/macros/macros1.rs",
    topic: "macros",
    mode: "compile",
    hint: "When you call a macro, you need to add an exclamation mark after its name!",
    code: `// macros1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// Call the macro correctly!

macro_rules! my_macro {
    () => {
        println!("Check out my macro!");
    };
}

fn main() {
    my_macro();
}
`,
  },
  {
    id: "from_into",
    name: "from_into",
    path: "exercises/conversions/from_into.rs",
    topic: "conversions",
    mode: "test",
    hint: "Split the string on commas, extract name and age, and parse the age. Return default on any errors.",
    code: `// from_into.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

//
// The From trait is used for value-to-value conversions.

#[derive(Debug)]
struct Person {
    name: String,
    age: usize,
}

impl Default for Person {
    fn default() -> Person {
        Person {
            name: String::from("John"),
            age: 30,
        }
    }
}

// Complete this implementation
impl From<&str> for Person {
    fn from(s: &str) -> Person {
    }
}

fn main() {
    let p1 = Person::from("Mark,20");
    let p2: Person = "Gerald,70".into();
    println!("{:?}", p1);
    println!("{:?}", p2);
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_default() {
        let dp = Person::default();
        assert_eq!(dp.name, "John");
        assert_eq!(dp.age, 30);
    }
    #[test]
    fn test_good_convert() {
        let p = Person::from("Mark,20");
        assert_eq!(p.name, "Mark");
        assert_eq!(p.age, 20);
    }
}
`,
  },
  
  // Traits
  {
    id: "traits1",
    name: "traits1",
    path: "exercises/traits/traits1.rs",
    topic: "traits",
    mode: "test",
    hint: "A trait is like an interface. To implement a trait for a type, use the impl TraitName for TypeName syntax.",
    code: `// traits1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

trait AppendBar {
    fn append_bar(self) -> Self;
}

impl AppendBar for String {
    // TODO: Implement AppendBar for type String.
    fn append_bar(self) -> Self {
        todo!()
    }
}

fn main() {
    let s = String::from("Foo");
    let s = s.append_bar();
    println!("s: {}", s);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_foo_bar() {
        assert_eq!(String::from("Foo").append_bar(), String::from("FooBar"));
    }

    #[test]
    fn is_bar_bar() {
        assert_eq!(
            String::from("").append_bar().append_bar(),
            String::from("BarBar")
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
    hint: "What happens when you add a second impl block for the trait for the same type?",
    code: `// traits2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

trait AppendBar {
    fn append_bar(self) -> Self;
}

// TODO: Implement trait AppendBar for a vector of strings.

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_vec_pop_eq_bar() {
        let mut foo = vec![String::from("Foo")].append_bar();
        assert_eq!(foo.pop().unwrap(), String::from("Bar"));
        assert_eq!(foo.pop().unwrap(), String::from("Foo"));
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
    hint: "Traits can have a default implementation for functions. Structs that implement the trait can use the default version or override it.",
    code: `// traits3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub trait Licensed {
    fn licensing_info(&self) -> String {
        String::from("Some information")
    }
}

struct SomeSoftware {
    version_number: i32,
}

struct OtherSoftware {
    version_number: String,
}

impl Licensed for SomeSoftware {} // Don't edit this line
impl Licensed for OtherSoftware {} // Don't edit this line

fn compare_license_types(software: ???, software_two: ???) -> bool {
    software.licensing_info() == software_two.licensing_info()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn compare_license_information() {
        let some_software = SomeSoftware { version_number: 1 };
        let other_software = OtherSoftware {
            version_number: "v2.0.0".to_string(),
        };

        assert!(compare_license_types(some_software, other_software));
    }

    #[test]
    fn compare_license_information_backwards() {
        let some_software = SomeSoftware { version_number: 1 };
        let other_software = OtherSoftware {
            version_number: "v2.0.0".to_string(),
        };

        assert!(compare_license_types(other_software, some_software));
    }
}
`,
  },
  {
    id: "traits4",
    name: "traits4",
    path: "exercises/traits/traits4.rs",
    topic: "traits",
    mode: "compile",
    hint: "Instead of using concrete types as parameters, you can use trait bounds. This is a way to say that the function takes any type that implements a specific trait.",
    code: `// traits4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub trait Licensed {
    fn licensing_info(&self) -> String {
        "some information".to_string()
    }
}

struct SomeSoftware {}
struct OtherSoftware {}

impl Licensed for SomeSoftware {}
impl Licensed for OtherSoftware {}

// YOU MAY ONLY CHANGE THE NEXT LINE
fn compare_license_types(software: ???, software_two: ???) -> bool {
    software.licensing_info() == software_two.licensing_info()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn compare_license_information() {
        let some_software = SomeSoftware {};
        let other_software = OtherSoftware {};

        assert!(compare_license_types(some_software, other_software));
    }

    #[test]
    fn compare_license_information_backwards() {
        let some_software = SomeSoftware {};
        let other_software = OtherSoftware {};

        assert!(compare_license_types(other_software, some_software));
    }
}
`,
  },
  {
    id: "traits5",
    name: "traits5",
    path: "exercises/traits/traits5.rs",
    topic: "traits",
    mode: "compile",
    hint: "To implement multiple traits at once, use the + operator in the trait bounds.",
    code: `// traits5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub trait SomeTrait {
    fn some_function(&self) -> bool {
        true
    }
}

pub trait OtherTrait {
    fn other_function(&self) -> bool {
        true
    }
}

struct SomeStruct {}
struct OtherStruct {}

impl SomeTrait for SomeStruct {}
impl OtherTrait for SomeStruct {}
impl SomeTrait for OtherStruct {}
impl OtherTrait for OtherStruct {}

// YOU MAY ONLY CHANGE THE NEXT LINE
fn some_func(item: ???) -> bool {
    item.some_function() && item.other_function()
}

fn main() {
    some_func(SomeStruct {});
    some_func(OtherStruct {});
}
`,
  },
  
  // Generics
  {
    id: "generics1",
    name: "generics1",
    path: "exercises/generics/generics1.rs",
    topic: "generics",
    mode: "compile",
    hint: "Vectors in Rust can hold values of only one type. Use a generic type parameter to make the function work with any type.",
    code: `// generics1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

fn main() {
    let mut shopping_list: Vec<?> = Vec::new();
    shopping_list.push("milk");
}
`,
  },
  {
    id: "generics2",
    name: "generics2",
    path: "exercises/generics/generics2.rs",
    topic: "generics",
    mode: "test",
    hint: "Use angle brackets to declare generic type parameters for structs.",
    code: `// generics2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// This powerful wrapper provides the ability to store a positive integer value.
// Rewrite it using generics so that it supports wrapping ANY type.

// TODO: Fix me.
struct Wrapper {
    value: u32,
}

impl Wrapper {
    pub fn new(value: u32) -> Self {
        Wrapper { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn store_u32_in_wrapper() {
        assert_eq!(Wrapper::new(42).value, 42);
    }

    #[test]
    fn store_str_in_wrapper() {
        assert_eq!(Wrapper::new("Foo").value, "Foo");
    }
}
`,
  },
  
  // Iterators advanced exercises
  {
    id: "iterators2",
    name: "iterators2",
    path: "exercises/iterators/iterators2.rs",
    topic: "iterators",
    mode: "test",
    hint: "Step 1: First, capitalize the first letter of the string. Step 2: Apply the 'capitalize_first' function to a slice of strings. Try using the 'map' function.",
    code: `// iterators2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Step 1.
// Complete the capitalize_first function.
// "hello" -> "Hello"
pub fn capitalize_first(input: &str) -> String {
    let mut c = input.chars();
    match c.next() {
        None => String::new(),
        Some(first) => ???,
    }
}

// Step 2.
// Apply the capitalize_first function to a slice of string slices.
// Return a vector of strings.
// ["hello", "world"] -> ["Hello", "World"]
pub fn capitalize_words_vector(words: &[&str]) -> Vec<String> {
    vec![]
}

// Step 3.
// Apply the capitalize_first function again to a slice of string slices.
// Return a single string with all the strings joined.
// ["hello", " ", "world"] -> "Hello World"
pub fn capitalize_words_string(words: &[&str]) -> String {
    String::new()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_success() {
        assert_eq!(capitalize_first("hello"), "Hello");
    }

    #[test]
    fn test_empty() {
        assert_eq!(capitalize_first(""), "");
    }

    #[test]
    fn test_iterate_string_vec() {
        let words = vec!["hello", "world"];
        assert_eq!(capitalize_words_vector(&words), ["Hello", "World"]);
    }

    #[test]
    fn test_iterate_into_string() {
        let words = vec!["hello", " ", "world"];
        assert_eq!(capitalize_words_string(&words), "Hello World");
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
    hint: "The division method will be returning a Result. Map the values through a function before collecting them.",
    code: `// iterators3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[derive(Debug, PartialEq, Eq)]
pub enum DivisionError {
    NotDivisible(NotDivisibleError),
    DivideByZero,
}

#[derive(Debug, PartialEq, Eq)]
pub struct NotDivisibleError {
    dividend: i32,
    divisor: i32,
}

// Calculate a divided by b if a is evenly divisible by b.
// Otherwise, return a suitable error.
pub fn divide(a: i32, b: i32) -> Result<i32, DivisionError> {
    if b == 0 {
        return Err(DivisionError::DivideByZero);
    }
    if a % b != 0 {
        return Err(DivisionError::NotDivisible(NotDivisibleError {
            dividend: a,
            divisor: b,
        }));
    }
    Ok(a / b)
}

// Complete the function and return a value of the correct type so the test
// passes.
// Desired output: Ok([1, 11, 1426, 3])
fn result_with_list() -> Result<Vec<i32>, DivisionError> {
    let numbers = vec![27, 297, 38502, 81];
    let division_results = numbers.into_iter().map(|n| divide(n, 27));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_success() {
        assert_eq!(divide(81, 9), Ok(9));
    }

    #[test]
    fn test_not_divisible() {
        assert_eq!(
            divide(81, 6),
            Err(DivisionError::NotDivisible(NotDivisibleError {
                dividend: 81,
                divisor: 6
            }))
        );
    }

    #[test]
    fn test_divide_by_0() {
        assert_eq!(divide(81, 0), Err(DivisionError::DivideByZero));
    }

    #[test]
    fn test_divide_0_by_something() {
        assert_eq!(divide(0, 81), Ok(0));
    }

    #[test]
    fn test_result_with_list() {
        assert_eq!(result_with_list().unwrap(), vec![1, 11, 1426, 3]);
    }
}
`,
  },
  {
    id: "iterators4",
    name: "iterators4",
    path: "exercises/iterators/iterators4.rs",
    topic: "iterators",
    mode: "compile",
    hint: "In an imperative language, you might write a for loop to iterate through a vector. In Rust you can use a combination of methods like 'iter' and 'fold'.",
    code: `// iterators4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

pub fn factorial(num: u64) -> u64 {
    // Complete this function to return the factorial of num
    // Do not use:
    // - early returns (e.g., 'return')
    // - imperative style loops (for, while)
    // - additional variables
    // For an extra challenge, don't use:
    // - recursion
    // Execute rustlings hint iterators4 for hints.
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn factorial_of_0() {
        assert_eq!(1, factorial(0));
    }

    #[test]
    fn factorial_of_1() {
        assert_eq!(1, factorial(1));
    }
    #[test]
    fn factorial_of_2() {
        assert_eq!(2, factorial(2));
    }

    #[test]
    fn factorial_of_4() {
        assert_eq!(24, factorial(4));
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
    hint: "Use the filter and map methods to transform the HashMap.",
    code: `// iterators5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

// Let's define a simple model to track Rustlings exercise progress.
// The progress will be modelled using a hash map. The name of the exercise
// is the key and the progress is the value. Two counting functions were
// created to count the number of exercises with a given progress. These
// counting functions use imperative style for loops. Recreate the counting
// function using iterators.

use std::collections::HashMap;

#[derive(Copy, Clone, PartialEq, Eq)]
enum Progress {
    None,
    Some,
    Complete,
}

fn count_for(map: &HashMap<String, Progress>, value: Progress) -> usize {
    let mut count = 0;
    for val in map.values() {
        if val == &value {
            count += 1;
        }
    }
    count
}

fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "functions5": None, ... }
    todo!();
}

fn count_collection_for(collection: &[HashMap<String, Progress>], value: Progress) -> usize {
    let mut count = 0;
    for map in collection {
        for val in map.values() {
            if val == &value {
                count += 1;
            }
        }
    }
    count
}

fn count_collection_iterator(collection: &[HashMap<String, Progress>], value: Progress) -> usize {
    // collection is a slice of hashmaps.
    // collection = [{ "variables1": Complete, "functions5": None, ... },
    //     { "variables2": Complete, ... }, ... ]
    todo!();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn count_complete() {
        let mut progress = HashMap::new();
        progress.insert(String::from("variables1"), Progress::Complete);
        progress.insert(String::from("functions5"), Progress::None);
        progress.insert(String::from("loops3"), Progress::Some);
        progress.insert(String::from("if2"), Progress::Complete);

        assert_eq!(3, count_iterator(&progress, Progress::None));
    }

    #[test]
    fn count_some() {
        let mut progress = HashMap::new();
        progress.insert(String::from("variables2"), Progress::Some);
        progress.insert(String::from("functions3"), Progress::Some);
        progress.insert(String::from("loops1"), Progress::None);
        progress.insert(String::from("move_semantics2"), Progress::None);

        assert_eq!(2, count_iterator(&progress, Progress::Some));
    }

    #[test]
    fn count_collection_complete() {
        let mut collection = vec![];
        let mut progress = HashMap::new();
        progress.insert(String::from("variables1"), Progress::Complete);
        progress.insert(String::from("functions5"), Progress::None);
        collection.push(progress);

        let mut progress = HashMap::new();
        progress.insert(String::from("loops3"), Progress::Some);
        progress.insert(String::from("if2"), Progress::Complete);
        collection.push(progress);

        assert_eq!(
            2,
            count_collection_iterator(&collection, Progress::Complete)
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
    mode: "compile",
    hint: "One way to handle this is using a match statement on Result<T, E> to figure out whether it has a value or error to return the former or the latter. But there's a concise expression to do it!",
    code: `// errors2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// Say we're writing a game where you can buy items with tokens. All items cost
// 5 tokens, and whenever you purchase items there is a processing fee of 1
// token. A player of the game will type in how many items they want to buy, and
// the handle_purchase function will calculate the total cost of the items. Since
// the player typed in the quantity, we get it as a string. They might have typed
// anything, not just numbers!
//
// Right now, this function isn't handling the error case at all (and isn't
// handling the success case properly either). What we want to do is:
// If we call the parse function on a string that is not a number, that function
// will return a ParseIntError, and in that case, we want to immediately return
// that error from our function and not try to multiply and add.
//
// There's one function that will help you do both of these things!
// Scroll down for hints :)

use std::num::ParseIntError;

pub fn total_cost(item_quantity: &str) -> Result<i32, ParseIntError> {
    let processing_fee = 1;
    let cost_per_item = 5;
    let qty = item_quantity.parse::<i32>();

    Ok(qty * cost_per_item + processing_fee)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn item_quantity_is_a_valid_number() {
        assert_eq!(total_cost("34"), Ok(171));
    }

    #[test]
    fn item_quantity_is_an_invalid_number() {
        assert_eq!(
            total_cost("beep boop").unwrap_err().to_string(),
            "invalid digit found in string"
        );
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
    hint: "Use the question mark operator when handling a Result type",
    code: `// errors3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// This is a program that is trying to use a completed version of the
// total_cost function from the previous exercise. It's not working though!
// Why not? What should we do to fix it?
// Scroll down for hints!

use std::num::ParseIntError;

fn main() {
    let mut tokens = 100;
    let pretend_user_input = "8";

    let cost = total_cost(pretend_user_input)?;

    if cost > tokens {
        println!("You can't afford that many!");
    } else {
        tokens -= cost;
        println!("You now have {} tokens.", tokens);
    }
}

pub fn total_cost(item_quantity: &str) -> Result<i32, ParseIntError> {
    let processing_fee = 1;
    let cost_per_item = 5;
    let qty = item_quantity.parse::<i32>()?;

    Ok(qty * cost_per_item + processing_fee)
}
`,
  },
  {
    id: "errors4",
    name: "errors4",
    path: "exercises/error_handling/errors4.rs",
    topic: "error_handling",
    mode: "compile",
    hint: "A match statement is one way to do this, but it's not the shortest way! When returning a Result type, match is nice because we can be really explicit with our error handling. The shorthand way would involve using a method on the Result to convert it to an Option.",
    code: `// errors4.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        // Hmm... Why is this only returning an Ok value?
        Ok(PositiveNonzeroInteger(value as u64))
    }
}

#[test]
fn test_creation() {
    assert!(PositiveNonzeroInteger::new(10).is_ok());
    assert_eq!(
        Err(CreationError::Negative),
        PositiveNonzeroInteger::new(-10)
    );
    assert_eq!(Err(CreationError::Zero), PositiveNonzeroInteger::new(0));
}
`,
  },
  {
    id: "errors5",
    name: "errors5",
    path: "exercises/error_handling/errors5.rs",
    topic: "error_handling",
    mode: "compile",
    hint: "Hint: There are two different possible Result types produced within the body of main function, which are propagated using the ? operator. How do we declare a return type for main() so that we can use both types of Results with the ? operator? Look at the Box<dyn ...> construct.",
    code: `// errors5.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// This exercise uses an altered version of the code from errors4.
// This exercise uses some concepts that we won't get to until later in the course, like Box and the
// From trait. It's not important to understand them in detail right now, but you can read ahead if you like.
// In short, this particular use case for Box is for when you want to own a value and you only care that
// it's a type which implements a particular trait. For more information, read about trait objects:
// https://doc.rust-lang.org/book/ch17-02-trait-objects.html#trait-objects-perform-dynamic-dispatch
//
// Execute rustlings hint errors5 for hints!

use std::error;
use std::fmt;
use std::num::ParseIntError;

// TODO: update the return type of main() to make this compile.
fn main() -> Result<(), ParseIntError> {
    let pretend_user_input = "42";
    let x: i64 = pretend_user_input.parse()?;
    println!("output={:?}", PositiveNonzeroInteger::new(x)?);
    Ok(())
}

// Don't change anything below this line.

#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            x if x < 0 => Err(CreationError::Negative),
            x if x == 0 => Err(CreationError::Zero),
            x => Ok(PositiveNonzeroInteger(x as u64))
        }
    }
}

// This is required so that CreationError can implement the Error trait.
impl fmt::Display for CreationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let description = match *self {
            CreationError::Negative => "number is negative",
            CreationError::Zero => "number is zero",
        };
        f.write_str(description)
    }
}

impl error::Error for CreationError {}
`,
  },
  {
    id: "errors6",
    name: "errors6",
    path: "exercises/error_handling/errors6.rs",
    topic: "error_handling",
    mode: "test",
    hint: "This exercise presents a common issue with using the question mark operator. What about using map_err to convert the error type? Another hint: Read the documentation for From trait thoroughly.",
    code: `// errors6.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// Using catch-all error types like Box<dyn error::Error> isn't recommended
// for library code, where callers might want to make decisions based on the
// error content, instead of printing it out or propagating it further. Here, we
// define a custom error type to make it possible for callers to decide what to
// do next when our function returns an error.
//
// Make these tests pass!

use std::num::ParseIntError;

// This is a custom error type that we will be using in parse_pos_nonzero().
#[derive(PartialEq, Debug)]
enum ParsePosNonzeroError {
    Creation(CreationError),
    ParseInt(ParseIntError)
}

impl ParsePosNonzeroError {
    fn from_creation(err: CreationError) -> ParsePosNonzeroError {
        ParsePosNonzeroError::Creation(err)
    }
    
    fn from_parseint(err: ParseIntError) -> ParsePosNonzeroError {
        ParsePosNonzeroError::ParseInt(err)
    }
}

fn parse_pos_nonzero(s: &str)
    -> Result<PositiveNonzeroInteger, ParsePosNonzeroError>
{
    // TODO: change this to return an appropriate error instead of panicking
    // when parse() returns an error.
    let x: i64 = s.parse().unwrap();
    PositiveNonzeroInteger::new(x)
        .map_err(ParsePosNonzeroError::from_creation)
}

// Don't change anything below this line.

#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            x if x < 0 => Err(CreationError::Negative),
            x if x == 0 => Err(CreationError::Zero),
            x => Ok(PositiveNonzeroInteger(x as u64))
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_parse_error() {
        // We can't construct a ParseIntError, so we have to pattern match.
        assert!(matches!(
            parse_pos_nonzero("not a number"),
            Err(ParsePosNonzeroError::ParseInt(_))
        ));
    }

    #[test]
    fn test_negative() {
        assert_eq!(
            parse_pos_nonzero("-555"),
            Err(ParsePosNonzeroError::Creation(CreationError::Negative))
        );
    }

    #[test]
    fn test_zero() {
        assert_eq!(
            parse_pos_nonzero("0"),
            Err(ParsePosNonzeroError::Creation(CreationError::Zero))
        );
    }

    #[test]
    fn test_positive() {
        let x = PositiveNonzeroInteger::new(42);
        assert!(x.is_ok());
        assert_eq!(parse_pos_nonzero("42"), x.map_err(ParsePosNonzeroError::from_creation));
    }
}
`,
  },
  {
    id: "hashmaps1",
    name: "hashmaps1",
    path: "exercises/hashmaps/hashmaps1.rs",
    topic: "hashmaps",
    mode: "test",
    hint: "Take a look at the return type of the function to figure out what type the basket should be.",
    code: `// hashmaps1.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// A basket of fruits in the form of a hash map needs to be defined.
// The key represents the name of the fruit and the value represents
// how many of that particular fruit is in the basket. You have to put
// at least three different types of fruits (e.g., apple, banana) in the basket and
// the total count of all the fruits should be at least five.
//
// Make me pass the tests!
//
// Execute rustlings hint hashmaps1 for hints!

use std::collections::HashMap;

fn fruit_basket() -> HashMap<String, u32> {
    let mut basket = // TODO: declare your hash map here.

    // Two bananas are already given for you :)
    basket.insert(String::from("banana"), 2);

    // TODO: Put more fruits in your basket here.

    basket
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn at_least_three_types_of_fruits() {
        let basket = fruit_basket();
        assert!(basket.len() >= 3);
    }

    #[test]
    fn at_least_five_fruits() {
        let basket = fruit_basket();
        assert!(basket.values().sum::<u32>() >= 5);
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
    hint: "Use the entry() and or_insert() methods of HashMap to achieve this. Learn more about the or_insert() method here: https://doc.rust-lang.org/stable/std/collections/hash_map/enum.Entry.html#method.or_insert",
    code: `// hashmaps2.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//

use std::collections::HashMap;

#[derive(Hash, PartialEq, Eq)]
enum Fruit {
    Apple,
    Banana,
    Mango,
    Lychee,
    Pineapple,
}

fn fruit_basket(basket: &mut HashMap<Fruit, u32>) {
    let fruit_kinds = vec![
        Fruit::Apple,
        Fruit::Banana,
        Fruit::Mango,
        Fruit::Lychee,
        Fruit::Pineapple,
    ];

    for fruit in fruit_kinds {
        // TODO: Put new fruits if not already present. Note that you
        // are not allowed to put any type of fruit that's already
        // present!
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn get_fruit_basket() -> HashMap<Fruit, u32> {
        let mut basket = HashMap::<Fruit, u32>::new();
        basket.insert(Fruit::Apple, 4);
        basket.insert(Fruit::Mango, 2);
        basket.insert(Fruit::Lychee, 5);

        basket
    }

    #[test]
    fn test_given_fruits_are_not_modified() {
        let mut basket = get_fruit_basket();
        fruit_basket(&mut basket);
        assert_eq!(*basket.get(&Fruit::Apple).unwrap(), 4);
        assert_eq!(*basket.get(&Fruit::Mango).unwrap(), 2);
        assert_eq!(*basket.get(&Fruit::Lychee).unwrap(), 5);
    }

    #[test]
    fn at_least_five_types_of_fruits() {
        let mut basket = get_fruit_basket();
        fruit_basket(&mut basket);
        let count_fruit_kinds = basket.len();
        assert!(count_fruit_kinds >= 5);
    }

    #[test]
    fn greater_than_eleven_fruits() {
        let mut basket = get_fruit_basket();
        fruit_basket(&mut basket);
        let count = basket.values().sum::<u32>();
        assert!(count > 11);
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
    hint: "Tip 1: Use the .entry() and .or_insert() methods of HashMap. Tip 2: We've already imported HashMap for you, so you should not import it again.",
    code: `// hashmaps3.rs
// This exercise is from the Rustlings project (https://github.com/rust-lang/rustlings)
// Licensed under the MIT License
// Copyright (c) 2015 Carol (Nichols || Goulding)
//
// A list of scores (one per line) of a soccer match is given. Each line
// is of the form:
// <team_1_name>,<team_2_name>,<team_1_goals>,<team_2_goals>
// Example: England,France,4,2 (England scored 4 goals, France scored 2).
//
// You have to build a scores table containing the name of the team, goals
// the team scored, and goals the team conceded. One approach to build
// the scores table is to use a Hashmap. The solution is partially written
// to use a Hashmap, complete it to pass the test.
//
// Make me pass the tests!
//
// Execute rustlings hint hashmaps3 for hints!

use std::collections::HashMap;

// A structure to store team name and its goal details.
struct Team {
    name: String,
    goals_scored: u8,
    goals_conceded: u8,
}

fn build_scores_table(results: String) -> HashMap<String, Team> {
    // The name of the team is the key and its associated struct is the value.
    let mut scores: HashMap<String, Team> = HashMap::new();

    for r in results.lines() {
        let v: Vec<&str> = r.split(',').collect();
        let team_1_name = v[0].to_string();
        let team_1_score: u8 = v[2].parse().unwrap();
        let team_2_name = v[1].to_string();
        let team_2_score: u8 = v[3].parse().unwrap();
        // TODO: Populate the scores table with details extracted from the
        // current line. Keep in mind that goals scored by team_1
        // will be number of goals conceded from team_2, and similarly
        // goals scored by team_2 will be the number of goals conceded by
        // team_1.
    }
    scores
}

#[cfg(test)]
mod tests {
    use super::*;

    fn get_results() -> String {
        let results = "".to_string()
            + "England,France,4,2\n"
            + "France,Italy,3,1\n"
            + "Poland,Spain,2,0\n"
            + "Germany,England,2,1\n";
        results
    }

    #[test]
    fn build_scores() {
        let scores = build_scores_table(get_results());

        let mut keys: Vec<&String> = scores.keys().collect();
        keys.sort();
        assert_eq!(
            keys,
            vec!["England", "France", "Germany", "Italy", "Poland", "Spain"]
        );
    }

    #[test]
    fn validate_team_score_1() {
        let scores = build_scores_table(get_results());
        let team = scores.get("England").unwrap();
        assert_eq!(team.name, "England");
        assert_eq!(team.goals_scored, 5);
        assert_eq!(team.goals_conceded, 4);
    }

    #[test]
    fn validate_team_score_2() {
        let scores = build_scores_table(get_results());
        let team = scores.get("Italy").unwrap();
        assert_eq!(team.name, "Italy");
        assert_eq!(team.goals_scored, 1);
        assert_eq!(team.goals_conceded, 3);
    }
}
`,
  },
];
