#!/bin/bash

# Function to build the Ionic project
function build() {
    echo "Building the Ionic project..."
    ionic build && ionic cap copy
}

# Function to handle Web tasks
function web_option() {
    echo "Running Web tasks..."
    ionic serve -w chrome &
    open -na "Google Chrome" --args --new-window http://localhost:8100/
}

# General function to handle both iOS and Android options
# Accepts 'ios' or 'android' as an argument
function platform_option() {
    local platform=$1
    echo "Running $platform tasks..."
    select choice in "Open IDE" "Run Live Sim"; do
        case $choice in
            "Open IDE")
                build
                ionic cap open $platform
                break
                ;;
            "Run Live Sim")
                ionic capacitor run $platform -l --external
                break
                ;;
            *)
                echo "Invalid option. Please choose a valid option."
                ;;
        esac
    done
}

# Function to run all platforms together
function run_all() {
    echo "Running Web, iOS, and Android tasks together..."
    # Run Web in the background
    web_option &
    
    # Run iOS and Android concurrently
    platform_option ios &
    platform_option android
}

# Prompt user for choice
echo "Do you want to proceed with Web, iOS, Android, or run all?"
select choice in "Web" "iOS" "Android" "All"; do
    case $choice in
        "Web")
            web_option
            break
            ;;
        "iOS")
            platform_option ios
            break
            ;;
        "Android")
            platform_option android
            break
            ;;
        "All")
            run_all
            break
            ;;
        *)
            echo "Invalid option. Please choose Web, iOS, Android, or All."
            ;;
    esac
done