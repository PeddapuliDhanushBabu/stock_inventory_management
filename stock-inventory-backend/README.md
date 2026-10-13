# Stock Inventory Backend

Spring Boot and MySQL backend for the Stockroom inventory application.

## Current organization

The project is stored separately from the React app in this folder. Its source is being organized around controllers, services, repositories, entities, DTOs, configuration, security, and exception handling as shown in the project plan.

## Run

1. Set the `DB_PASSWORD` environment variable to the password for your MySQL `root` user. In PowerShell: `$env:DB_PASSWORD = "<your-password>"`.
2. Run `mvn spring-boot:run` from this folder.
3. The API runs at `http://localhost:8080`.
