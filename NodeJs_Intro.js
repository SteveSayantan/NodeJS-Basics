/* 
    GLOBALS --

    1. __dirname    -> path to current directory
    2. __filename   -> file name
    3. require      -> function to use modules
    4. module       -> info about current module
    5. process      -> info about environment where the program is being executed

*/

/* 

    Node.js uses v8 engine to run js code. It is faster than other js runtimes because it converts js code into machine language.
    Whereas, other popular js engines convert js code into bytecode which is run in a virtual machine. It is written in C++. Chrome and Node.js (both are C++ applications) embed v8.

    EcmaScript: We have a lot of JS engines e.g. chrome uses v8, firefox uses spidermonkey, safari uses its own engine. To create unity and consistency of the way these engines execute JS, we use a set of rules aka ECMAScript. As a language of specification, it defines e.g. how a function should work, how classes can be defined etc .
    It ensures that a JS program runs in a similar way across all the engines. 

    libuv: It is one of the most important dependencies of Node. libuv is written in C. As JS is a high-level programming language, it cannot perform all the necessary jobs like handling processes and network requests, dealing with files, scaling etc. alone. These tasks are done with the help of libuv behing the scenes.

    Event loop is implemented in Node.js with the help of v8, libuv and all the c++ code of Node.js itself.

    Threads are basically lines of execution and each line can execute one thing at a time.
    v8 and Event loop executes on the same single thread, therefore blocking one of these can cause our application to be unresponsive.
    libuv has a separate thread pool consisting of four threads by default, for handling files and some other specific tasks. E.g. Network requests never use thread pool.

        NodeJS, as it is single threaded, uses one CPU core. E.g., if we see a node process taking 100% of cpu, that means it is using the core alloted to it entirely.
        If we wish to use more than one core, we have to use clustering or work with thread modules.
    
*/  

 
//To handle different versions of node, we use nvm (Node Version Manager) . We can have multiple versions and switch between them flawlessly as per requirement with nvm. Installation: https://youtu.be/0-y2VKISR5E , docs: https://github.com/coreybutler/nvm-windows#usage

// Modules are external codes to be included in our program. There are three types of modules: 1.In-built, 2.Third-party (installed via npm) 3.custom (built by the user)