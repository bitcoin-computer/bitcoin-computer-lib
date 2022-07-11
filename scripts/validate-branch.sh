#!/bin/bash

validate_branch() {
    var="$(git branch --show-current 2>&1)"

    if [ "$var" = "dev" ] || [ "$var" = "master" ]
    then
        echo "git push to dev or master branch not allowed. Please create PR"
        exit 1
    fi
}
