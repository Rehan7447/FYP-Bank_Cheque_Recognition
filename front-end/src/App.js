import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//global pages
import LandingPage from "./screens/LandingPage/LandingPage";
import Login from "./screens/login/loginPage";
import SignUp from "./screens/signUp/signUp";

// Admin Dashboard
import AdminDashboard from "./screens/admin/adminDashBoard";

// Admin Profile
import AdminProfile from "./screens/admin/profile";

// Admin Add
import AdminAddCashier from "./screens/admin/Add/addCashier";
import AdminAddEmployee from "./screens/admin/Add/addEmployee";
import AdminAddCustomer from "./screens/admin/Add/addCustomer";

// Admin View
import AdminViewCashier from "./screens/admin/View/viewCashier";
import AdminViewEmployee from "./screens/admin/View/viewEmployee";
import AdminViewCustomer from "./screens/admin/View/viewCustomer";

// Admin Update
import AdminUpdateCustomer from "./screens/admin/Update/updateCustomer";
import AdminUpdateEmployee from "./screens/admin/Update/updateEmployee";
import AdminUpdateCashier from "./screens/admin/Update/updateCashier";


// Cashier Dashboard
import CashierDashboard from "./screens/cashier/cashierDashBoard";

// Cashier Profile
import CashierProfile from "./screens/cashier/profile";

// Cashier Add
import CashierAddCashier from "./screens/cashier/Add/addCashier";
import CashierAddEmployee from "./screens/cashier/Add/addEmployee";
import CashierAddCustomer from "./screens/cashier/Add/addCustomer";

// Cashier View
import CashierViewCashier from "./screens/cashier/View/viewCashier";
import CashierViewEmployee from "./screens/cashier/View/viewEmployee";
import CashierViewCustomer from "./screens/cashier/View/viewCustomer";

// Cashier Update
import CashierUpdateCustomer from "./screens/cashier/Update/updateCustomer";
import CashierUpdateEmployee from "./screens/cashier/Update/updateEmployee";
import CashierUpdateCashier from "./screens/cashier/Update/updateCashier";

// import AdminErrors from "./screens/admin/adminErrors";

//user routes
import User from "./screens/user/userHome/userHomePage";
import MoneyTransfer from "./screens/user/moneyTransfer/moneyTransfer";
import RegisterComplain from "./screens/user/complain/registerComplain";
import ChequeTransaction from "./screens/user/chequeTransaction/chequeTransaction";
import ChequeDeposit from "./screens/user/chequeDeposit/chequeDeposit";
import ChequeData from "./screens/user/chequeTransaction/chequeData";
import TransferHistory from "./screens/user/transferHistory/transferHistory";
import Bank from "./screens/bank/bank";

const App = () => {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/login" element={<Login />} />

				<Route path="/admin/profile" element={<AdminProfile />} />

				<Route path="admin/addCashier" element={<AdminAddCashier />} />
				<Route path="admin/addEmployee" element={<AdminAddEmployee />} />
				<Route path="admin/addCustomer" element={<AdminAddCustomer />} />

				<Route path="admin/Cashiers" element={<AdminViewCashier />} />
				<Route path="admin/Employees" element={<AdminViewEmployee />} />
				<Route path="admin/Customers" element={<AdminViewCustomer />} />

				<Route
					path="admin/updateCustomer/:id"
					element={<AdminUpdateCustomer />}
				/>
				<Route
					path="admin/admin/updateCustomer/:id"
					element={<AdminUpdateCustomer />}
				/>

				<Route
					path="admin/updateEmployee/:id"
					element={<AdminUpdateEmployee />}
				/>
				<Route
					path="admin/admin/updateEmployee/:id"
					element={<AdminUpdateEmployee />}
				/>

				<Route
					path="admin/updateCashier/:id"
					element={<AdminUpdateCashier />}
				/>
				<Route
					path="admin/admin/updateCashier/:id"
					element={<AdminUpdateCashier />}
				/>

				<Route path="/cashier" element={<CashierDashboard />} />

				<Route path="/cashier/profile" element={<CashierProfile />} />

				<Route path="cashier/addCashier" element={<CashierAddCashier />} />
				<Route path="cashier/addEmployee" element={<CashierAddEmployee />} />
				<Route path="cashier/addCustomer" element={<CashierAddCustomer />} />

				<Route path="cashier/Cashiers" element={<CashierViewCashier />} />
				<Route path="cashier/Employees" element={<CashierViewEmployee />} />
				<Route path="cashier/Customers" element={<CashierViewCustomer />} />

				<Route
					path="cashier/updateCustomer/:id"
					element={<CashierUpdateCustomer />}
				/>
				<Route
					path="cashier/cashier/updateCustomer/:id"
					element={<CashierUpdateCustomer />}
				/>

				<Route
					path="cashier/updateEmployee/:id"
					element={<CashierUpdateEmployee />}
				/>
				<Route
					path="cashier/cashier/updateEmployee/:id"
					element={<CashierUpdateEmployee />}
				/>

				<Route
					path="cashier/updateCashier/:id"
					element={<CashierUpdateCashier />}
				/>
				<Route
					path="cashier/cashier/updateCashier/:id"
					element={<CashierUpdateCashier />}
				/>

				{/* <Route path="/admin/errors" element={<AdminErrors />} /> */}

				<Route path="/user" element={<User />} />
				<Route path="/transferMoney" element={<MoneyTransfer />} />
				<Route path="/chequeTransaction" element={<ChequeTransaction />} />
				<Route path="/chequeDeposit" element={<ChequeDeposit />} />
				<Route path="/registerComplain" element={<RegisterComplain />} />
				<Route path="/chequeData" element={<ChequeData />} />
				<Route path="/transferHistory" element={<TransferHistory />} />

				<Route path="/bank" element={<Bank />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
