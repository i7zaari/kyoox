#!/bin/bash

projectName="kyoox"

distDir="dev"
publicUrl="/"

watch () {
    arguments=(
        "--dist-dir $distDir"
        "--public-url $publicUrl"
        "--no-source-maps"
        "--cache-dir .cache"
        "--no-hmr"
    )
    parcel watch ${arguments[@]}
}

watch