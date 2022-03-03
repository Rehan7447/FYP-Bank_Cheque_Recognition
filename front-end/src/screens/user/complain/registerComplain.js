import React from "react";
import UserTemplate from "../userTemplate";
import "./registerComplain.css";

function RegisterComplain() {
	return (
		<UserTemplate>
			<div className="mainDivRC">
				<h1>Register Complain</h1>
				<form>
					<div class="form-group">
						<label for="exampleFormControlInput1">Title</label>
						<input
							type="text"
							class="form-control"
							id="exampleFormControlInput1"
							placeholder="complain title"
						/>
					</div>
					<div class="form-group">
						<label for="exampleFormControlSelect1">Category</label>
						<select class="form-control" id="exampleFormControlSelect1">
							<option>Select Category</option>
							<option>Transaction Complain</option>
							<option>Deposit Complain</option>
							<option>Money Transfer Complain</option>
						</select>
					</div>

					<div class="form-group">
						<label for="exampleFormControlTextarea1">Description:</label>
						<textarea
							class="form-control"
							id="exampleFormControlTextarea1"
							rows="3"
						></textarea>
					</div>
					<div class="form-group row submitDiv">
						<div class="col-sm-10 text-right">
							<button type="submit" class="btn btn-success">
								Register
							</button>
						</div>
					</div>
				</form>
			</div>
		</UserTemplate>
	);
}

export default RegisterComplain;
