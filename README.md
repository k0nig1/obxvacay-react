
# OBX Vacay App

**OBX Vacay** is a mobile app built with **Ionic React** that provides visitors and tourists with essential information about the Outer Banks of North Carolina. The app includes features such as weather updates, points of interest, local radio stations, and more.

## Features

- Real-time weather updates for the Outer Banks area.
- Information on local attractions and points of interest.
- Integrated radio stations from Norfolk, VA, and the Outer Banks using the Radio Browser API.
- Responsive design for seamless user experience across all devices.

## Screenshots

(Include screenshots or GIFs of your app in action if available.)

## Technologies

- **Ionic Framework**
- **React.js**
- **Radio Browser API**
- **HLS.js** for live streaming
- **Firebase** (optional, if you're using Firestore or Firebase services)

## Getting Started

Follow these instructions to install, set up, and run the project on your local machine for development and testing.

### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)
- **Ionic CLI** (v6 or higher)
- **Git** (optional, for version control)

You can install the Ionic CLI globally by running:

```bash
npm install -g @ionic/cli
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/obx-vacay-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd obx-vacay-app
   ```

3. **Install dependencies:**

   Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

### Running the App

Once you have installed the dependencies, you can run the app in development mode using the Ionic CLI.

1. **Run the app in the browser:**

   ```bash
   ionic serve
   ```

   This will start a local development server and open the app in your default browser.

2. **Run the app on an emulator or real device:**

   For **Android**:

   ```bash
   ionic capacitor run android
   ```

   For **iOS**:

   ```bash
   ionic capacitor run ios
   ```

   > **Note:** For iOS development, you need a Mac with Xcode installed.

### Building the App

To create a production build of the app, run:

```bash
ionic build
```

This will generate a `www` directory containing the compiled code.

### Deployment

1. To deploy to a device or emulator, use:

   ```bash
   ionic capacitor build <platform>
   ```

   Replace `<platform>` with `android` or `ios`.

2. For deploying to the iOS App Store or Google Play Store, follow the respective guidelines for each platform.

## Contributing

Feel free to fork this repository, submit pull requests, or open issues to report bugs or suggest new features.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
