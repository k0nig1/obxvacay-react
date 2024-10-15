#!/bin/bash

# Function to build the Ionic project
function build() {
    ionic build && ionic cap copy
}

# Function to handle Web option
function web_option() {
    echo "You selected Web. Running Web tasks..."
    ionic serve -w chrome
}

# Function to handle iOS option
function ios_option() {
    echo "You selected iOS. Running iOS tasks..."
    build
    select choice in "Open IDE" "Run Live Sim"; do
        case $choice in
            "Open IDE")
                ionic cap open ios
                break
                ;;
            "Run Live Sim")
                ionic capacitor run ios -l --external
                break
                ;;
            *)
                echo "Invalid option. Please choose a valid option."
                ;;
        esac
    done
}

# Function to handle Android option
function android_option() {
    echo "You selected Android. Running Android tasks..."
    build
    select choice in "Open IDE" "Run Live Sim"; do
        case $choice in
            "Open IDE")
                ionic cap open android
                break
                ;;
            "Run Live Sim")
                ionic capacitor run android -l --external
                break
                ;;
            *)
                echo "Invalid option. Please choose a valid option."
                ;;
        esac
    done
}

# Prompt user for choice
echo "Do you want to proceed with Web, iOS, or Android?"
select choice in "Web" "iOS" "Android"; do
    case $choice in
        "Web")
            web_option
            break
            ;;
        "iOS")
            ios_option
            break
            ;;
        "Android")
            android_option
            break
            ;;
        *)
            echo "Invalid option. Please choose Web, iOS, or Android."
            ;;
    esac
done