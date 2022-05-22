import { Row, Col } from "react-foundation";
import {
	Form,
	Button,
	InputGroup,
	FormGroup,
	FormControl,
	ControlLabel,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
export default function SignUp() {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			< className="mb-3">
				<Form.Group as={Col} md="4" controlId="validationCustom01">
					<Form.Control
						required
						type="text"
						placeholder="Name"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustomUsername">
					{/* <Form.Label>Email</Form.Label> */}
					<InputGroup hasValidation>
						<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
						<Form.Control
							type="email"
							placeholder="Email"
							aria-describedby="inputGroupPrepend"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide valid Email.
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
			</>
			<Row className="mb-3">
				<Form.Group as={Col} md="6" controlId="validationCustom03">
					{/* <Form.Label>Contact No:</Form.Label> */}
					<Form.Control type="text" placeholder="Contact No:" required />
					<Form.Control.Feedback type="invalid">
						Please provide a valid contact no.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="3" controlId="validationCustom04">
					<Form.Label>State</Form.Label>
					<Form.Control type="text" placeholder="State" required />
					<Form.Control.Feedback type="invalid">
						Please provide a valid state.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="3" controlId="validationCustom05">
					<Form.Label>Zip</Form.Label>
					<Form.Control type="text" placeholder="Zip" required />
					<Form.Control.Feedback type="invalid">
						Please provide a valid zip.
					</Form.Control.Feedback>
				</Form.Group>
			</Row>
			<Form.Group className="mb-3">
				<Form.Check
					required
					label="Agree to terms and conditions"
					feedback="You must agree before submitting."
					feedbackType="invalid"
				/>
			</Form.Group>
			<Button type="submit">Submit form</Button>
		</Form>
	);
}
