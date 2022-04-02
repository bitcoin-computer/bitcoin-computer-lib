#!/bin/sh

var=$(git branch --show-current 2>&1)
if ["$var" == "husky"]
then
 echo "git push to husky branch not allowed"
 exit 1