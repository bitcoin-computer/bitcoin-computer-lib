#!/bin/sh

validate_branch() {
    var="$(git branch --show-current 2>&1)"
    
    notAllowedBranch="development"

    if [ $var == $notAllowedBranch ]
    then
        echo "git push to husky branch not allowed"
        exit 1
    fi
}