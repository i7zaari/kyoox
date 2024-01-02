#!/bin/bash

clean () {
    directories=(
        ".cache"
        "dev"
        "build"
    )
    rm -rf ${directories[@]}
}

clean