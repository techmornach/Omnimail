## API Documentation

The API provides functionality related to handling email services, including accessing mailboxes, retrieving and manipulating email messages, managing contacts, and sending emails.

### Base URL

The base URL for the API is `http://localhost:8080`.

### Endpoints

#### List Mailboxes

- URL: `/mailboxes`
- Method: GET
- Description: Retrieves a list of available mailboxes.
- Response:
    - Status Code: 200 (OK)
    - Body: Array of mailbox objects with the following properties:
        - `name`: Name of the mailbox
        - `path`: Path to the mailbox

#### List Messages

- URL: `/mailboxes/:mailbox`
- Method: GET
- Description: Retrieves a list of messages within the specified mailbox.
- Parameters:
    - `:mailbox` (required): Name of the mailbox
- Response:
    - Status Code: 200 (OK)
    - Body: Array of message objects with the following properties:
        - `id`: Unique identifier of the message
        - `date`: Date of the message
        - `from`: Sender of the message
        - `subject`: Subject of the message

#### Get Message

- URL: `/messages/:mailbox/:id`
- Method: GET
- Description: Retrieves the body of a specific message within the specified mailbox.
- Parameters:
    - `:mailbox` (required): Name of the mailbox
    - `:id` (required): ID of the message
- Response:
    - Status Code: 200 (OK)
    - Body: String representing the message body

#### Delete Message

- URL: `/messages/:mailbox/:id`
- Method: DELETE
- Description: Deletes a specific message within the specified mailbox.
- Parameters:
    - `:mailbox` (required): Name of the mailbox
    - `:id` (required): ID of the message
- Response:
    - Status Code: 200 (OK)

#### Send Message

- URL: `/messages`
- Method: POST
- Description: Sends an email message.
- Request Body: JSON object containing email message details:
    - `from` (required): Sender's email address
    - `to` (required): Recipient's email address
    - `subject` (required): Subject of the email
    - `text` (optional): Plain text body of the email
    - `html` (optional): HTML body of the email
- Example Request Body:
  ```json
  {
    "from": "sender@example.com",
    "to": "recipient@example.com",
    "subject": "Example Subject",
    "text": "This is an example email"
  }
  ```
- Response:
    - Status Code: 200 (OK)

#### List Contacts

- URL: `/contacts`
- Method: GET
- Description: Retrieves a list of contacts.
- Response:
    - Status Code: 200 (OK)
    - Body: Array of contact objects with the following properties:
        - `_id`: Unique identifier of the contact
        - `name`: Name of the contact
        - `email`: Email address of the contact

#### Add Contact

- URL: `/contacts`
- Method: POST
- Description: Adds a new contact.
- Request Body: JSON object containing contact details:
    - `name` (required): Name of the contact
    - `email` (required): Email address of the contact
- Example Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example

.com"
}
  ```
- Response:
  - Status Code: 200 (OK)
  - Body: JSON object representing the added contact with the following properties:
    - `_id`: Unique identifier of the contact
    - `name`: Name of the contact
    - `email`: Email address of the contact

#### Update Contact

- URL: `/contacts/:id`
- Method: PUT
- Description: Updates an existing contact.
- Parameters:
  - `:id` (required): ID of the contact to update
- Request Body: JSON object containing updated contact details:
  - `name` (optional): Updated name of the contact
  - `email` (optional): Updated email address of the contact
- Example Request Body:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```
- Response:
    - Status Code: 200 (OK)

#### Delete Contact

- URL: `/contacts/:id`
- Method: DELETE
- Description: Deletes an existing contact.
- Parameters:
    - `:id` (required): ID of the contact to delete
- Response:
    - Status Code: 200 (OK)

### Error Handling

In case of an error, the API will respond with an appropriate status code and an error message in the response body.

Example error response:
```json
{
  "error": "Error message here"
}
```

### Additional Information

The API uses the following modules:

- `express`: A fast and minimalist web framework for Node.js.
- `emailjs-imap-client`: A client library for accessing IMAP mailboxes.
- `mailparser`: A module for parsing email messages.
- `nodemailer`: A module for sending emails.
- `nedb`: A lightweight, in-memory database for managing contacts.

### Server Configuration

The server configuration is stored in the `serverInfo.json` file, located in the same directory as the `main.ts` file. The file contains the SMTP and IMAP server information, including host, port, and authentication details.

### Running the API

To start the API, make sure you have Node.js and npm installed. Then, follow these steps:

1. Open a terminal/command prompt and navigate to the project directory.
2. Run `npm install` to install the required dependencies.
3. Run `npm run dev` to start the API in development mode. This command will compile the TypeScript files and start the server using nodemon, which automatically restarts the server when changes are detected.

Please note that the provided documentation assumes that the required dependencies and libraries are installed, and the necessary configuration files are present in the correct locations.

You can access the API using a tool like Postman or by sending HTTP requests directly from your application.

