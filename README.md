# Shipment Management App

This project is a shipment management mobile application that allows users to view and manage shipments, search by AWB number, and apply filters. The app is designed to be user-friendly and responsive with modern UI/UX practices, ensuring a seamless experience across different devices.

## Features

- **Animations**: Splash Screen, Login Screen and Expand/Collapse Shipment Details Animations implemented.
- **Login Functionality**: Secure authentication system that allows users to log in and manage their shipments.
- **View Shipments**: Users can view a list of shipments, including shipment details, AWB numbers, and statuses.
- **Search Functionality**: A search feature to quickly find shipments using the AWB number.
- **Filters**: Users can filter shipments based on status (e.g., Pending, Delivered).
- **Mark All/Unmark All**: Users can select or deselect all shipments in the list with a single tap.
- **Expand/Collapse Shipment Details**: Users can expand and collapse each shipment's details to see more information.
- **Pull-to-Refresh**: Users can refresh the shipment list with a pull-to-refresh gesture.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-repository/shipment-app.git
cd shipment-app
```

Install dependencies:

```bash
npm install
```

Run the app on an emulator or a physical device:

```bash
npx expo start
```

## Login Credentials

Use the following credentials to log in:

- **Email**: test@brandimic.com
- **Password**: testy123@

## App Structure

The app is structured in a modular way, making it easy to maintain and extend. Key folders include:

- `components/`: Contains reusable components like `ShipmentCard` and `FilterModal`.
- `screens/`: Contains main screens like `ShipmentListScreen` and `LoginScreen`.
- `json/`: Mock data for shipments used in development.
- `const/`: Stores the color palette in `colors.ts`, used throughout the app.

### Colors File (`const/colors.ts`)

All color codes used in the app are managed through a centralized `colors.ts` file to ensure consistency and ease of updates. Here's a sample structure:

```typescript
export default {
  primary: "#2f50c1",
  secondary: "#F4F2F8",
  textPrimary: "#888",
  textSecondary: "#a7a3b3",
  background: "#ffffff",
  filterButtonText: "#a7a3b3",
  scanButtonText: "#ffffff",
  markAllText: "blue",
};
```

## How to Use the App

1. **Login**: Use the provided credentials to log in.
2. **Search Shipments**: Enter the AWB number in the search bar to find a specific shipment.
3. **Filter Shipments**: Tap on the "Filters" button to apply status filters.
4. **Mark/Unmark Shipments**: Tap on "Mark All" to select or deselect all shipments.
5. **Expand/Collapse Details**: Tap on a shipment to expand or collapse its details.
6. **Refresh Shipments**: Pull down on the shipment list to refresh the data.

## Libraries & Dependencies

- **React Native**: A framework for building native apps using React.
- **Expo**: A platform for making React Native development easier.
- **AsyncStorage**: Used for storing user details locally.
- **Formik**: For handling form state and validation.
- **@expo/vector-icons**: For using icons throughout the app.

## Known Issues

- The "Add Scan" button is not yet fully functional but has been designed for future scanning functionality integration.

## Future Improvements

- **Backend Integration**: Currently, the app uses mock data for getting shipments. As the current API response is does not correlate with the design.
- **Push Notifications**: Notify users when shipment statuses change.
- **Add Scan Feature**: Complete the "Add Scan" feature to allow users to scan shipment barcodes directly within the app.

## License

This project is licensed under the MIT License.

```

```
