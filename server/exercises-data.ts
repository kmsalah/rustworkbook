import type { Exercise } from "@shared/schema";

export const exercises: Exercise[] = [
  // Intro exercises
  {
    id: "intro1",
    name: "intro1",
    path: "exercises/intro/intro1.rs",
    topic: "intro",
    mode: "compile",
    hint: "Remove the I AM NOT DONE comment to move on to the next exercise.",
    code: `// intro1.rs
//
// About this I AM NOT DONE thing:
// We sometimes encourage you to keep trying things on a given exercise, even
// after you already figured it out. If you got everything working and feel
// ready for the next exercise, remove the I AM NOT DONE comment below.

fn main() {
    println!("Hello and welcome to Rustlings!");
    // I AM NOT DONE
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

fn main() {
    let x = 3;
    println!("Number {}", x);
    x = 5; // don't change this line
    println!("Number {}", x);
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

  // If exercises
  {
    id: "if1",
    name: "if1",
    path: "exercises/if/if1.rs",
    topic: "if",
    mode: "compile",
    hint: "It's possible to do this in one line if you would like! Some similar examples from other languages: C: a > b ? a : b, JS: a > b ? a : b, Python: a if a > b else b",
    code: `// if1.rs

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

  // Primitive types
  {
    id: "primitive_types1",
    name: "primitive_types1",
    path: "exercises/primitive_types/primitive_types1.rs",
    topic: "primitive_types",
    mode: "compile",
    hint: "There is no boilerplate needed for this exercise. Try looking at the test to see what the expected type is.",
    code: `// primitive_types1.rs

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

  // Vecs
  {
    id: "vecs1",
    name: "vecs1",
    path: "exercises/vecs/vecs1.rs",
    topic: "vecs",
    mode: "compile",
    hint: "In Rust, there are two ways to define a Vector. 1. One way is to use the vec! macro. 2. The other way is to use the Vec::new() function to create a new vector and fill it with the push() method.",
    code: `// vecs1.rs
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

  // Move semantics
  {
    id: "move_semantics1",
    name: "move_semantics1",
    path: "exercises/move_semantics/move_semantics1.rs",
    topic: "move_semantics",
    mode: "compile",
    hint: "So you've got the vec! macro and the new function from the Vec<T> type to create vectors. The problem is that the vec! macro is creating a vector and moving it to fill_vec, but the vector is not returned from the fill_vec function.",
    code: `// move_semantics1.rs

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

  // Structs
  {
    id: "structs1",
    name: "structs1",
    path: "exercises/structs/structs1.rs",
    topic: "structs",
    mode: "compile",
    hint: "Rust has more than one type of struct. Three actually, all variants are used to package related data together. For this exercise, you need to create a classic C struct.",
    code: `// structs1.rs
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

  // Enums
  {
    id: "enums1",
    name: "enums1",
    path: "exercises/enums/enums1.rs",
    topic: "enums",
    mode: "compile",
    hint: "Hint: The declaration of the Message enum is just missing something in front of the first curly bracket.",
    code: `// enums1.rs

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

  // Strings
  {
    id: "strings1",
    name: "strings1",
    path: "exercises/strings/strings1.rs",
    topic: "strings",
    mode: "compile",
    hint: "The current_favorite_color function is currently returning a string slice with the 'static lifetime. Make it return a String instead.",
    code: `// strings1.rs

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
];
