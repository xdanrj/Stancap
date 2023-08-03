function ChangePasswordForm() {
    return (
        <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                ></Form.Control>
            </Form.Group>
        </Form>
    )
}