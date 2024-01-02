#!/bin/bash

projectName="kyoox"

distDir="build"
publicUrl="/"

firstArgument="$1"
githubPagesArgument="--pages"

build () {
    arguments=(
        "--dist-dir $distDir"
        "--public-url $publicUrl"
        "--no-source-maps"
        "--cache-dir .cache"
        "--no-content-hash"
    )
    parcel build ${arguments[@]}
}

prefix () { # Add "/kyoox" prefix to any "/" href and/or url
    unprefixed=(
        "href=\"/\""
        "content=\"0; url=/\""
    )
    for element in "${unprefixed[@]}" ; do
        prefixed="${element/\///"$projectName"/}"
        if [ -d "$distDir" ] ; then
            sed -i "s|$element|$prefixed|g" "$distDir"/*.html
        fi
    done
}

preview () { # Replace "og:image" and "twitter:image" relative URLs with absolute URLs
    perl -p -i -e "s/(?<=:image\W content=\W)\//https:\/\/i7zaari.github.io\//g" "$distDir"/*.html
}

run () {
    if [ "$firstArgument" != "$githubPagesArgument" ] ; then
        build
    else
        local publicUrl="/$projectName/"
        build
        prefix
        preview
    fi
}

run