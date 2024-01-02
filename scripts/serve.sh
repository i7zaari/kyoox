#!/bin/bash

projectName="kyoox"

distDir="dev"
publicUrl="/"

serve () {
    arguments=(
        "--dist-dir $distDir"
        "--public-url $publicUrl"
        "--no-source-maps"
        "--cache-dir .cache"
        "--port 1724"
        "--host 0.0.0.0"
        "--open"
        "--lazy"
    )
    parcel serve ${arguments[@]}
}

serve