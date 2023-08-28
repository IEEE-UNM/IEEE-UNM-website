# IEEE-UNM-website
IEEE UNM website built with hugo.

# Development and Testing
## Requirements
`hugo`. Hugo needs to be installed in order to compile and test how the compiled website will look like. Hugo can be downloaded [here](https://gohugo.io/getting-started/installing).

## Viewing Results
First clone the repository:
``` sh
git clone --recurse-submodules https://github.com/IEEE-UNM/IEEE-UNM-website.git
cd IEEE-UNM-website
```
Note: The IEEE-UNM-hugo-theme is added as a submodule hence `--recurse-submodules` is needed for the repository to clone correctly. To learn more about submodule visit [here](https://git-scm.com/book/en/v2/Git-Tools-Submodules). 
If you were to forget to add `--recurse-submodules` do:

``` sh
git submodule init
git submodule update --recursive
```
or

``` sh
git submodule update --init --recursive
```

### Compiling HTML files
``` sh
hugo -D
```
All the compiled html file should be located in the `public/` directory.
### Starting Hugo Server
The hugo server will automatically update the website whenever there is changes made to the contents.
``` sh
hudo server -D
```
To view the compiled websites go to (http://localhost:1313) in your favorite web browser.

### Updating from Upstream
Note: The `--recurse-submodule` must be added for it to work correctly.
``` sh
git pull --recurse-submodule
```
If you were to forget `--recurse-submodule` do:

``` sh
git submodule update --init --recursive
```

# Contributing
Please read CONTRIBUTING.md for instruction on contributing.
# UNM-Website
