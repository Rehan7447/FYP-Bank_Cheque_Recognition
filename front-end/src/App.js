//this is a comment

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./screens/admin/adminDashBoard";
import LandingPage from "./screens/LandingPage/LandingPage";
import Login from "./screens/login/loginPage";
import SignUp from "./screens/signUp/signUp";

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

// import AdminErrors from "./screens/admin/adminErrors";

import User from "./screens/user/userHome/userHomePage";
import MoneyTransfer from "./screens/user/moneyTransfer/moneyTransfer";
import RegisterComplain from "./screens/user/complain/registerComplain";
import ChequeTransaction from "./screens/user/chequeTransaction/chequeTransaction";
import ChequeDeposit from "./screens/user/chequeDeposit/chequeDeposit";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/login" element={<Login />} />

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
					path="admin/updateEmployee/:id"
					element={<AdminUpdateEmployee />}
				/>
				<Route
					path="admin/updateCashier/:id"
					element={<AdminUpdateCashier />}
				/>

				{/* <Route path="/admin/errors" element={<AdminErrors />} /> */}

				<Route path="/user" element={<User />} />

				<Route path="/transferMoney" element={<MoneyTransfer />} />
				<Route path="/chequeTransaction" element={<ChequeTransaction />} />
				<Route path="/cehqueDeposit" element={<ChequeDeposit />} />
				<Route path="/registerComplain" element={<RegisterComplain />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
