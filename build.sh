#!/bin/bash
mkdir -p screenshots
rm -rf screenshots/*.png
decktape  --screenshots --screenshots-directory screenshots --screenshots-size 1920x1080 impress file://`pwd`/index.html?showPopover=true mysql_010_cours.pdf
rm java_230_cours.pdf
cd screenshots
convert `ls -1v` ../java_230_cours.pdf
cd ..