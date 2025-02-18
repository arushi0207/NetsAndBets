Here you can document your coding standards and conventions. This includes decisions about naming, style guides, etc.

Main Goals:
    -create low-complexity, easy to read code
    -push complexity upward or downward in the class hierarchy
    -create deep methods and classes with simple interfaces
    -create more general, rather than specific, classes and interfaces
    -create independent classes
    -create automated tests that are independent and simple to understand
    -write concise documentation wherever possible, ensuring that it can be easily understood

Languages to be used:
    -Frontend: React/JS
    -Backend: Java
    -DB: MySQL

Naming Conventions:
    -Variables:
        -all private/local variables start with a lowercase and use camelCase for multi-word variables
        -global variables begin with a capital letter
        -all final/immutable variable fields are written in ALL CAPS, separating words with and underscore

    -Methods
        -all methods are written in camelCase
        -method and parameter names are short yet descriptive enough that others can easily understand
        

    -Classes:
        -Classes begin with a capital letter
        -Classes should not contain an underscore, but separate words with a capital letter

Whitespace and Formatting:
    -utilize standard whitespace managament (4 spaces of tabbing)

Comment Style:
    -Classes
        -Class comments should be separated between an interface and an implementation in separate files
        -Interface comments should abstract the class, describing the class and each field in simple English
        -Implementation comments should provide information for how the class and methods were coded in plain English

    -Methods
        -Each method comment should describe the method, its function, as well as parameters and return values at the bottom of the description
        -Exceptions or any odd functionalities should be clearly described
        -In-method comments are only necessary when code is lengthy/complex

    -Variables
        -Each variable should have a short comment abstracting from the code
        -A more-descriptive comment should be used with fields that are used oddly or complex

Testing:
    -Each class should have an automated unit test file
    -Each test should be testing only 1 part of the program, keeping tests independent
    -Each test file and individual test should have short, descriptive documentation
    -Test names begin with "test", followed by the name of the method/function they are testing and any more description necessary
    -Test files should be located near class files

File Management:
    -ALL project files should be easily found in one location, such as the project repository
    -File groups should be separated based on the area of design (Frontend/Backend/DB), with a single file encapsulating all of them
    -Each class file should have a interface file adjacent to it

Exceptions:
    -All exceptions should be well-documented and easily understandable for when they are thrown

Gitlab Guidlines:
    -Assign yourself issues BEFORE working on them
    -Do not take issues that are already assigned to others unless agreed upon by both parties
    -Do not assign issues to others without their acknowledgement
    -Update others about merge requests when posted


