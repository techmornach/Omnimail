# OmniMail Documentation

OmniMail is an open-source mail client application that allows users to send and receive emails using their preferred email account. This documentation provides a comprehensive guide on how to set up and use OmniMail on your computer. It covers the installation process, configuration details, and usage instructions.

## Table of Contents
1. [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Downloading the Source Code](#downloading-the-source-code)
    - [Installing Dependencies](#installing-dependencies)
2. [Configuration](#configuration)
    - [SMTP Configuration](#smtp-configuration)
    - [IMAP Configuration](#imap-configuration)
3. [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [User Interface](#user-interface)
4. [Demo](#demo)
5. [Contributing](#contributing)
6. [License](#license)

## Installation <a name="installation"></a>

### Prerequisites <a name="prerequisites"></a>

Before installing OmniMail, ensure that you have the following software installed on your computer:

- Node.js: You can download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org). It is recommended to use the LTS (Long-Term Support) version.

### Downloading the Source Code <a name="downloading-the-source-code"></a>

To download the source code of OmniMail, you can either clone the Git repository or download the ZIP archive:

- Clone the repository using Git:
  ```
  git clone https://github.com/your-username/omnimail.git
  ```
  Alternatively, you can use a Git client or download the ZIP archive from the repository page on GitHub.

### Installing Dependencies <a name="installing-dependencies"></a>

Once you have downloaded the source code, navigate to the root directory of the project using the command line or terminal. Then, run the following command to install the dependencies for both the client and server:

```
cd omnimail/client && npm install && cd ../server && npm install
```

This command will install all the required packages and libraries for OmniMail.

## Configuration <a name="configuration"></a>

Before running OmniMail, you need to configure the SMTP and IMAP settings. These settings allow the application to connect to your email account for sending and receiving emails.

Open the `server/serverInfo.json` file and update the following fields with your email account details:

### SMTP Configuration <a name="smtp-configuration"></a>

```json
{
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "auth": {
      "user": "your-email@gmail.com",
      "pass": "your-email-password"
    }
  },
  ...
}
```

Replace `"your-email@gmail.com"` with your email address and `"your-email-password"` with your email account password. Note that OmniMail currently supports Gmail SMTP servers. If you are using a different email provider, you may need to modify the `host` and `port` values accordingly.

### IMAP Configuration <a name="imap-configuration"></a>

```json
{
  ...
  "imap": {
    "host": "imap.gmail.com",
    "port": 993,
    "auth": {
      "user": "your-email@gmail.com",
      "pass": "your-email-password"
    }
  }
}
```

Similar to the SMTP configuration, update the `"user"` and `"pass"` fields with your email account credentials.

After configuring the server settings, save the `serverInfo.json` file.

## Usage <a name="usage"></a>

### Running the Application <a name="running-the-application"></a>

To start OmniMail, navigate to the root directory of the project using the command line or terminal. Then, run the following command:

```
cd omnimail/client && npm run build && cd ../server && node ./node_modules/nodemon/bin/nodemon.js -e ts --exec "npm run compile"
```

This command will build the client-side code and start the server. The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

### User Interface <a name="user-interface"></a>

OmniMail provides a user-friendly interface for managing your emails. It consists of the following components:

- **BaseLayout**: The main layout component that contains the header and content area.
- **MaterialComponents**: A collection of reusable material design components used throughout the application.
    - **ContactList**: Displays a list of contacts.
    - **ContactView**: Displays detailed information about a specific contact.
    - **Dialog**: Displays a dialog box for various user interactions.
    - **MailboxList**: Displays a list of mailboxes (e.g., Inbox, Sent, Drafts).
    - **MessageList**: Displays a list of email messages in a selected mailbox.
    - **MessageView**: Displays detailed information about a selected email message.
    - **Toolbar**: Provides options for composing, replying, and deleting emails.
    - **WelcomeView**: Displays a welcome message and quick links to get started.

The user interface allows you to perform various actions such as viewing emails, composing new emails, replying to emails, and managing contacts.

## Demo <a name="demo"></a>

![OmniMail Demo](https://ibb.co/CW7bcc6)

The above screenshot showcases the OmniMail application in action. It demonstrates the user interface and the features available to users.

## Contributing <a name="contributing"></a>

OmniMail is an open-source project, and contributions are welcome. If you would like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive commit messages.
4. Push your branch to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the project's coding guidelines and includes appropriate tests.

## License <a name="license"></a>

OmniMail is licensed under the ISC License. For more details, refer to the [LICENSE](https://github.com/your-username/omnimail/blob/main/LICENSE) file.

---

Congratulations! You have successfully set up OmniMail, configured the email server settings, and learned how to use the application. Enjoy managing your emails with ease using OmniMail!

If you have any questions or need further assistance, please don't hesitate to reach out to the project maintainers or refer to the project's documentation on GitHub.