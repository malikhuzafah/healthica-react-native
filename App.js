import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AddMedicineScreen from "./src/screens/AddMedicineScreen";
import UserProductsScreen from "./src/screens/UserProductsScreen";
import EditProductScreen from "./src/screens/EditProductScreen";
import CartScreen from "./src/screens/CartScreen";
import SeacrhScreen from "./src/screens/SearchScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Auth: AuthScreen,
    Product: DetailsScreen,
    AddMedicine: AddMedicineScreen,
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
    Cart: CartScreen,
    Search: SeacrhScreen,
    Favorites: FavoritesScreen,
  },

  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
export default createAppContainer(navigator);
