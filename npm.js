/*  
    For getting started with npm we need to use npm init or npm init -y (for default values)

    1. npm install <package_name> => installs the package. We can write i instead of install and for multiple package names just separate by a space (Omit the < >)

    2. npm uninstall <package_name> => uninstalls the package, for global package use -g flag after npm (Omit the < >)

    3. npm install => reinstalls the node module folder, if deleted by mistake 

    4. A package is a file or directory that is described by a package.json file.
        A module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function.
        Note: Since modules are not required to have a package.json file, not all modules are packages. Only modules that have a package.json file are also packages

    5. npm install <package_name> --save-dev => installs the package as dev dependency. We can also use -D flag instead of --save-dev. e.g. npm i -D nodemon chalk (Omit the < >)
    6. npm install <package_name> --global => installs the package as global dependency. We can also use -g flag (Omit the < >)
    7. npm install <package_name@1.3.5> => installs the 1.3.5 version of that package (Omit the < >)
    8. npm install <package_name@latest> => installs the latest version of that package (Omit the < >)
    9. npm update => updates all the packages, package er nam dile specific package ta update korbe
    10. ^ symbol before the version can download patch and minor releases but not the major ones (e.g. npm install chalk@^6)
    11. ~ symbol before the version can download only patch releases. (e.g. npm install chalk@~6.5)
    12. > symbol before the version can download major, minor and patch releases.
    13. npm view <package_name> version => it shows the current version of the package 

    14. npx <package name> => Runs the package. We have to mention the file name if it is not the same as the one mentioned in as 'main' ( one inside package.json file)
    15. Create a key-value pair e.g. "nodemon" :"nodemon" inside script object in package.json and write <npm run nodemon> or <npm run nodemon ./filepath> to run nodemon. (Omit the < >)
    16. To change the default file we can write the key-value pair as "nodemon":"nodemon ./filepath" to run another file or change the value of "main" inside of package.json to the new file path

    17. Dev Dependencies: The dependencies we need only in development, but not in production are called dev dependencies. E.g. We shall use nodemon while development,but once the project is deployed we no longer need it.

    18. Suppose I want to run nodemon in a different folder without installing it globally. In that case, I shall run npx nodemon <filename> . npx helps by installing nodemon in its cache and get the job done. But later we need to clear its cache using <npx clear-npx-cache> and press y for confirmation (Omit the < >)

    19. npx npkill => npkill package helps uninstall multiple packages at once.
*/
